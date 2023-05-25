import tw, { styled } from 'twin.macro';
import {AvatarWrapper} from "@/components/Avatar/Styled.twin";
import {BaseButton} from "@/components/Button/Styled.twin";
import {WIDTH_MIDDLE, WIDTH_MOBILE} from "@/styles/GlobalConfig";

export const Wrapper = styled.div`
  color: black;
  //background-color: rgb(249, 249, 249);

  //position: absolute;
  //top: 60px;
  //bottom: 0;
  //left: 0;
  //right: 0;
  //margin: auto;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  z-index: 1;
  background-image: url(images/mora.png);
  background-size: cover;
  ${({hasBorder}) => hasBorder && tw`border border-purple-500`}
`

export const WrapperTop = styled.div`
  color: black;
  height: 80px;
  //background-color: pink;
  ${({ hasBorder }) => hasBorder && tw`border border-blue-500`};
  @media(max-width: ${WIDTH_MOBILE}px) {
    height: 20px;
  }
`

export const WrapperMiddle = styled.div`
  color: black;
  //background-color: blue;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  ${({ hasBorder }) => hasBorder && tw`border-purple-500`}
`

export const WrapperMain = styled.div`
  color: black;
  //background-color: blue;
  display: flex;
  flex-direction: column;
  flex-grow: 5;
  z-index: 1;
  ${tw`text-gray-700 max-w-screen-xl`}
  ${({ hasBorder }) => hasBorder && tw`border-purple-500`};
  ${tw`grid grid-cols-4 justify-center text-center`};

  transition: all 0.5s ease;
  @media(max-width: ${WIDTH_MIDDLE}px){
    flex-grow: 12;
  }
  @media(max-width: ${WIDTH_MOBILE}px){
    flex-grow: 20; // 控制移动端宽度
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
`

export const SubAvatar = styled(AvatarWrapper)`
  position: absolute;
  flex-shrink: 0;
  top: -50px;
  @media(max-width: ${WIDTH_MOBILE}px) {
    top: -40px;
  }
`

export const BaseButtonA = styled(BaseButton)`

`