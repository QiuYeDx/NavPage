import tw, { styled } from 'twin.macro'

export const ScrollWrapper = styled.div`
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;