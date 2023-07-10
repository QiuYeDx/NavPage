import React from 'react';
import 'twin.macro'
import tw from 'twin.macro'
import {
    HoverListWrapper
} from './Styled.twin'


export default function HoverList(props) {
    return (
        <HoverListWrapper isHidden={props.isHidden} w={props.w} h={props.h} _t={props._t} _l={props._l} onClick={props.onClick}>
            {props.list ? props.list.map((item, index) => {
                return <li className={props.closeClassName || 'closeClassName'} key={index + 1} id={'pageLi_' + (index + 1)}>{item}</li>;
            }) : ''}
        </HoverListWrapper>
    );
}