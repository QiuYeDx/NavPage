import tw, { styled } from 'twin.macro';

export const BaseButton = styled.div`
  ${tw`rounded-2xl bg-blue-400`} 
  ${({hasBorder}) => hasBorder ? tw`border-4 border-pink-400` : ""}
  height: ${({h}) => h || "40px"};
  width: ${({w}) => w || "120px"};
  ${({_tw}) => _tw }
`
