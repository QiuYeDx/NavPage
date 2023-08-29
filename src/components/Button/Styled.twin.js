import tw, {styled} from 'twin.macro';
import {WIDTH_MOBILE} from "@/styles/GlobalConfig";
import {fadeStyles} from "@/styles/transition/FadeStyles";

export const BaseButton = styled.div`
  ${tw`rounded-2xl bg-blue-400`}
  ${({hasBorder}) => hasBorder ? tw`border-4 border-pink-400` : ""}
  height: ${({h}) => h || "40px"};
  width: ${({w}) => w || "120px"};
  ${({_tw}) => _tw}
`

export const MButton = styled.button`
  ${tw`cursor-default rounded-2xl bg-blue-400 text-white text-base font-bold font-sans text-center align-middle tracking-wider \
  ring-blue-200 ring-0 hover:ring-4 hover:scale-105 active:bg-blue-600 active:ring-blue-400 duration-100 ease-out \
  disabled:bg-gray-400 disabled:hover:ring-0 disabled:hover:scale-100 disabled:cursor-not-allowed\
  select-none md:cursor-pointer`};
  ${({_tw}) => _tw}
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
  flex-shrink: 0;
  line-height: 50px;
  transition: all 0.2s ease;
  font-size: 20px;
  ${tw`shadow-lg rounded-full active:shadow-md md:active:shadow-md md:hover:shadow-xl animate-fade_in_up.4 \
  bg-white font-sans font-semibold text-gray-700 md:hover:text-gray-400 active:text-gray-400 md:active:text-gray-500 text-center align-middle select-none md:cursor-pointer \
  md:w-48`};

  @media (min-width: ${WIDTH_MOBILE}px) {
    &::${({content_direction}) => content_direction ? content_direction : 'after'} {
      content: "${({content}) => content ? content : '返 回'}";
    }
  }
`

export const PageButton = styled.div`
  margin: 0 0 0 0;
  height: 50px;
  width: 50px;
  flex-shrink: 0;
  line-height: 50px;
  transition: all 0.2s ease;
  font-size: 20px;
  z-index: 10;
  position: relative;
  ${tw`shadow-lg rounded-full active:shadow-md md:active:shadow-md md:hover:shadow-xl animate-fade_in_up.4 \
  bg-white font-sans font-semibold text-gray-700 md:hover:text-gray-400 active:text-gray-400 md:active:text-gray-500 text-center align-middle select-none md:cursor-pointer`};

  ${({active}) => active ? tw`bg-blue-400 text-white ring-blue-200 ring-4 md:hover:bg-blue-300 md:hover:text-white active:text-blue-300 active:bg-blue-500 active:ring-blue-400` : ''};
`

export const UniButton = styled(PageButton)`
  animation: none;
  ${({hasShadow}) => hasShadow ? tw`shadow-md active:shadow-lg md:active:shadow-md md:hover:shadow-lg` : tw`shadow-none hover:shadow-none`};
  ${({_tw}) => _tw ? _tw : ''};
`;