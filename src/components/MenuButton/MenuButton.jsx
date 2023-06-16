import React, {useState} from 'react';
import 'twin.macro'
import tw from 'twin.macro'
import {
    Wrapper, Line
} from './Styled.twin'


export default function MenuButton(props) {
    return (
        <Wrapper className={props.active ? 'active' : ''} _tw={props._tw}>
            <Line className={'line'} rounded={props.rounded}/>
            <Line className={'line'} rounded={props.rounded}/>
            <Line className={'line'} rounded={props.rounded}/>
        </Wrapper>
    );
}