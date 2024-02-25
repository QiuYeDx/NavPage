import tw, {styled} from "twin.macro";

export const PictureDisplay = styled.img`
  height: ${(props) => props.height ? props.height + 'px' : '150px'};
  width: ${(props) => props.width ? props.width + 'px' : '150px'};
  object-fit: cover; /* 图片按比例缩放并填充容器 */
  object-position: center; /* 图片在容器中居中显示 */
  ${tw`animate-fade_in.8`}
`

export const PictureWrapper = styled.div`
  ${(props) => props.height ? 'height: ' + props.height : ''};
  ${(props) => props.width ? 'width: ' + props.width : ''};
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: height 0.25s ease, width 0.25s ease;
  ${({_tw}) => _tw ? _tw : ''};
  & img{
    ${(props) => props.height ? 'height: ' + props.height : ''};
    ${(props) => props.width ? 'width: ' + props.width : ''};
    ${tw`bg-contain`};
    ${({img_tw}) => img_tw ? img_tw : ''};
  }
  & div.etc{
    margin: auto;
    padding: 0;
    height: 50%;
    width: 100%;
    ${tw`text-blue-300`};
    ${({ph_tw}) => ph_tw ? ph_tw : ''};
    
    &.full-height {
      margin: 0;
      //height: initial;
      //width: initial;
      max-height: 65%;
      max-width: 50%;
      scale: 1.25;
    }
  }
  & div svg{
    height: 100%;
    margin: auto;
    padding: 0;
  }
`;