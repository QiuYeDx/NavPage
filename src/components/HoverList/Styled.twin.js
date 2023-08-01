import tw, { styled } from 'twin.macro';

export const HoverListWrapper = styled.ul`
  ${tw`shadow-2xl rounded-2xl active:shadow-2xl md:hover:shadow-2xl animate-fade_in_up.4 bg-white overscroll-none overflow-x-hidden overflow-y-auto border border-slate-100`};
  margin: auto;
  width: ${({w}) => w || "120px"};
  //height: ${({h}) => h || "initial"};
  max-height: ${({h}) => h || "264px"};
  position: absolute;
  top: ${({_t}) => _t ? _t : "initial"};
  bottom: ${({_b}) => _b ? _b : "initial"};
  right: ${({_r}) => _r ?  _r : "initial"};
  left: ${({_l}) => _l ?  _l : "initial"};
  //display: flex; // 打开会有奇怪的bug...
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
  text-align: center;
  z-index: 710;
  transition: all .3s ease;
  ${({_tw}) => _tw};
  ${({animate}) => animate};
  ${({isHidden}) => isHidden ? 'display: none' : ''};
  
  & li {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 0 6px 0;
    font-size: 18px;
    min-height: 36px;
    //flex-shrink: 0;
    //flex-grow: 1;
    text-align: center;
    line-height: initial;
    ${tw`m-1.5 rounded-lg text-gray-700 active:text-gray-500 md:active:text-gray-600 md:hover:text-gray-500 md:hover:bg-gray-50 duration-100 select-none cursor-pointer`};
  }
  
  & li.valid {
    box-sizing: border-box;
    ${tw`bg-blue-50 text-blue-400 md:hover:text-blue-300`};
  }
  
  & li:not(:last-child) {
    //border-bottom: 0.5px solid rgba(192, 192, 192, 0.4);
  }

  &::-webkit-scrollbar {
    display: none;
  }

  ${({_tw}) => _tw};
`
