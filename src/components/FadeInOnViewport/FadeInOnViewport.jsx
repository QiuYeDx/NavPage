import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import tw, {styled} from "twin.macro";
import {randomNum} from "@/utils/utils";

export const Wrapper = styled.div`
  display: contents;
  & > *{
    transition: all 0.6s ease-out;
    ${({fade_in}) => fade_in ? `opacity: 1` : 'opacity: 0'};
  }
  ${({_tw}) => _tw ? _tw : ''};
`

function FadeInOnViewport(props) {
    const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
    const [ref, inView] = useInView();
    const [key] = useState(randomNum(1, 9999));

    useEffect(() => {
        if (inView && !hasEnteredViewport) {
            setHasEnteredViewport(true);
        }
    }, [inView, hasEnteredViewport]);

    return (
        <Wrapper fade_in={hasEnteredViewport} _tw={props.tw} key={props.key ? props.key : key}>
            <span ref={ref} tw={'invisible'}> </span>
            {props.children}
        </Wrapper>
    );
}

export default FadeInOnViewport;
