import tw, { styled } from 'twin.macro';

export const BaseButton = styled.div`
  ${tw`rounded-2xl bg-blue-400`} 
  ${({hasBorder}) => hasBorder ? tw`border-4 border-pink-400` : ""}
  height: ${({h}) => h || "40px"};
  width: ${({w}) => w || "120px"};
  ${({_tw}) => _tw }
`

export const MButton = styled.div`
  ${tw`rounded-2xl bg-blue-400 text-white text-base font-bold font-sans text-center align-middle tracking-wider \
  ring-blue-200 ring-0 hover:ring-4 hover:scale-105 active:bg-blue-600 active:ring-blue-400 duration-100 ease-out
  `}; 
  height: ${({h}) => h || "32px"};
  line-height: ${({h}) => h || "32px"};
  width: ${({w}) => w || "86px"};
  ${({_tw}) => _tw }
`