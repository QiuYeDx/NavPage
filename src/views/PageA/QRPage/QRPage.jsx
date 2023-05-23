import React, {useEffect} from 'react';
import {BackButton, ButtonWrapper, Wrapper} from "@/views/PageA/QRPage/Styled.twin";
import {notify_success} from "@/hooks/toasts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import tw from "twin.macro";
import MainCard from "@/components/MainCard/MainCard";
import {useNavigate} from "react-router-dom";

export default function QRPage(){
    const navigate = useNavigate();
    useEffect(() => {
        notify_success("跳转到「二维码生成器」", "A_4");
    });
    return (
        <Wrapper>
            <ButtonWrapper>
                <BackButton onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={solid("chevron-left")} tw={'pr-4 align-middle relative -top-px'}/>
                    返 回
                </BackButton>
            </ButtonWrapper>

        </Wrapper>
    );
}