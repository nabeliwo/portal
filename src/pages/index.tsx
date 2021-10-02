import React from 'react'
import styled from 'styled-components'

import { space } from '../constants/theme'

const Home = () => <Wrapper>Hello, world.</Wrapper>

export default Home

const Wrapper = styled.div`
  padding: ${space.L}px;
`
