import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export type Content = {
  title: string
  description: string
  contentHtml: string
}
type Node = {
  urlPath: string
  fileFullPath: string
  children?: Node[]
}
export type SiteMapItem = {
  path: string
  name: string
  order: number
  children?: SiteMapItem[]
}

const DIRECTORY_FILE_NAME = '.DIRECTORY'
const ROOT_FILE_NAME = 'index'
const CONTENT_DIRECTORY = path.join(process.cwd(), 'content')

const getNodes = (dirName: string): Node[] => {
  return fs.readdirSync(dirName, { withFileTypes: true }).map((dirent) => {
    const currentPath = `${dirName}/${dirent.name}`
    const urlPath = currentPath.split('content')[1].replace('.md', '')

    if (dirent.isDirectory()) {
      return {
        urlPath,
        fileFullPath: currentPath,
        children: getNodes(currentPath),
      }
    }

    return {
      urlPath,
      fileFullPath: currentPath,
    }
  })
}
const getFlatPaths = (list: Node[]): Array<Omit<Node, 'children'>> => {
  return list
    .filter((item) => !item.urlPath.includes(DIRECTORY_FILE_NAME))
    .flatMap((item) => {
      if (item.children) return getFlatPaths(item.children)

      return [
        {
          ...item,
          urlPath: item.urlPath.replace(`/${ROOT_FILE_NAME}`, ''),
        },
      ]
    })
}
const getSiteMapList = (list: Node[]): SiteMapItem[] => {
  const ret = list
    .map((item) => {
      if (item.children) {
        const fileContent = fs.readFileSync(`${item.fileFullPath}/${ROOT_FILE_NAME}.md`, 'utf8')
        const fileMatterResult = matter(fileContent)
        const directoryContent = fs.readFileSync(`${item.fileFullPath}/${DIRECTORY_FILE_NAME}.md`, 'utf8')
        const directoryMatterResult = matter(directoryContent)

        return {
          path: item.urlPath.replace(`/${ROOT_FILE_NAME}`, ''),
          name: fileMatterResult.data.title as string,
          order: directoryMatterResult.data.order as number,
          children: getSiteMapList(item.children.filter((child) => !child.urlPath.includes(DIRECTORY_FILE_NAME))),
        }
      }

      const fileContent = fs.readFileSync(item.fileFullPath, 'utf8')
      const matterResult = matter(fileContent)

      return {
        path: item.urlPath === '/root' ? '/' : item.urlPath.replace(`/${ROOT_FILE_NAME}`, ''),
        name: matterResult.data.title as string,
        order: matterResult.data.order as number,
      }
    })
    .sort((a, b) => {
      if (a.order < b.order) {
        return -1
      } else {
        return 1
      }
    })

  return ret
}

const nodes = getNodes(CONTENT_DIRECTORY)
const flatPaths = getFlatPaths(nodes)
const siteMap = getSiteMapList(nodes)

export const getContent = async (currentPath: string) => {
  currentPath = currentPath === '/' ? '/root' : currentPath

  const filePath = flatPaths.find((item) => {
    return item.urlPath === currentPath
  })

  if (!filePath) throw Error('getContent error')

  const fileContent = fs.readFileSync(filePath.fileFullPath, 'utf8')
  const matterResult = matter(fileContent)
  const processedContent = await remark().use(html, { sanitize: false }).process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    contentHtml,
    ...matterResult.data,
  } as Content
}
export const getAllContents = () => {
  const contents = flatPaths.filter((item) => item.urlPath !== '/root').map((item) => item.urlPath)
  return contents
}
export const getSiteMap = () => siteMap
