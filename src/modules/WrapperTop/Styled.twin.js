import tw, {styled} from "twin.macro";
import {WIDTH_MIN, WIDTH_MOBILE} from "@/styles/GlobalConfig";


export const WrapperTopStyled = styled.div`
  box-sizing: content-box;
  color: black;
  height: 80px;
  width: 100%;
  ${({ hasBorder }) => hasBorder && tw`border border-blue-500`};
  @media(max-width: ${WIDTH_MOBILE}px) {
    min-height: 20px;
  }
  overflow-y: hidden;
  overflow-x: auto;
  padding-bottom: 30px;
  margin-bottom: -30px;
  padding-left: 0;
  transition: padding-left 0.5s ease;
  @media(max-width: ${WIDTH_MIN}px){
    padding-left: 15px;
    transition: padding-left 0.5s ease;
  }
  display: flex;
  align-items: center;
`

export const NavWrapper = styled.div.attrs(props => ({
  className: 'gsap_nav_expand'
}))`
  margin: 10px auto 0 auto;
  height: 50px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  position: relative;

  ${tw`rounded-full shadow-lg md:hover:shadow-xl active:shadow-xl md:active:shadow-md bg-white`};
  
  transition: box-shadow 0.3s ease;
`;

export const NavHome = styled.div`
  height: 50px;
  line-height: 50px;
  width: 50px;
  text-align: center;
  flex-shrink: 0;
  flex-grow: 0;
  
  position: relative;
  z-index: 100;
  ${tw`rounded-full shadow-lg md:hover:shadow-xl active:shadow-xl md:active:shadow-lg bg-blue-300 md:hover:bg-blue-400 active:bg-blue-400 md:active:bg-blue-300 md:cursor-pointer text-white`};
  
  transition: scale 0.3s ease;
  &:active{
    scale: 1.1;
  }
  @media(min-width: ${WIDTH_MOBILE}px) {
    &:hover{
      scale: 1.1;
    }
    &:active{
      scale: 1;
    }
  }
`;

export const NavItem = styled.div.attrs(props => ({
  className: 'gsap_navItem_expand'
}))`
  min-width: 50px;
  height: 50px;
  line-height: 50px;
  position: relative;
  z-index: ${({z_index}) => z_index || '99'};
  text-align: center;
  flex-shrink: 0;
  flex-grow: 0;
  ${tw`rounded-full antialiased font-sans text-blue-400 truncate select-none md:hover:text-blue-300 active:text-blue-200 md:active:text-blue-400 md:cursor-pointer`};
  overflow: visible;
  padding-right: 10px;
  padding-left: 10px;
  &:last-child{
    padding-right: 15px;
  }
  transition: color 0.3s ease;
`;

export const GapIcon = styled.div.attrs(props => ({
  className: 'gsap_navItem_expand'
}))`
  position: relative;
  ${tw`select-none text-blue-200`};
`;

export const FadeInRight = styled.div`
`;