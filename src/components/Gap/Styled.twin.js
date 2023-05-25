import tw, {styled} from "twin.macro";
import {WIDTH_MOBILE} from "@/styles/GlobalConfig";

export const Gap = styled.div`
  height: 1px;
  flex-grow: 1;
  width: 90%;
  ${tw`border border-gray-200 mt-2 mb-2 select-none`}
`