import tw, {styled} from "twin.macro";

export const Wrapper = styled.div`
  max-height: 480px;
  display: flex;
  flex-direction: column;
  position: relative;
  top: -42px;
  //padding-top: 42px;
  ${tw`bg-white overflow-auto rounded-b-3xl shadow-xl md:hover:shadow-2xl overscroll-contain duration-500`};
`;

export const TableWrapper = styled.table`
  max-height: 360px;
  position: relative;
  flex-grow: 1;
  
  ${tw`flex-wrap caption-top border-collapse table-auto bg-white rounded-3xl shadow-xl md:hover:shadow-2xl duration-500 overflow-auto`};
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
    height: 100%;
    width: calc(100% - 2rem);
    z-index: 200;
    ${tw`bg-blue-50 rounded-md`};
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
  position: relative;
  z-index: 310;
  ${tw`bg-blue-300 text-white rounded-3xl shadow-md md:hover:shadow-lg md:hover:scale-102 duration-500 overflow-hidden`};
`;

export const Tbody = styled.tbody`
  & tr{
    ${tw`md:hover:opacity-60`};
  }
`;

export const Th = styled.th`
  &:first-child{
    ${tw`pl-3 rounded-l-full`};
  }
  &:last-child{
    ${tw`pr-3 rounded-r-full`};
  }
  ${tw`text-base md:text-xl font-bold font-sans text-center align-middle leading-10 md:leading-10`};
`;

export const Td = styled.td`
  position: relative;
  z-index: 210;
  max-width: 100px;
  white-space: nowrap;
  &:first-child{
    ${tw`pl-3`};
  }
  &:last-child{
    ${tw`pr-3`};
  }
  ${tw`text-sm md:text-base text-gray-600 font-sans text-center align-middle leading-8 md:leading-8 overflow-auto`};
`;

export const Caption = styled.caption`
  position: relative;
  z-index: 300;
  ${tw`m-2`};
`;