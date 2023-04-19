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
        hoverBackground: `:hover &{color: rgba(147, 197, 253, 1);}`,
        styleTopTextA: tw`text-white text-base font-sans font-bold text-left`,
        styleTopTextB: tw`text-white text-2xl font-sans font-bold text-left`,
        styleSubButton: tw`rounded-2xl bg-blue-400 text-white text-base font-bold font-sans text-center align-middle tracking-wider \
                ring-blue-200 ring-0 hover:ring-4 hover:scale-105 active:bg-blue-600 active:ring-blue-400 duration-100 ease-out
                `,
        styleSubTextA: tw`text-white text-base font-sans font-bold text-left`,


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
        hoverBackground: `:hover &{color: rgba(255, 255, 255, 1);}`,
        styleTopTextA: tw`text-white text-base font-sans font-bold text-left text-opacity-60`,
        styleTopTextB: tw`text-white text-2xl font-sans font-bold text-left`,
        styleSubButton: tw`rounded-2xl bg-blue-400 text-white text-base font-bold font-sans text-center align-middle tracking-wider \
                ring-blue-200 ring-0 hover:ring-4 hover:scale-105 active:bg-blue-600 active:ring-blue-400 duration-100 ease-out
                `,
        styleSubTextA: tw`text-white text-base font-sans font-bold text-left text-opacity-60`,
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
        hoverBackground: `:hover &{color: rgba(0, 0, 0, 1);}`,
        styleTopTextA: tw`text-white text-base font-sans font-bold text-left text-opacity-60`,
        styleTopTextB: tw`text-white text-2xl font-sans font-bold text-left`,
        styleSubButton: tw`rounded-2xl bg-blue-400 text-white text-base font-bold font-sans text-center align-middle tracking-wider \
                ring-blue-200 ring-0 hover:ring-4 hover:scale-105 active:bg-blue-600 active:ring-blue-400 duration-100 ease-out
                `,
        styleSubTextA: tw`text-white text-base font-sans font-bold text-left text-opacity-60`,
    },
    green: {
        styleAppleCard: tw`md:col-span-2 col-span-5 m-4 \
                bg-green-200 hover:bg-green-400 active:bg-green-200 \ 
                duration-500 ease-out \ 
                cursor-pointer select-none`,
        styleBackground: tw`text-green-400`,
        styleContent: tw`tracking-widest text-8xl text-white font-bold \
                    group-hover:scale-110 duration-500 ease-out`,
        styleSubBar: tw`text-gray-700 text-xl font-sans bg-white`,
        hoverBackground: `:hover &{color: rgba(167, 243, 208, 1);}`,
        styleTopTextA: tw`text-white text-base font-sans font-bold text-left`,
        styleTopTextB: tw`text-white text-2xl font-sans font-bold text-left`,
        styleSubButton: tw`rounded-2xl bg-green-400 text-white text-base font-bold font-sans text-center align-middle tracking-wider \
                ring-green-200 ring-0 hover:ring-4 hover:scale-105 active:bg-green-600 active:ring-green-400 duration-100 ease-out
                `,
        styleSubTextA: tw`text-white text-base font-sans font-bold text-left`,

    },
}