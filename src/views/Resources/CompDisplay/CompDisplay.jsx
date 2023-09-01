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
    const [isOn2, setIsOn2] = useState(false);
    const [isOn3, setIsOn3] = useState(false);
    const [isOn4, setIsOn4] = useState(false);
    const [isOn5, setIsOn5] = useState(false);
    const [isOn6, setIsOn6] = useState(false);
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

            {/* Line 4 */}
            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX duration={'300ms'} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn2}
                               onChange={(v) => setIsOn2(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("circle-dot")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("circle-dot")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} isOn={isOn2} onChange={(v) => setIsOn2(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("circle-dot")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("circle-dot")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} disabled={true} isOn={isOn2} onChange={(v) => setIsOn2(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("circle-dot")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("circle-dot")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} loading={true} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn2}
                               onChange={(v) => setIsOn2(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("circle-dot")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("circle-dot")} />}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX duration={'300ms'} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn2}
                               onChange={(v) => setIsOn2(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("circle")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("circle")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} isOn={isOn2} onChange={(v) => setIsOn2(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("circle")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("circle")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} disabled={true} isOn={isOn2} onChange={(v) => setIsOn2(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("circle")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("circle")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} loading={true} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn2}
                               onChange={(v) => setIsOn2(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("circle")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("circle")} />}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX duration={'300ms'} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn2}
                               onChange={(v) => setIsOn2(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("heart")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("heart")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} isOn={isOn2} onChange={(v) => setIsOn2(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("heart")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("heart")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} disabled={true} isOn={isOn2} onChange={(v) => setIsOn2(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("heart")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("heart")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} loading={true} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn2}
                               onChange={(v) => setIsOn2(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("heart")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("heart")} />}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX duration={'300ms'} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn3}
                               onChange={(v) => setIsOn3(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("moon")} />} rightBackgroundIcon={<FontAwesomeIcon icon={solid("sun")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} isOn={isOn3} onChange={(v) => setIsOn3(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("moon")} />} rightBackgroundIcon={<FontAwesomeIcon icon={solid("sun")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} disabled={true} isOn={isOn3} onChange={(v) => setIsOn3(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("moon")} />} rightBackgroundIcon={<FontAwesomeIcon icon={solid("sun")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} loading={true} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn3}
                               onChange={(v) => setIsOn3(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("moon")} />} rightBackgroundIcon={<FontAwesomeIcon icon={solid("sun")} />}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX duration={'300ms'} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn3}
                               onChange={(v) => setIsOn3(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("circle-check")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("circle-check")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} isOn={isOn3} onChange={(v) => setIsOn3(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("circle-check")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("circle-check")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} disabled={true} isOn={isOn3} onChange={(v) => setIsOn3(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("circle-check")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("circle-check")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} loading={true} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn3}
                               onChange={(v) => setIsOn3(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("circle-check")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("circle-check")} />}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX duration={'300ms'} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn3}
                               onChange={(v) => setIsOn3(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("flag")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("flag")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} isOn={isOn3} onChange={(v) => setIsOn3(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("flag")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("flag")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} disabled={true} isOn={isOn3} onChange={(v) => setIsOn3(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("flag")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("flag")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} loading={true} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn3}
                               onChange={(v) => setIsOn3(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("flag")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("flag")} />}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX duration={'300ms'} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn4}
                               onChange={(v) => setIsOn4(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("thumbs-up")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("thumbs-up")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} isOn={isOn4} onChange={(v) => setIsOn4(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("thumbs-up")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("thumbs-up")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} disabled={true} isOn={isOn4} onChange={(v) => setIsOn4(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("thumbs-up")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("thumbs-up")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} loading={true} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn4}
                               onChange={(v) => setIsOn4(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("thumbs-up")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("thumbs-up")} />}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX duration={'300ms'} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn4}
                               onChange={(v) => setIsOn4(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("circle-half-stroke")} />} rightBackgroundIcon={<FontAwesomeIcon icon={solid("circle-half-stroke")} rotation={180} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} isOn={isOn4} onChange={(v) => setIsOn4(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("circle-half-stroke")} />} rightBackgroundIcon={<FontAwesomeIcon icon={solid("circle-half-stroke")} rotation={180} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} disabled={true} isOn={isOn4} onChange={(v) => setIsOn4(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("circle-half-stroke")} />} rightBackgroundIcon={<FontAwesomeIcon icon={solid("circle-half-stroke")} rotation={180} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} loading={true} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn4}
                               onChange={(v) => setIsOn4(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("circle-half-stroke")} />} rightBackgroundIcon={<FontAwesomeIcon icon={solid("circle-half-stroke")} rotation={180} />}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX duration={'300ms'} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn4}
                               onChange={(v) => setIsOn4(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("bell")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("bell")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} isOn={isOn4} onChange={(v) => setIsOn4(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("bell")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("bell")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} disabled={true} isOn={isOn4} onChange={(v) => setIsOn4(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("bell")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("bell")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} loading={true} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn4}
                               onChange={(v) => setIsOn4(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("bell")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("bell")} />}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX duration={'300ms'} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn5}
                               onChange={(v) => setIsOn5(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("star")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("star")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} isOn={isOn5} onChange={(v) => setIsOn5(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("star")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("star")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} disabled={true} isOn={isOn5} onChange={(v) => setIsOn5(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("star")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("star")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} loading={true} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn5}
                               onChange={(v) => setIsOn5(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("star")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("star")} />}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX duration={'300ms'} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn5}
                               onChange={(v) => setIsOn5(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("face-smile")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("face-smile")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} isOn={isOn5} onChange={(v) => setIsOn5(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("face-smile")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("face-smile")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} disabled={true} isOn={isOn5} onChange={(v) => setIsOn5(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("face-smile")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("face-smile")} />}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} loading={true} onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn5}
                               onChange={(v) => setIsOn5(v)} leftBackgroundIcon={<FontAwesomeIcon icon={solid("face-smile")} />} rightBackgroundIcon={<FontAwesomeIcon icon={regular("face-smile")} />}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX duration={'300ms'} onColor={'pink'} offColor={'orange'}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn5}
                               onChange={(v) => setIsOn5(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} onColor={'pink'} offColor={'orange'} isOn={isOn5}
                               onChange={(v) => setIsOn5(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} onColor={'pink'} offColor={'orange'} disabled={true} isOn={isOn5}
                               onChange={(v) => setIsOn5(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} onColor={'pink'} offColor={'orange'} loading={true}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn5}
                               onChange={(v) => setIsOn5(v)}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX duration={'300ms'} onColor={'green'} offColor={'red'}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn6}
                               onChange={(v) => setIsOn6(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} onColor={'green'} offColor={'red'} isOn={isOn6}
                               onChange={(v) => setIsOn6(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} onColor={'green'} offColor={'red'} disabled={true} isOn={isOn6}
                               onChange={(v) => setIsOn6(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX duration={'300ms'} onColor={'green'} offColor={'red'} loading={true}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn6}
                               onChange={(v) => setIsOn6(v)}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX size={'large'} duration={'300ms'} onColor={'green'} offColor={'red'}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn6}
                               onChange={(v) => setIsOn6(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'large'} duration={'300ms'} onColor={'green'} offColor={'red'} isOn={isOn6}
                               onChange={(v) => setIsOn6(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'large'} duration={'300ms'} onColor={'green'} offColor={'red'} disabled={true}
                               isOn={isOn6} onChange={(v) => setIsOn6(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'large'} duration={'300ms'} onColor={'green'} offColor={'red'} loading={true}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn6}
                               onChange={(v) => setIsOn6(v)}/>
            </div>

            <div tw={'col-span-4 flex justify-between items-center mx-4 md:mx-16 md:px-16 h-12 overflow-x-auto w-full duration-300'}>
                <SwitchButtonX size={'huge'} duration={'300ms'} onColor={'green'} offColor={'red'}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn6}
                               onChange={(v) => setIsOn6(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'huge'} duration={'300ms'} onColor={'green'} offColor={'red'} isOn={isOn6}
                               onChange={(v) => setIsOn6(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'huge'} duration={'300ms'} onColor={'green'} offColor={'red'} disabled={true}
                               isOn={isOn6} onChange={(v) => setIsOn6(v)}/>
                <Gap tw={'grow-0 invisible w-10 hidden'}/>
                <SwitchButtonX size={'huge'} duration={'300ms'} onColor={'green'} offColor={'red'} loading={true}
                               onIcon={<FontAwesomeIcon icon={solid("check")}/>}
                               offIcon={<FontAwesomeIcon icon={solid("xmark")}/>} isOn={isOn6}
                               onChange={(v) => setIsOn6(v)}/>
            </div>

        </ContentWrapper>
    );
}