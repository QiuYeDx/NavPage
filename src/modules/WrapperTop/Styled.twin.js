import tw, {styled} from "twin.macro";
import {WIDTH_MIN, WIDTH_MOBILE} from "@/styles/GlobalConfig";


export const WrapperTopStyled = styled.div`
  box-sizing: content-box;
  color: black;
  height: 80px;
  width: 100%;
  //background-color: pink;
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
  //justify-content: center;
`

export const NavWrapper = styled.div`
  margin: 10px auto 0 auto;
  //margin-top: 10px;
  height: 50px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  
  //overflow-y: hidden;
  //overflow-x: auto;

  //filter: drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
  //drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))

  ${tw`rounded-full shadow-lg md:hover:shadow-xl active:shadow-xl md:active:shadow-md duration-300 bg-white`};
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
  ${tw`rounded-full shadow-lg md:hover:shadow-xl md:hover:scale-110 active:shadow-xl md:active:shadow-lg active:scale-110 md:active:scale-100 duration-200 bg-blue-300 md:hover:bg-blue-400 active:bg-blue-400 md:active:bg-blue-300 md:cursor-pointer text-white`};
`;

export const NavItem = styled.div`
  margin-left: -50px;
  //padding-left: 50px;
  //padding: 0 10px 0 60px;
  min-width: 50px;
  height: 50px;
  line-height: 50px;
  position: relative;
  z-index: ${({z_index}) => z_index || '99'};
  text-align: center;
  flex-shrink: 0;
  flex-grow: 0;
  ${tw`rounded-full antialiased font-sans text-blue-400 bg-white truncate select-none animate-nav_expand.8 md:hover:text-blue-300 active:text-blue-200 md:active:text-blue-400 md:cursor-pointer duration-200`};
`;

export const GapIcon = styled.div`
  position: relative;
  left: 10px;
  z-index: 100;
  ${tw`select-none text-blue-200 animate-icon_expand.8`};
`;

export const FadeInRight = styled.div`
  ${tw`animate-fade_in_right.8`};
`;