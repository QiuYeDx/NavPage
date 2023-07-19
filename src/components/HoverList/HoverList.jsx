import React from 'react';
import 'twin.macro'
import tw from 'twin.macro'
import {
    HoverListWrapper
} from './Styled.twin'

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function HoverList(props) {

    return (
        <HoverListWrapper animate={props.animate} isHidden={props.isHidden} w={props.w} h={props.h} _t={props._t} _b={props._b} _l={props._l} _r={props._r} _tw={props._tw} validText={props.validText} onClick={props.onClick} onAnimationEnd={props.onAnimationEnd}>
            {props.list ? props.list.map((item, index) => {
                return <li className={props.validText === item ? props.closeClassName + ' valid' || 'valid closeClassName' : props.closeClassName || 'closeClassName'} key={index + 1} id={'pageLi_' + (index + 1)}>{item}</li>;
            }) : ''}
        </HoverListWrapper>
    );
}