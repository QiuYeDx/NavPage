import tw, { styled } from 'twin.macro'

export const H1 = styled.div`
  ${tw`text-gray-900 font-sans text-5xl align-baseline font-bold`}
  ${({hasShadow}) => hasShadow && "text-shadow: 1px 1px 4px rgba(0, 0, 0, 15%);"}
  
  color: ${({color}) => color || ""};
  
`

export const H3 = styled.div`
  ${tw`text-gray-700 font-sans text-lg font-bold`}
  ${({hasShadow}) => hasShadow && "text-shadow: 1px 1px 4px rgba(0, 0, 0, 15%);"}
  color: ${({color}) => color || ""};
  
`

export const H4 = styled.div`
  ${tw`text-gray-400 text-sm font-sans text-base`}
  ${({hasShadow}) => hasShadow && "text-shadow: 1px 1px 4px rgba(0, 0, 0, 15%);"}
  color: ${({color}) => color || ""};
  
`

export const P = styled.div`
  ${tw`text-gray-900 font-mono text-base align-baseline `}
  ${({hasBorder}) => hasBorder && tw`border border-purple-500`}
  ${({hasShadow}) => hasShadow && "text-shadow: 1px 1px 2px rgba(0, 0, 0, 15%);"}
  
  color: ${({color}) => color || ""};
  
`

