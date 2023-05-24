import tw, { styled } from 'twin.macro';
import {WIDTH_MOBILE} from "@/styles/GlobalConfig";

export const BaseButton = styled.div`
  ${tw`rounded-2xl bg-blue-400`} 
  ${({hasBorder}) => hasBorder ? tw`border-4 border-pink-400` : ""}
  height: ${({h}) => h || "40px"};
  width: ${({w}) => w || "120px"};
  ${({_tw}) => _tw }
`

export const MButton = styled.button`
  ${tw`rounded-2xl bg-blue-400 text-white text-base font-bold font-sans text-center align-middle tracking-wider \
  ring-blue-200 ring-0 hover:ring-4 hover:scale-105 active:bg-blue-600 active:ring-blue-400 duration-100 ease-out \
  disabled:bg-gray-400 disabled:hover:ring-0 disabled:hover:scale-100 disabled:cursor-not-allowed\
  select-none cursor-pointer`};
  ${({_tw}) => _tw }
  height: ${({h}) => h || "32px"};
  line-height: ${({h}) => h || "32px"};
  width: ${({w}) => w || "86px"};
  ${({_tw_user}) => _tw_user};
`

export const BackButton = styled.div`
  margin: 0 0 0 0;
  height: 50px;
  //max-width: 500px;
  width: 50px;
  //min-width: 120px;
  line-height: 50px;
  transition: all 0.2s ease;
  font-size: 20px;
  ${tw`shadow-lg rounded-full active:shadow-md md:active:shadow-md md:hover:shadow-xl animate-fade_in_up.4 \
  bg-white font-sans font-semibold text-gray-700 md:hover:text-gray-400 active:text-gray-400 md:active:text-gray-500 text-center align-middle select-none cursor-pointer \
  md:w-48`};

  @media(min-width: ${WIDTH_MOBILE}px){
    &::after{
      content: '返 回';
    }
  }
`