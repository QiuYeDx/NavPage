import tw, { styled } from 'twin.macro';

export const HoverListWrapper = styled.ul`
  ${tw`shadow-2xl rounded-2xl active:shadow-2xl md:hover:shadow-2xl animate-fade_in_up.4 bg-white overscroll-none overflow-x-hidden overflow-y-auto`}; 
  margin: auto;
  width: ${({w}) => w || "120px"};
  height: 340px;
  position: absolute;
  top: -350px;
  left: -30px;
  //display: flex; // 打开会有奇怪的bug...
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
  text-align: center;
  z-index: 500;
  transition: all .3s ease;
  ${({isHidden}) => isHidden ? 'display: none' : ''};
  & li{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 0 6px 0;
    font-size: 18px;
    min-height: 18px;
    flex-shrink: 0;
    flex-grow: 1;
    text-align: center;
    ${tw`font-medium text-gray-700 md:hover:text-gray-300  duration-100 select-none cursor-pointer`};
  }
  & li:active{
    ${tw`text-gray-500`};
  }
  &::-webkit-scrollbar {
    display: none;
  }
  
  ${({_tw}) => _tw };
`
