import tw, { styled } from 'twin.macro'
import {AvatarWrapper} from "@/components/Avatar/Styled.twin";
import {BaseButton} from "@/components/Button/Styled.twin";
import {WIDTH_MIDDLE, WIDTH_MOBILE} from "@/styles/GlobalConfig";




export const WrapperMiddle = styled.div`
  color: black;
  //background-color: blue;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  ${({ hasBorder }) => hasBorder && tw`border-purple-500`}
`

export const WrapperMain = styled.div`
  padding: 0 10px 0 10px;
  color: black;
  //background-color: blue;
  display: flex;
  flex-direction: column;
  //min-width: 340px;
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
  flex-grow: 2;
  min-width: 10px;
  //width: 15%;
  color: black;
  //background-color: #61dafb;
  ${({ hasBorder }) => hasBorder && tw`border-purple-500`};

  @media(max-width: ${WIDTH_MOBILE}px) {
    flex-grow: 1;
  }
  
  ${tw`hidden md:block`};
`

export const WrapperRight = styled.div`
  flex-grow: 2;
  min-width: 10px;
  //width: 15%;
  color: black;
  //background-color: #fbc561;
  ${({hasBorder}) => hasBorder && tw`border-purple-500`};

  @media(max-width: ${WIDTH_MOBILE}px) {
    flex-grow: 1;
  }
  ${tw`hidden md:block`};
`
