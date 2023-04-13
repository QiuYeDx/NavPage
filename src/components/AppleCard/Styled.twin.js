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
`

export const BackgroundWrapper = styled.div`
  position: absolute;
  //top: 0;
  //bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  transition: all .5s ease-out, transform 0s;
  transform: matrix(1, 0, 0, 1, 0, ${({_Y}) => _Y || '-6'});
`

export const ContentWrapper = styled.div`
  position: relative;
  ${({_tw}) => _tw};
  //transition: all .5s ease;
`