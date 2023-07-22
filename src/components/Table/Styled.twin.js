import tw, {styled} from "twin.macro";
import {WIDTH_MOBILE} from "@/styles/GlobalConfig";

export const Wrapper = styled.div`
  max-height: 480px;
  ${({h}) => h ? 'height: ' + h : ''};
  display: flex;
  flex-direction: column;
  position: relative;
  //top: -42px;
  //padding-top: 42px;
  ${tw`bg-white overflow-y-auto rounded-3xl shadow-xl md:hover:shadow-2xl overscroll-none duration-500`};
`;

export const TableWrapper = styled.table`
  //max-height: 360px;
  position: relative;
  flex-grow: 0;
  
  ${tw`mb-2 flex-wrap caption-top border-collapse table-auto bg-white rounded-3xl duration-500 overflow-auto`};
`;

export const Tr = styled.tr`
  &:nth-child(even){
    position: relative;
    z-index: 205;
  }
  &:nth-child(even)::after{
    content: '';
    position: absolute;
    left: 1rem;
    //height: 100%; // Safari表现异常 可恶(〃＞皿＜)
    height: 2rem;
    width: calc(100% - 2rem);
    z-index: 200;
    ${tw`bg-blue-50 rounded-md`};
    @media(max-width: ${WIDTH_MOBILE}px){
      left: 0.5rem;
      width: calc(100% - 1rem);
    }
  }
  // &:nth-child(even) td{
  //   ${tw`bg-blue-50`};
  // }
  &:last-child td{
    &:first-child{
      ${tw`rounded-bl-3xl`};
    }
    &:last-child{
      ${tw`rounded-br-3xl`};
    }
  }
  
  ${tw`text-base font-sans text-center align-middle`};
`;

export const Thead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 610;
  ${tw`bg-blue-300 text-white rounded-3xl shadow-md md:hover:shadow-lg duration-500 overflow-hidden`};
`;

export const Tbody = styled.tbody`
  max-height: 480px;
  & tr{
    ${tw`md:hover:opacity-60`};
  }
  &::before{
    content: '';
    position: absolute;
    top: 42px;
    left: 0;
    height: calc(100% - 42px);
    width: 16px;
    @media(max-width: ${WIDTH_MOBILE}px){
      width: 7.8px;
    }
    z-index: 600;
    ${tw`bg-white`};
  }
  &::after{
    content: '';
    position: absolute;
    top: 42px;
    right: 0;
    height: calc(100% - 42px);
    width: 16px;
    @media(max-width: ${WIDTH_MOBILE}px){
      width: 7.8px;
    }
    z-index: 600;
    ${tw`bg-white`};
  }
`;

export const Th = styled.th`
  &:first-child{
    ${tw`pl-3`};
  }
  &:last-child{
    ${tw`pr-3`};
  }
  ${tw`text-base md:text-xl font-bold font-sans text-center align-middle leading-10 md:leading-10`};
`;

export const Td = styled.td`
  position: relative;
  z-index: 210;
  max-width: 100px;
  white-space: nowrap;
  ${tw`text-sm md:text-base text-gray-600 font-sans text-center align-middle leading-8 md:leading-8 overflow-auto`};
  &:first-child{
    ${tw`pl-3`};
  }
  &:last-child{
    ${tw`pr-3`};
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Caption = styled.caption`
  position: absolute;
  z-index: 300;
  ${tw`m-2`};
`;