import tw, { styled } from 'twin.macro'

export const H1 = styled.div`
  ${tw`text-gray-900 font-sans text-5xl align-baseline font-bold`}
  ${({hasBorder}) => hasBorder && tw`border border-purple-500`}
  ${({hasShadow}) => hasShadow && "text-shadow: 1px 1px 4px rgba(0, 0, 0, 15%);"}
  
  color: ${({color}) => color || ""};
  
`

export const P = styled.div`
  ${tw`text-gray-900 font-sans text-base align-baseline `}
  ${({hasBorder}) => hasBorder && tw`border border-purple-500`}
  ${({hasShadow}) => hasShadow && "text-shadow: 1px 1px 2px rgba(0, 0, 0, 15%);"}
  
  color: ${({color}) => color || ""};
  
`

