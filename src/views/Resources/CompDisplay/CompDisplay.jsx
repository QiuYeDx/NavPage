import React, { useState} from 'react';
import 'twin.macro';
import tw from "twin.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import SwitchButtonX from "@/components/Button/SwitchButtonX";
import {Gap} from "@/components/Gap/Styled.twin";
import {ContentWrapper} from "@/views/Resources/CompDisplay/Styled.twin";
import {H2} from "@/styles/TextStyles";

export default function CompDisplay() {
    const [isOn, setIsOn] = useState(false);
    return (
        <ContentWrapper tw={'col-span-4 overflow-hidden h-fit'}>
            <H2>SwitchButtonX</H2>
            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX size={'tiny'} duration={'300ms'} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'tiny'} duration={'300ms'} isOn={isOn} onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'tiny'} duration={'300ms'} disabled={true} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'tiny'} duration={'300ms'} loading={true}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX size={'small'} duration={'300ms'} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'small'} duration={'300ms'} isOn={isOn} onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'small'} duration={'300ms'} disabled={true} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'small'} duration={'300ms'} loading={true}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX duration={'300ms'} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} isOn={isOn} onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} disabled={true} isOn={isOn} onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} loading={true} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX duration={'300ms'} onColor={'pink'} offColor={'orange'}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} onColor={'pink'} offColor={'orange'} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} onColor={'pink'} offColor={'orange'} disabled={true} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} onColor={'pink'} offColor={'orange'} loading={true}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX duration={'300ms'} onColor={'green'} offColor={'red'}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} onColor={'green'} offColor={'red'} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} onColor={'green'} offColor={'red'} disabled={true} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} onColor={'green'} offColor={'red'} loading={true}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX size={'large'} duration={'300ms'} onColor={'green'} offColor={'red'}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'large'} duration={'300ms'} onColor={'green'} offColor={'red'} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'large'} duration={'300ms'} onColor={'green'} offColor={'red'} disabled={true}
                               isOn={isOn} onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'large'} duration={'300ms'} onColor={'green'} offColor={'red'} loading={true}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX size={'huge'} duration={'300ms'} onColor={'green'} offColor={'red'}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'huge'} duration={'300ms'} onColor={'green'} offColor={'red'} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'huge'} duration={'300ms'} onColor={'green'} offColor={'red'} disabled={true}
                               isOn={isOn} onChange={(v) => setIsOn(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'huge'} duration={'300ms'} onColor={'green'} offColor={'red'} loading={true}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn}
                               onChange={(v) => setIsOn(v)}/>
            </div>

        </ContentWrapper>
    );
}