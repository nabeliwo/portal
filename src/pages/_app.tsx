import React, { FC } from 'react'
import { AppProps } from 'next/app'

const App: FC<AppProps> = ({ Component }) => (
  <div>
    <h1>wiki</h1>
    <div>
      <Component />
    </div>
  </div>
)

export default App
