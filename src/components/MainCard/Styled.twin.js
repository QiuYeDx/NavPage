import tw, { styled } from 'twin.macro';

export const CardWrapper = styled.div.attrs(props => ({
  className: 'gsap_main_fadein'
}))`
  ${tw`shadow-xl rounded-3xl active:shadow-2xl md:hover:shadow-2xl`};
  min-height: ${({h}) => h || "200px"};
  width: ${({w}) => w || ""};
  
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 1;

  transition: box-shadow 0.3s, background-color 0.3s;
  
  ${({_tw}) => _tw };
`
