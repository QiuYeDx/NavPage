import tw, { styled } from 'twin.macro'
import {WIDTH_MIDDLE, WIDTH_MOBILE} from "@/styles/GlobalConfig";

export const WrapperMiddle = styled.div`
  color: black;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
  ${({ hasBorder }) => hasBorder && tw`border-purple-500`}
`

export const WrapperMain = styled.div`
  padding: 0 10px 0 10px;
  color: black;
  display: flex;
  flex-direction: column;
  flex-grow: 6;
  z-index: 1;
  ${tw`text-gray-700 max-w-screen-xl`}
  ${({ hasBorder }) => hasBorder && tw`border-purple-500`};
  ${tw`grid grid-cols-4 justify-center text-center`};

  transition: all 0.5s ease;
  @media(max-width: ${WIDTH_MIDDLE}px){
    flex-grow: 12;
  }
  @media(max-width: ${WIDTH_MOBILE}px){
    flex-grow: 18; // 控制移动端宽度
  }
`

export const WrapperLeft = styled.div`
  flex-grow: 0.5;
  min-width: 10px;
  color: black;
  ${({ hasBorder }) => hasBorder && tw`border-purple-500`};

  @media(min-width: ${WIDTH_MIDDLE}px) {
    flex-grow: 2;
  }
  
  ${tw`hidden md:block`};
`

export const WrapperRight = styled.div`
  flex-grow: 0.5;
  min-width: 10px;
  color: black;
  ${({hasBorder}) => hasBorder && tw`border-purple-500`};

  @media(min-width: ${WIDTH_MIDDLE}px) {
    flex-grow: 2;
  }
  ${tw`hidden md:block`};
`
