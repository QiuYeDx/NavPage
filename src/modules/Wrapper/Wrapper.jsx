import tw, {styled} from "twin.macro";

export const Wrapper = styled.div`
  color: black;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  z-index: 1;
  overflow: hidden;
  ${({hasBorder}) => hasBorder && tw`border border-purple-500`}
`