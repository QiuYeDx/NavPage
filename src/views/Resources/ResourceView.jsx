import React from 'react';
import {PaddingWrapper, WrapperLeft, WrapperMain, WrapperMiddle, WrapperRight} from "@/layout/MainWrapper";
import WrapperTop from "@/modules/WrapperTop/WrapperTop";
import WrapperBottom from "@/modules/WrapperBottom/WrapperBottom";
import "twin.macro";
import tw from "twin.macro";
import {notify_error} from "@/hooks/toasts";
import {useLocation, useParams} from "react-router-dom";
import Error from "@/views/Error/Error";
import CompDisplay from "@/views/Resources/CompDisplay/CompDisplay";

export default function ResourceView() {
    const location = useLocation();
    const params = useParams();

    const resourceIds = {
        'CompDisplay': <CompDisplay/>
    }
    const ResourceView = (resourceId) => {
        if (!resourceIds[resourceId])
            notify_error("未找到该资源！", "error_notFindResourcePage");
        return (
            <WrapperMain>
                {resourceIds[resourceId] ? resourceIds[resourceId] : <Error/>}
            </WrapperMain>
        );
    };
    const isValid = (resourceId) => resourceIds[resourceId];

    return (
        <PaddingWrapper>
            {isValid(params.resourceId) || location.pathname === '/resources' ?
                <WrapperTop>

                </WrapperTop> : ''}
            <WrapperMiddle>
                <WrapperLeft>

                </WrapperLeft>
                {ResourceView(params.resourceId)}
                <WrapperRight>

                </WrapperRight>
            </WrapperMiddle>
            <WrapperBottom/>
        </PaddingWrapper>
    );
}