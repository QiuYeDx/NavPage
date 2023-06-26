import tw, {styled} from "twin.macro";
import {WIDTH_MOBILE} from "@/styles/GlobalConfig";

export const TextInputLine = styled.input`
  height: 40px;
  text-align: center;
  //justify-content: center;
  flex-grow: 1;
  //flex-shrink: 1;
  //max-width: 420px;
  min-width: 260px;
  box-sizing: border-box;
  @media(max-width: ${WIDTH_MOBILE}px){
    //max-width: 280px;
    border-width: 1px;
    border-color: rgb(156 163 175);
    &:focus{
      border-width: 2px;
      border-color: rgb(59 130 246);
    }
    ${(props) => props.invalid ? 'border-width: 2px; border-color: rgb(248 113 113);' : ''};
  }
  ${tw`placeholder-shown:pl-2 placeholder-shown:pr-2 rounded-full caret-blue-500 placeholder:text-gray-400 focus:placeholder:text-blue-400\
  focus:outline-none md:ring-1 md:ring-gray-400 md:focus:ring-2 md:focus:ring-blue-500 md:hover:ring-blue-500 pr-8 pl-6`};
  ${(props) => props.invalid ? tw`placeholder:text-red-400 md:ring-red-400 md:ring-2` : ''};
`

export const InputDesc = styled.label.attrs(props => ({
    for: props.for
}))`
  position: absolute;
  transition: all 0.25s ease;
  ${tw`truncate left-2/4 cursor-text select-none -top-3 -translate-x-2/4 translate-y-0 text-sm text-blue-500 bg-white pl-2 pr-2 \
   peer-focus:-top-3 peer-focus:-translate-x-2/4 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white \
   peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2/4 peer-placeholder-shown:-translate-x-2/4 peer-placeholder-shown:-translate-y-2/4 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent`};
`;

export const InputIcon = styled.label.attrs(props => ({
    for: props.for
}))`
  position: absolute;
  transition: all 0.25s ease;
  ${tw`truncate right-3.5 select-none md:cursor-pointer text-blue-500 pl-1 opacity-100 bg-white \
   peer-placeholder-shown:text-gray-400 peer-placeholder-shown:cursor-text peer-placeholder-shown:opacity-0 top-2/4 -translate-y-2/4 text-xl`};
`;

export const TextInputLineWrapper = styled.div`
  position: relative;
  margin-top: 10px;
  justify-content: center;
  flex-shrink: 1;
  flex-grow: 2;
  display: flex;
`;