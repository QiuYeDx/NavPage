import tw, {styled} from "twin.macro";

export const Svg = styled.svg`
  color: blue;
  height: ${({h}) => h || "18px"};
  line-height: ${({lh}) => lh || "60px"};
  width: ${({w}) => w || "18px"};
  background-image: url(${({img}) => img || ""});
  background-size: cover;
  display: inline-block;
  vertical-align: -0.125em;
  // fill: currentColor;
  ${({_tw}) => _tw }
`