import React from 'react';
import { Wrapper, ErrorWrapper } from "./Styled.twin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import { H1, P } from "@/styles/TextStyles"
import tw from 'twin.macro';

export default function Error(){

    return (
        <Wrapper>
            <ErrorWrapper tw={'min-h-[320px] flex flex-col gap-4 pt-8 mx-6'}>
                <FontAwesomeIcon icon={regular("face-frown")} size="10x" color={"rgb(255,242,241)"}/>
                <H1 color={"rgb(255,242,241)"}>404 Not Found</H1>
                <P tw={'text-lg'} color={"rgb(255,242,241)"}>{`您访问的资源不存在`}</P>
            </ErrorWrapper>
        </Wrapper>
    );
}