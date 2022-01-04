import { useEffect, useState } from 'react'

const LOCAL_STORAGE_KEY = 'SIMPLE_MODE'

export const useSimpleMode = () => {
  const [simpleMode, _setSimpleMode] = useState<boolean>(false)

  useEffect(() => {
    _setSimpleMode(localStorage.getItem(LOCAL_STORAGE_KEY) !== null ? localStorage.getItem(LOCAL_STORAGE_KEY) === 'true' : false)
  }, [])

  const setSimpleMode = (value: boolean) => {
    _setSimpleMode(value)
    localStorage.setItem(LOCAL_STORAGE_KEY, `${value}`)
  }

  return { simpleMode, setSimpleMode }
}
