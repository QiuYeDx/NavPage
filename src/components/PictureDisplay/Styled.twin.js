import tw, {styled} from "twin.macro";

export const PictureDisplay = styled.img`
  height: ${(props) => props.height ? props.height + 'px' : '150px'};
  width: ${(props) => props.width ? props.width + 'px' : '150px'};
  object-fit: cover; /* 图片按比例缩放并填充容器 */
  object-position: center; /* 图片在容器中居中显示 */
  ${tw`border border-blue-400 border-dashed`}
`