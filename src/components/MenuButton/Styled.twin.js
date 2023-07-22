import tw, { styled } from 'twin.macro';

export const Wrap = styled.div`
  ${({isRotated}) => isRotated ? 'transform: rotate(180deg)' : ''};
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  transition: all 0.25s ease;
  ${tw`md:hover:cursor-pointer group-active:opacity-40 md:group-active:opacity-60 md:group-hover:opacity-40`};

  &.active .line:nth-child(1){
    transform: rotate(45deg) translate(4px, ${({isRotated}) => isRotated ? '4.6px' : '4.3px'});
    width: 21px;
  }

  &.active .line:nth-child(2){
    opacity: 0;
  }
  
  &.active .line:nth-child(3){
    transform: rotate(-45deg) translate(4px, ${({isRotated}) => isRotated ? '-4.6px' : '-4.3px'});
    width: 21px;
  }

  ${({_tw}) => _tw };
`;

export const Line = styled.div`
    //background-color: black;
    ${tw`bg-blue-400`};
    width: 20px;
    height: 3px;
    transition: all 0.25s ease;
    ${({rounded}) => rounded ? 'border-radius: 9999px' : ''};
`;