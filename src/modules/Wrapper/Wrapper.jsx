import tw, {styled} from "twin.macro";

export const Wrapper = styled.div`
  color: black;
  //background-color: rgb(249, 249, 249);

  //position: absolute;
  //top: 60px;
  //bottom: 0;
  //left: 0;
  //right: 0;
  //margin: auto;

  min-height: calc(100vh - 60px);

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  z-index: 1;
  //background-image: url(images/mora.jpg);
  //background-size: cover;
  background: linear-gradient(-45deg, #ebf3fe, #f2eeff, #fbf6f7, #ebf3fe);
  overflow: hidden;
  ${({hasBorder}) => hasBorder && tw`border border-purple-500`}
`