import tw, { styled } from 'twin.macro'
import {WIDTH_MOBILE} from "@/styles/GlobalConfig";
import {CardWrapper} from "@/components/MainCard/Styled.twin";

export const Wrapper = styled.div`
  margin: 0 auto 0 auto;
  max-width: 1000px;
  //grid-column: span 4 / span 4;
  
  display: flex;
  flex-direction: column;
  
  padding: 0 5px 0 5px;
  ${tw`mt-2 md:mt-0`};
`

export const ButtonWrapper = styled.div`
`

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const ContentWrapper = styled(CardWrapper)`
  margin: 20px 0 0 0;
  padding: 20px 12px;
  
  background-color: white;
  
  text-align: center;
  
  gap: 10px;
`

export const LineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 18px;
  flex-grow: 1;
  min-width: 60%;
  // 设定了min-width后 需要这样 以使flex项目在交叉轴方向居中
  &>*{
    margin-left: auto;
    margin-right: auto;
  }
`