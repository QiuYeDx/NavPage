import tw, { styled } from 'twin.macro';
import { NavLink } from 'react-router-dom';

export const NavWrapper = styled.div`
  ${tw`truncate`}
  height: 60px;
  background-color: #fff;
  color: #444444;
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
        color: isActive ? "rgb(78, 128, 238)" : "" ,
        backgroundColor: isActive ? "rgba(230, 242, 253, 0.7)" : "",
        borderBottom: isActive ? "2px solid rgb(78, 128, 238)" : "none",
    }),
}))`
  //background-color: #61dafb;
  max-width: 200px;
  flex-grow: 1;

  cursor: pointer;
  position: relative;

  padding: 0 4px;
  transition: all 0.25s ease;

  &:hover{
    color: rgba(0, 0, 0, 0.2);
  }

  @media(max-width: 415px){
    ${({notMobile}) => notMobile ? "display: none;" : "" }
  }
  
  //&:not(:nth-child(1))::before{
  //  position: absolute;
  //  left: 0;
  //  top: 6px;
  //  height: 48px;
  //  line-height: 48px;
  //  content: '';
  //  border-left: 1px solid rgba(78, 128, 238, 30%);
  //}
`

export const LogoWrapper = styled.div`
  //background-color: blueviolet;
  max-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  padding: 0 0 0 12px;
  @media(max-width: 415px){
    padding: 0 0 0 4px;
  }
`

export const Logo = styled.div`
  width: 44px;
  height: 44px;
  //background-color: white;
  //background-image: url("../../assets/images/QiuYeDx.png");
  background-image: url(images/QiuYeDx.png);
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
  &:hover{
    color: rgba(0, 0, 0, 0.2);
  }

  &::before{
    line-height: 8px;
    font-size: 26px;
    content: '—';
  }
  &::after{
    line-height: 8px;
    font-size: 26px;
    content: '—';
   }
  
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
  transition: all .4s cubic-bezier(.32,.63,.45,1.01);
  box-shadow: 0 0 30px 1px rgba(0, 0, 0, 15%);
  background-color: rgba(255, 255, 255, .7);
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
        color: isActive ? "rgba(78, 128, 238, 0.7)" : "" ,
    }),
}))`
  ${tw`tracking-widest`};
  padding-left: 20%;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  margin: 0;
  flex-grow: 0;
  flex-shrink: 1;

  cursor: pointer;
  position: relative;

  transition: all 0.25s ease;

  &:hover {
    color: rgba(0, 0, 0, 0.2);
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

  @media (min-width: 415px) {
    ${({onlyMobile}) => onlyMobile ? "display: none;" : ""}
    height: 60px;
    line-height: 60px;
  }
`