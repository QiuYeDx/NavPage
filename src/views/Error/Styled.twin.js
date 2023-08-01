import tw, { styled } from 'twin.macro'
import {CardWrapper} from "@/components/MainCard/Styled.twin";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  
  z-index: 100;

  background-size: cover;
  background: linear-gradient(-45deg, #ebf3fe, #f2eeff, #fbf6f7, #ebf3fe);
`

export const ErrorWrapper = styled(CardWrapper)`
  ${tw`p-10 shadow-xl rounded-3xl bg-red-400`}
  //position: relative;
  //top: -60px;
  display: flex;
  flex-direction: column;
  text-align: center;
  
  @media(max-width: 460px){
    ${tw`p-4 shadow-xl rounded-3xl bg-red-400 tracking-tighter`}
  }
`