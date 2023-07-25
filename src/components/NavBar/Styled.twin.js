import tw, { styled } from 'twin.macro';
import { NavLink } from 'react-router-dom';
import {WIDTH_MOBILE} from "@/styles/GlobalConfig";

export const NavWrapper = styled.div`
  ${tw`truncate text-gray-500`}
  height: 60px;
  background-color: #fff;
  //color: #444444;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;

  font-size: 18px;
  line-height: 60px;
  text-align: center;
  
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  
  transition: box-shadow .3s ease;
  ${({hasShadow}) => hasShadow ? 'box-shadow: 0 0 30px 1px rgba(0, 0, 0, 5%)' : ''};
`

export const BlankWrapper = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
  flex-shrink: 0;
  height: 60px;
`

export const NavList = styled.div`
  //background-color: #bfc;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
`

export const NavItem = styled(NavLink).attrs(props => ({
    style: ({ isActive }) => ({
        color: isActive ? "rgb(59, 130, 246)" : "" ,
        backgroundColor: isActive ? "rgba(239 246 255)" : "",
        // borderBottom: isActive ? "2px solid rgb(78, 128, 238)" : "none",
    }),
}))`
  //background-color: #61dafb;
  max-width: 200px;
  flex-grow: 1;

  //cursor: pointer;
  position: relative;

  padding: 0 4px;
  transition: all 0.35s ease;
  
  ${tw`md:hover:opacity-40`};
  //&:hover{
  //  
  //}

  @media(max-width: ${WIDTH_MOBILE}px){
    ${({notMobile}) => notMobile ? "display: none;" : "" }
  }
  
  &::before{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 0;
    transition: all 0.35s ease;
    width: ${props => props.style.isActive ? '100%' : '0'};
    content: '';
    border-bottom: 2px solid rgba(59, 130, 246, .8);
  }
  
  &.active::before{
    width: 100%;
  }
  ${tw`md:tracking-widest font-medium cursor-default md:cursor-pointer`};
`

export const LogoWrapper = styled.div`
  //background-color: blueviolet;
  max-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  //cursor: pointer;

  padding: 0 0 0 12px;
  @media(max-width: 415px){
    padding: 0 0 0 4px;
  }
  ${tw`cursor-default md:cursor-pointer`};
`

export const Logo = styled.div`
  width: 44px;
  height: 44px;
  //background-color: white;
  //background-image: url("../../assets/images/QiuYeDx.png");
  background-image: url(images/QiuYeDx_web.png);
  background-size: cover;

  @media(max-width: 415px){
    display: none;
  }
`

export const LogoText = styled.div`
  ${tw`font-sans font-bold tracking-wide`}
  margin: 0 10px;

  font-size: 24px;

`

export const MoreWrapper = styled(LogoWrapper)`
  width: 60px;

  display: flex;
  flex-direction: column;


  padding: 0 0 0 0;
  transition: all 0.25s ease;
  //&:hover{
  //  color: rgba(0, 0, 0, 0.2);
  //}

  //&::before{
  //  line-height: 8px;
  //  font-size: 26px;
  //  content: '—';
  //}
  //&::after{
  //  line-height: 8px;
  //  font-size: 26px;
  //  content: '—';
  // }
  
  @media(min-width: 1200px){
    margin-left: 140px;
  }
`

export const MoreList = styled.div`
  position: fixed;
  z-index: 999;
  //height: 150px;
  width: 100%;
  top: ${({isShown}) => isShown? '60px' : '-150px'};
  //transition: all .4s cubic-bezier(.32,.63,.45,1.01);
  transition: all .4s cubic-bezier(.25,.69,.35,1.01);
  box-shadow: 0 0 30px 1px rgba(0, 0, 0, 15%);
  background-color: rgba(255, 255, 255, .9);
  backdrop-filter: blur(12px);
  overflow: hidden;
  
  ${tw`rounded-bl-3xl rounded-br-3xl`};
  
  display: flex;
  flex-direction: column;
  align-items: center;
  //text-align: center;
`

export const MoreListItem = styled(NavLink).attrs(props => ({
    style: ({ isActive }) => ({
        color: isActive ? "rgba(59, 130, 246, 0.7)" : "" ,
    }),
}))`
  ${tw`tracking-widest font-medium text-gray-500 cursor-default md:cursor-pointer md:hover:opacity-40`};
  padding-left: 20%;
  padding-right: 20%;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  margin: 0;
  flex-grow: 0;
  flex-shrink: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  //cursor: pointer;
  position: relative;

  transition: all 0.25s ease;

  &:hover {
    //color: rgba(0, 0, 0, 0.3);
    //opacity: 0.4;
    background-color: rgba(255, 255, 255, .5);
  }

  &:not(:last-child)::after {
    position: absolute;
    left: 20%;
    right: 20%;
    content: "";
    height: 100%;
    //width: 60%;
    //max-width: 480px;
    margin: auto;
    border-bottom: 1px solid rgba(78, 128, 238, .3);
  }

  @media (min-width: ${WIDTH_MOBILE}px) {
    ${({onlyMobile}) => onlyMobile ? "display: none;" : ""}
    height: 60px;
    line-height: 60px;
  }
`

export const MoreListMask = styled.div.attrs(props => ({
    style: {
        // display: props.isShow ? 'block' : 'none',
        zIndex: props.isShow? '999' : '-1',
        backgroundColor: props.isShow ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
    }
}))`
  position: fixed;
  top: 0;
  height: 100%;
  left: 0;
  right: 0;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease;
  z-index: 999;
`