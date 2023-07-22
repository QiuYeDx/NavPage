import React, {useState} from 'react';
import 'twin.macro'
import tw from 'twin.macro'
import {
    Wrapper, Line, Wrap
} from './Styled.twin'


export default function MenuButton(props) {
    return (
        <Wrap isRotated={props.isRotated}>
            <Wrapper className={props.active ? 'active' : ''} isRotated={props.isRotated} _tw={props._tw}>
                <Line className={'line'} rounded={props.rounded}/>
                <Line className={'line'} rounded={props.rounded}/>
                <Line className={'line'} rounded={props.rounded}/>
            </Wrapper>
        </Wrap>
    );
}