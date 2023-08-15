import tw, {styled} from "twin.macro";
import {WIDTH_MOBILE} from "@/styles/GlobalConfig";

export const TextInputLine = styled.input.attrs(props => ({
    autoComplete: 'off'
}))`
  height: 40px;
  text-align: center;
  //justify-content: center;
  flex-grow: 1;
  //flex-shrink: 1;
  //max-width: 420px;
  min-width: 298px;
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
  ${tw`rounded-full caret-blue-500 placeholder:text-gray-400 placeholder:text-white focus:placeholder:text-red-300\
  focus:outline-none md:ring-1 md:ring-gray-400 md:focus:ring-2 md:focus:ring-blue-500 md:hover:ring-blue-500 pr-6 pl-6`};
  ${(props) => props.invalid ? tw`placeholder:text-red-400 md:ring-red-400 md:ring-2` : ''};
`

export const SearchInputLine = styled.input.attrs(props => ({
    autoComplete: 'off'
}))`
  text-align: center;
  flex-grow: 1;
  //min-width: 298px;
  width: 100%;
  box-sizing: border-box;
  ${tw`h-12 md:text-lg rounded-full caret-blue-500 placeholder:tracking-widest placeholder:text-gray-300 focus:placeholder:text-blue-300 \
  focus:outline-none px-12 placeholder:transition-colors font-sans text-blue-400 \
  `};
  ${(props) => props.invalid ? tw`placeholder:text-red-400 md:ring-red-400 md:ring-2` : ''};
`

export const InputDesc = styled.label.attrs(props => ({
    for: props.for
}))`
  display: inline-block;
  position: absolute;
  background-color: rgba(255, 255, 255, 0);
  ${tw`truncate left-2/4 cursor-text select-none top-2/4 -translate-x-2/4 -translate-y-2/4 text-base text-blue-500 pl-2 pr-2 \
   peer-focus:text-blue-500 \
   peer-placeholder-shown:text-gray-400 pointer-events-none`};
`;

export const InputIcon = styled.label.attrs(props => ({
    for: props.for
}))`
  position: absolute;
  //top: 20px;
  transition: all 0.25s ease;
  height: 32px;
  width: 32px;
  & *{
    margin-left: 0 !important;
  }
  ${tw`truncate right-1.5 p-0.5 select-none md:cursor-pointer text-blue-400 active:text-blue-300 md:hover:text-blue-300 md:active:text-blue-400 rounded-full bg-white md:hover:bg-blue-50 md:active:bg-blue-100 align-middle \
   peer-placeholder-shown:text-gray-400 peer-placeholder-shown:cursor-text peer-placeholder-shown:hidden top-2/4 -translate-y-2/4 text-xl`};
`;

// export const InputIcon2 = styled.label.attrs(props => ({
//     for: props.for
// }))`
//   position: absolute;
//   transition: all 0.25s ease;
//   ${tw`truncate right-2 select-none md:cursor-pointer text-blue-300 md:hover:text-blue-400 pl-1 pr-2 bg-white \
//    peer-placeholder-shown:cursor-text hidden peer-placeholder-shown:block top-2/4 -translate-y-2/4 text-xl`};
// `;

export const InputIcon2 = styled.label.attrs(props => ({
    for: props.for
}))`
  position: absolute;
  transition: all 0.25s ease;
  ${tw`truncate right-2 select-none md:cursor-pointer text-blue-300 active:text-blue-400 md:hover:text-blue-400 pl-1 pr-2 bg-white \
   peer-placeholder-shown:cursor-text hidden peer-placeholder-shown:block top-2/4 -translate-y-2/4 text-xl pointer-events-none`};
`;

export const TextInputLineWrapper = styled.div`
  position: relative;
  margin-top: 10px;
  justify-content: center;
  flex-shrink: 1;
  flex-grow: 2;
  display: flex;
  height: 40px;
  ${tw`cursor-default md:cursor-pointer`};
  ${({_tw}) => _tw ? _tw : ''};
`;