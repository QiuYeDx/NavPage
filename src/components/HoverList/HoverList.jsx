import React from 'react';
import 'twin.macro'
import tw from 'twin.macro'
import {
    HoverListWrapper
} from './Styled.twin'


export default function HoverList(props) {
    return (
        <HoverListWrapper isHidden={props.isHidden} w={props.w} onClick={props.onClick}>
            {props.list ? props.list.map((item, index) => {
                return <li key={index + 1} id={'pageLi_' + (index + 1)}>{item}</li>;
            }) : ''}
        </HoverListWrapper>
    );
}