import tw, { styled } from 'twin.macro';
import { NavLink } from 'react-router-dom';

export const NavWrapper = styled.div`
  ${tw`truncate`}
  height: 60px;
  //background-color: antiquewhite;
  color: #444444;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;

  font-size: 18px;
  line-height: 60px;
  text-align: center;

  z-index: 1000;
  box-shadow: 0 0 30px 1px rgba(0, 0, 0, 5%);
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
    ${({screen}) => screen === "mobile" ? "display: none;" : "" }
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

