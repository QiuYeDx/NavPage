import tw, { styled } from 'twin.macro'
import {WIDTH_MOBILE} from "@/styles/GlobalConfig";

export const H1 = styled.div`
  ${tw`text-gray-900 font-sans text-5xl align-baseline font-bold`}
  ${({hasShadow}) => hasShadow && "text-shadow: 1px 1px 4px rgba(0, 0, 0, 15%);"}
  
  color: ${({color}) => color || ""};
  
`

export const H2 = styled.div`
  font-size: 48px;
  line-height: 50px;
  @media(max-width: ${WIDTH_MOBILE}px){
    font-size: 40px;
    line-height: 50px;
  }
  ${tw`text-gray-900 font-sans align-middle font-bold animate-fade_in_up.4`}
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

export const InLineTitle = styled.div`
  font-size: ${(props) => props.fontSize ? props.fontSize + 'px' : '34px'};
  line-height: ${(props) => props.lineHeight ? props.lineHeight + 'px' : '36px'};
  @media(max-width: ${WIDTH_MOBILE}px){
    font-size: ${(props) => props.fontSize ? props.fontSize - 6 + 'px' : '28px'};
    line-height: ${(props) => props.lineHeight ? props.lineHeight + 'px' : '36px'};
  }
  ${tw`text-gray-700 font-sans align-middle font-bold animate-fade_in_up.4 select-none duration-100`}
  ${({hasShadow}) => hasShadow && "text-shadow: 1px 1px 4px rgba(0, 0, 0, 15%);"}
  
  color: ${({color}) => color || ""};
  
`
