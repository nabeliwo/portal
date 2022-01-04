import React, { ReactNode, VFC, createContext, useState } from 'react'

export type SimpleModeContext = {
  simpleMode: boolean
  setSimpleMode: (simpleMode: boolean) => void
}

export const simpleModeContext = createContext<SimpleModeContext>({
  simpleMode: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSimpleMode: () => {},
})

export const SimpleModeContextProvider: VFC<{ children: ReactNode }> = ({ children }) => {
  const [simpleMode, _setSimpleMode] = useState<boolean>(false)

  const setSimpleMode: SimpleModeContext['setSimpleMode'] = (value) => {
    _setSimpleMode(value)
  }

  return <simpleModeContext.Provider value={{ simpleMode, setSimpleMode }}>{children}</simpleModeContext.Provider>
}
