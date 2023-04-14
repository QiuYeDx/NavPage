import tw from "twin.macro";

export const styles = {
    default: {
        styleAppleCard: tw`md:col-span-2 col-span-5 m-4 \
                bg-blue-200 hover:bg-blue-400 active:bg-blue-200 \ 
                duration-500 ease-out \ 
                cursor-pointer select-none`,
        styleBackground: tw`text-blue-400`,
        styleContent: tw`tracking-widest text-8xl text-white font-bold \
                    group-hover:scale-110 duration-500 ease-out`,
        styleSubBar: tw`text-gray-700 text-xl font-sans bg-white`,
        hoverBackground: `:hover &{color: rgba(147, 197, 253, 1);}`
    },
    white: {
        styleAppleCard: tw`md:col-span-2 col-span-5 m-4 \
                bg-white hover:bg-black active:bg-gray-600 \
                duration-500 ease-out \
                cursor-pointer select-none`,
        styleBackground: tw`text-black`,
        styleContent: tw`tracking-widest text-8xl text-white font-bold \
                    group-hover:scale-110 duration-500 ease-out`,
        styleSubBar: tw`text-gray-700 text-xl font-sans bg-white`,
        hoverBackground: `:hover &{color: rgba(255, 255, 255, 1);}`
    },
    black: {
        styleAppleCard: tw`md:col-span-2 col-span-5 m-4 \
                bg-black hover:bg-white active:bg-gray-200 \
                duration-500 ease-out \
                cursor-pointer select-none`,
        styleBackground: tw`text-white`,
        styleContent: tw`tracking-widest text-8xl text-white font-bold \
                    group-hover:scale-110 group-hover:text-white duration-500 ease-out`,
        styleSubBar: tw`text-gray-700 text-xl font-sans bg-white`,
        hoverBackground: `:hover &{color: rgba(0, 0, 0, 1);}`
    }
}