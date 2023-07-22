import tw, {styled} from "twin.macro";
import {WIDTH_MOBILE} from "@/styles/GlobalConfig";

export const Gap = styled.div`
  height: 1px;
  flex-grow: 1;
  width: 90%;
  ${tw`border border-blue-50 mt-2 mb-2 rounded-full select-none`}
`