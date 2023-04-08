import tw, { styled } from 'twin.macro';

export const CardWrapper = styled.div`
  ${tw`shadow-xl rounded-3xl`} 
  height: ${({h}) => h || "200px"};
  width: ${({w}) => w || ""};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: -1;
  ${({_tw}) => _tw };
`
