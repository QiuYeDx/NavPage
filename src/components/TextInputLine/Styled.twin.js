import tw, {styled} from "twin.macro";
import {WIDTH_MOBILE} from "@/styles/GlobalConfig";

export const TextInputLine = styled.input`
  height: 40px;
  text-align: center;
  justify-content: center;
  //flex-grow: 1;
  flex-shrink: 1;
  width: 420px;
  box-sizing: border-box;
  @media(max-width: ${WIDTH_MOBILE}px){
    width: 240px;
    border-width: 1px;
    border-color: rgb(156 163 175);
    &:focus{
      border-width: 2px;
      border-color: rgb(59 130 246);
    }
    ${(props) => props.invalid ? 'border-width: 2px; border-color: rgb(248 113 113);' : ''};
  }
  ${tw`rounded-full caret-blue-500 placeholder:text-gray-400 focus:placeholder:text-blue-400\
  focus:outline-none md:ring-1 md:ring-gray-400 md:focus:ring-2 md:focus:ring-blue-500 md:hover:ring-blue-500 pl-2 pr-2`};
  ${(props) => props.invalid ? tw`placeholder:text-red-400 md:ring-red-400 md:ring-2` : ''};
`