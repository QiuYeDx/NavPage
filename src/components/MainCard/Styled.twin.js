import tw, { styled } from 'twin.macro';

export const CardWrapper = styled.div`
  ${tw`shadow-xl rounded-3xl hover:shadow-2xl animate-fade_in_up.8`}; 
  height: ${({h}) => h || "200px"};
  width: ${({w}) => w || ""};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: -1;
  transition: all .3s ease;
  
  ${({_tw}) => _tw };
`
