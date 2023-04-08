import React from 'react';
import 'twin.macro'
import {
    CardWrapper
} from './Styled.twin'


export default function MainCard(props){
    return (
        <CardWrapper _tw={props._tw} h={props.h} w={props.w}>
            {props.children}
        </CardWrapper>
    );
}