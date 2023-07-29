import tw, {styled} from "twin.macro";
import {CardWrapper} from "@/components/MainCard/Styled.twin";

export const ContentWrapper = styled(CardWrapper)`
  margin: 20px 0 0 0;
  padding: 20px 12px;

  background-color: white;

  text-align: center;
  z-index: 500;
  gap: 10px;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

export const LineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 18px;
  flex-grow: 1;
  flex-shrink: 1;
  min-width: 60%;
  // 设定了min-width后 需要这样 以使flex项目在交叉轴方向居中
  &>*{
    margin-left: auto;
    margin-right: auto;
  }
`