import tw from "twin.macro";
import {WIDTH_MOBILE} from "@/styles/GlobalConfig";

export const styles = {
    default: {
        styleAppleCard: tw`md:col-span-2 col-span-5 m-4 \
                bg-blue-200 active:bg-blue-400 md:hover:bg-blue-400 md:active:bg-blue-200 \ // 背景色适配移动端触摸逻辑
                 ease-out \ 
                cursor-default md:cursor-pointer select-none`,
        styleBackground: tw`text-blue-400`,
        styleContent: tw`tracking-widest text-8xl text-white font-bold \
                     ease-out`,

        // Text适配移动端触摸逻辑
        hoverContent: `:hover &{ \
        @media(min-width: ${WIDTH_MOBILE}px){scale: 1.1;}   \
        }`,
        activeContent: `:active &{ \
        scale: 1.1;
        @media(min-width: ${WIDTH_MOBILE}px){scale: 1.05;}   \
        }`,

        // SVG适配移动端触摸逻辑 桌面端hover和active同色
        hoverBackground: `:hover &{ \
        @media(min-width: ${WIDTH_MOBILE}px){color: rgba(147, 197, 253, 1);}   \
        }`,
        activeBackground: `:active &{ \
        color: rgba(147, 197, 253, 1);  \
        }`,

        styleSubBar: tw`text-gray-700 text-xl font-sans bg-white`,
        styleTopTextA: tw`text-white text-base font-sans font-bold text-left`,
        styleTopTextB: tw`text-white text-2xl font-sans font-bold text-left`,
        styleSubButton: tw`rounded-2xl bg-blue-400 text-white text-base font-bold font-sans text-center align-middle tracking-wider shrink-0 `,
        styleSubTextA: tw`text-white text-base font-sans font-bold text-left`,


    },
    white: {
        styleAppleCard: tw`md:col-span-2 col-span-5 m-4 \
                bg-white active:bg-black md:hover:bg-black md:active:bg-gray-600 \ // 适配移动端触摸逻辑
                 ease-out \
                cursor-default md:cursor-pointer select-none`,
        styleBackground: tw`text-black`,
        styleContent: tw`tracking-widest text-8xl text-white font-bold \
                     ease-out`,

        // Text适配移动端触摸逻辑
        hoverContent: `:hover &{ \
        @media(min-width: ${WIDTH_MOBILE}px){scale: 1.1;}   \
        }`,
        activeContent: `:active &{ \
        scale: 1.1;
        @media(min-width: ${WIDTH_MOBILE}px){scale: 1.05;}   \
        }`,

        // SVG适配移动端触摸逻辑
        hoverBackground: `:hover &{ \
        color: rgba(0, 0, 0, 1);
        @media(min-width: ${WIDTH_MOBILE}px){color: rgba(255, 255, 255, 1);}   \
        }`,
        activeBackground: `:active &{ \
        color: rgba(255, 255, 255, 1);
        @media(min-width: ${WIDTH_MOBILE}px){color: rgba(255, 255, 255, 1);}   \
        }`,

        styleSubBar: tw`text-gray-700 text-xl font-sans bg-white`,
        styleTopTextA: tw`text-white text-base font-sans font-bold text-left text-opacity-60`,
        styleTopTextB: tw`text-white text-2xl font-sans font-bold text-left`,
        styleSubButton: tw`rounded-2xl bg-blue-400 text-white text-base font-bold font-sans text-center align-middle tracking-wider  shrink-0 \
                ring-blue-200 ring-0 hover:ring-4 hover:scale-105 active:bg-blue-600 active:ring-blue-400 duration-100 ease-out
                `,
        styleSubTextA: tw`text-white text-base font-sans font-bold text-left text-opacity-60`,
    },
    black: {
        styleAppleCard: tw`md:col-span-2 col-span-5 m-4 \
                bg-black active:bg-white md:hover:bg-white md:active:bg-gray-200 \    // 适配移动端触摸逻辑
                 ease-out \
                cursor-default md:cursor-pointer select-none`,
        styleBackground: tw`text-white`,
        styleContent: tw`tracking-widest text-8xl text-white font-bold \
                     ease-out`,

        // Text适配移动端触摸逻辑
        hoverContent: `:hover &{ \
        @media(min-width: ${WIDTH_MOBILE}px){scale: 1.1;}   \
        }`,
        activeContent: `:active &{ \
        scale: 1.1;
        @media(min-width: ${WIDTH_MOBILE}px){scale: 1.05;}   \
        }`,

        // SVG适配移动端触摸逻辑
        hoverBackground: `:hover &{ \
        @media(min-width: ${WIDTH_MOBILE}px){color: rgba(0, 0, 0, 1);}   \
        }`,
        activeBackground: `:active &{ \
        color: rgba(0, 0, 0, 1);  \
        }`,

        styleSubBar: tw`text-gray-700 text-xl font-sans bg-white`,
        styleTopTextA: tw`text-white text-base font-sans font-bold text-left text-opacity-60`,
        styleTopTextB: tw`text-white text-2xl font-sans font-bold text-left`,
        styleSubButton: tw`rounded-2xl bg-blue-400 text-white text-base font-bold font-sans text-center align-middle tracking-wider  shrink-0 \
                ring-blue-200 ring-0 hover:ring-4 hover:scale-105 active:bg-blue-600 active:ring-blue-400 duration-100 ease-out
                `,
        styleSubTextA: tw`text-white text-base font-sans font-bold text-left text-opacity-60`,
    },
    green: {
        styleAppleCard: tw`md:col-span-2 col-span-5 m-4 \
                bg-green-200 active:bg-green-400 md:hover:bg-green-400 md:active:bg-green-300 \   // 适配移动端触摸逻辑
                 ease-out \ 
                cursor-default md:cursor-pointer select-none`,
        styleBackground: tw`text-green-400`,
        styleContent: tw`tracking-widest text-8xl text-white font-bold \
                     ease-out`,

        // Text适配移动端触摸逻辑
        hoverContent: `:hover &{ \
        @media(min-width: ${WIDTH_MOBILE}px){scale: 1.1;}   \
        }`,
        activeContent: `:active &{ \
        scale: 1.1;
        @media(min-width: ${WIDTH_MOBILE}px){scale: 1.05;}   \
        }`,

        // SVG适配移动端触摸逻辑
        hoverBackground: `:hover &{ \
        @media(min-width: ${WIDTH_MOBILE}px){color: rgba(167, 243, 208, 1);}   \
        }`,
        activeBackground: `:active &{ \
        color: rgba(167, 243, 208, 1);  \
        }`,

        styleSubBar: tw`text-gray-700 text-xl font-sans bg-white`,
        styleTopTextA: tw`text-white text-base font-sans font-bold text-left`,
        styleTopTextB: tw`text-white text-2xl font-sans font-bold text-left`,
        styleSubButton: tw`rounded-2xl bg-green-400 text-white text-base font-bold font-sans text-center align-middle tracking-wider  shrink-0 \
                ring-green-200 ring-0 hover:ring-4 hover:scale-105 active:bg-green-600 active:ring-green-400 duration-100 ease-out
                `,
        styleSubTextA: tw`text-white text-base font-sans font-bold text-left`,
    },
    purple: {
        styleAppleCard: tw`md:col-span-2 col-span-5 m-4 \
                bg-purple-200 active:bg-purple-400 md:hover:bg-purple-400 md:active:bg-purple-300 \    // 适配移动端触摸逻辑
                 ease-out \ 
                cursor-default md:cursor-pointer select-none`,
        styleBackground: tw`text-purple-400`,
        styleContent: tw`tracking-widest text-8xl text-white font-bold \
                     ease-out`,

        // Text适配移动端触摸逻辑
        hoverContent: `:hover &{ \
        @media(min-width: ${WIDTH_MOBILE}px){scale: 1.1;}   \
        }`,
        activeContent: `:active &{ \
        scale: 1.1;
        @media(min-width: ${WIDTH_MOBILE}px){scale: 1.05;}   \
        }`,

        // SVG适配移动端触摸逻辑
        hoverBackground: `:hover &{ \
        @media(min-width: ${WIDTH_MOBILE}px){color: rgba(221, 214, 254, 1);}   \
        }`,
        activeBackground: `:active &{ \
        color: rgba(221, 214, 254, 1);  \
        }`,

        styleSubBar: tw`text-gray-700 text-xl font-sans bg-white`,
        styleTopTextA: tw`text-white text-base font-sans font-bold text-left`,
        styleTopTextB: tw`text-white text-2xl font-sans font-bold text-left`,
        styleSubButton: tw`rounded-2xl bg-purple-400 text-white text-base font-bold font-sans text-center align-middle tracking-wider  shrink-0 \
                ring-purple-200 ring-0 hover:ring-4 hover:scale-105 active:bg-purple-600 active:ring-purple-400 duration-100 ease-out
                `,
        styleSubTextA: tw`text-white text-base font-sans font-bold text-left`,
    },
    pink: {
        styleAppleCard: tw`md:col-span-2 col-span-5 m-4 \
                bg-pink-400 active:bg-pink-200 md:hover:bg-pink-300 md:active:bg-pink-200 \    // 适配移动端触摸逻辑
                 ease-out \ 
                cursor-default md:cursor-pointer select-none`,
        styleBackground: tw`text-pink-200`,
        styleContent: tw`tracking-widest text-8xl text-white font-bold \
                     ease-out`,

        // Text适配移动端触摸逻辑
        hoverContent: `:hover &{ \
        @media(min-width: ${WIDTH_MOBILE}px){scale: 1.1;}   \
        }`,
        activeContent: `:active &{ \
        scale: 1.1;
        @media(min-width: ${WIDTH_MOBILE}px){scale: 1.05;}   \
        }`,

        // SVG适配移动端触摸逻辑
        hoverBackground: `:hover &{ \
        @media(min-width: ${WIDTH_MOBILE}px){color: rgba(244, 114, 182, 1);}   \
        }`,
        activeBackground: `:active &{ \
        color: rgba(249, 168, 212, 1);  \
        }`,

        styleSubBar: tw`text-gray-700 text-xl font-sans bg-white`,
        styleTopTextA: tw`text-white text-base font-sans font-bold text-left`,
        styleTopTextB: tw`text-white text-2xl font-sans font-bold text-left`,
        styleSubButton: tw`rounded-2xl bg-pink-400 text-white text-base font-bold font-sans text-center align-middle tracking-wider  shrink-0 \
                ring-pink-200 ring-0 hover:ring-4 hover:scale-105 active:bg-pink-600 active:ring-pink-400 duration-100 ease-out
                `,
        styleSubTextA: tw`text-white text-base font-sans font-bold text-left`,
    },
    gradient_blue:{
        styleAppleCard: tw`md:col-span-2 col-span-5 m-4 \
                bg-gradient-to-r to-sky-400 from-blue-500 \
                before:absolute before:inset-x-0 before:inset-y-0 before:bg-gradient-to-r \
                before:to-pink-500 before:from-indigo-500 before:opacity-0 md:hover:before:opacity-100 md:before:ease-out \
                active:before:opacity-100 md:active:before:opacity-0 \
                 ease-out \ 
                cursor-default md:cursor-pointer select-none`,
        styleBackground: tw`text-blue-300`,
        styleContent: tw`tracking-widest text-8xl text-white font-bold \
                     ease-out`,

        // Text适配移动端触摸逻辑
        hoverContent: `:hover &{ \
        @media(min-width: ${WIDTH_MOBILE}px){scale: 1.1;}   \
        }`,
        activeContent: `:active &{ \
        scale: 1.1;
        @media(min-width: ${WIDTH_MOBILE}px){scale: 1.05;}   \
        }`,

        // SVG适配移动端触摸逻辑
        hoverBackground: `:hover &{ \
        @media(min-width: ${WIDTH_MOBILE}px){color: rgba(221, 214, 254, 1);}   \
        }`,
        activeBackground: `:active &{ \
        color: rgba(221, 214, 254, 1);  \
        @media(min-width: ${WIDTH_MOBILE}px){color: rgba(147, 197, 253, 1);}   \
        }`,
        styleSubBar: tw`text-gray-700 text-xl font-sans bg-white`,
        styleTopTextA: tw`text-white text-base font-sans font-bold text-left`,
        styleTopTextB: tw`text-white text-2xl font-sans font-bold text-left`,
        styleSubButton: tw`rounded-2xl bg-blue-400 text-white text-base font-bold font-sans text-center align-middle tracking-wider  shrink-0 \
                ring-blue-200 ring-0 hover:ring-4 hover:scale-105 active:bg-blue-600 active:ring-blue-400 duration-100 ease-out
                `,
        styleSubTextA: tw`text-white text-base font-sans font-bold text-left`,
    }
}