// src/styles/GlobalStyles.js
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle`
  html{
    transition: filter 0.6s ease;
  }
  
  html.night-mode{
    filter: brightness(0.5);
    transition: filter 0.41s ease;
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