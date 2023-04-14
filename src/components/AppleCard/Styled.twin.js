import tw, { styled } from 'twin.macro';
import {
    CardWrapper
} from '../MainCard/Styled.twin'

export const AppleCardWrapper = styled(CardWrapper)`
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  position: relative;
  overflow: hidden;
  ${({_tw_user}) => _tw_user};
`

export const AnimationWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${({hasSubBar}) => hasSubBar ? '68px' : '0'};
  margin: auto;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const BackgroundWrapper = styled.div.attrs(props => ({
    tw: props._tw,
    style: {
        transform: `matrix(1, 0, 0, 1, 0, ${props._Y})`,
    }
}))`
  position: absolute;
  //top: 0;
  //bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  transition: all .5s ease-out, transform 0s;
  ${props => props.tw};
  ${({_hover}) => _hover};
  ${({_tw_user}) => _tw_user};
`

export const ContentWrapper = styled.div`
  position: relative;
  ${({hasMask}) => hasMask ? "mix-blend-mode: difference" : ""};
  ${({_tw}) => _tw};
  ${({_tw_user}) => _tw_user};
`

export const SubBar = styled.div`
  position: absolute;
  bottom: 0;
  height: 68px;
  width: 100%;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  ${tw`pl-4 pr-4`};
  ${({_tw}) => _tw};
  ${({_tw_user}) => _tw_user};
`

export const Logo = styled.div`
  width: 46px;
  height: 46px;
  //background-color: white;
  border-radius: 8px;
  //box-shadow: 0 0 4px rgba(0, 0, 0, 15%);
  //background-image: url(images/QiuYeDx.png);
  background-image: url(${props => props.url || "images/QiuYeDx.png"});
  background-size: cover;
`