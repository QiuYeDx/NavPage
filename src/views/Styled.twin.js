import tw, { styled } from 'twin.macro'
import {AvatarWrapper} from "@/components/Avatar/Styled.twin";
import {BaseButton} from "@/components/Button/Styled.twin";
import {WIDTH_MIDDLE, WIDTH_MOBILE} from "@/styles/GlobalConfig";
import {CardWrapper} from "@/components/MainCard/Styled.twin";

export const ContentWrapper = styled(CardWrapper)`
  margin: 20px 0 0 0;
  padding: 20px 12px;

  background-color: white;

  text-align: center;

  gap: 10px;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

