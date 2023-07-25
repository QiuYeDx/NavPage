// src/styles/GlobalStyles.js
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle`
  #rootWrapper.night-mode, #rootWrapper.night-mode + div{
    filter: brightness(0.5);
  }
  body {
    -webkit-tap-highlight-color: ${theme`colors.blue.200`};
    ${tw`antialiased`}
  }
`

const GlobalStyles = () => (
    <>
        <BaseStyles />
        <CustomStyles />
    </>
)

export default GlobalStyles