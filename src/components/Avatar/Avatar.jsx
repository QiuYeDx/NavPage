import React from 'react';
import 'twin.macro'
import {
    AvatarWrapper
} from './Styled.twin'


export default function Avatar(props){
    return (
        <AvatarWrapper img={props.img} hasBorder={props.hasBorder} h={"100px"} w={"100px"} >

        </AvatarWrapper>
    );
}