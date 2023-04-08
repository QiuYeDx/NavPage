import tw, { styled } from 'twin.macro';

export const AvatarWrapper = styled.div`
  ${tw`rounded-full`} 
  ${({hasBorder}) => hasBorder ? tw`border-4 border-white` : ""}
  ${({hasBorder}) => hasBorder ? tw`border-4 border-blue-200` : ""}
  height: ${({h}) => h || "80px"};
  width: ${({w}) => w || "80px"};
  background-image: url(${({img}) => img || ""});
  background-size: cover;
  @media(max-width:767px) {
    height: 80px;
    width: 80px;
  }
  
  ${({_tw}) => _tw }
`
