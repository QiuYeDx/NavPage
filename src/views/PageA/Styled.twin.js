import tw, { styled } from 'twin.macro'

export const Wrapper = styled.div`
  color: black;
  //background-color: rgb(238, 238, 238);

  //position: absolute;
  //top: 0;
  //bottom: 0;
  //left: 0;
  //right: 0;

  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${({hasBorder}) => hasBorder && tw`border border-purple-500`}
`

export const WrapperTop = styled.div`
  color: black;
  height: 80px;
  //background-color: pink;
  ${({ hasBorder }) => hasBorder && tw`border border-blue-500`}
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
  //flex-direction: row;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  
  ${tw`text-blue-500`}
  ${({ hasBorder }) => hasBorder && tw`border-purple-500`}
`

export const WrapperBottom = styled.div`
  height: 80px;
  color: black;
  //background-color: #bfc;
  ${({ hasBorder }) => hasBorder && tw`border-purple-500`}
`

export const WrapperLeft = styled.div`
  width: 15%;
  color: black;
  //background-color: #61dafb;
  ${({ hasBorder }) => hasBorder && tw`border-purple-500`}
`

export const WrapperRight = styled.div`
  width: 15%;
  color: black;
  //background-color: #fbc561;
  ${({hasBorder}) => hasBorder && tw`border-purple-500`}
`