import tw, { styled } from 'twin.macro'

export const Wrapper = styled.div`
  grid-column: span 4 / span 4;
  
  display: flex;
  flex-direction: column;
  
  padding: 0 5px 0 5px;
  
`

export const BackButton = styled.div`
  margin: 0 auto 0 auto;
  height: 50px;
  max-width: 500px;
  line-height: 50px;
  transition: all 0.2s ease;
  font-size: 20px;
  ${tw`shadow-lg rounded-full active:shadow-md md:active:shadow-md md:hover:shadow-xl animate-fade_in_up.4 \
  bg-white font-sans font-semibold text-gray-700 md:hover:text-gray-400 active:text-gray-400 md:active:text-gray-500 text-center align-middle select-none cursor-pointer`};
  
`

export const ButtonWrapper = styled.div`
  margin-bottom: 15px;
`