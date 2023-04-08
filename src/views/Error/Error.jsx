import React from 'react';
import { Wrapper, ErrorWrapper } from "./Styled.twin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import { H1, P } from "@/styles/TextStyles"

export default function PageA(){

    return (
        <Wrapper>
            <ErrorWrapper>
                <FontAwesomeIcon icon={regular("face-frown")} size="10x" color={"rgb(255,242,241)"}/>
                <br/>
                <H1 color={"rgb(255,242,241)"}>404 Not Found</H1>
                <br/>
                <P color={"rgb(255,242,241)"}>{`您访问的资源不存在`}</P>
            </ErrorWrapper>
        </Wrapper>
    );
}