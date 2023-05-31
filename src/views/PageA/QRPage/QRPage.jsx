import React, {useEffect, useRef, useState} from 'react';
import {
    ButtonWrapper,
    HeaderWrapper,
    ContentWrapper,
    Wrapper,
    LineWrapper
} from "@/views/PageA/QRPage/Styled.twin";
import {notify_success} from "@/hooks/toasts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {regular, solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import tw from "twin.macro";
import {useNavigate} from "react-router-dom";
import {H2, InLineTitle} from "@/styles/TextStyles";
import {TextInputLine} from "@/components/TextInputLine/Styled.twin";
import {Gap} from "@/components/Gap/Styled.twin";
import {BackButton, MButton} from "@/components/Button/Styled.twin";
import {PictureDisplay} from "@/components/PictureDisplay/Styled.twin";
import axios from 'axios';

export default function QRPage() {
    const navigate = useNavigate();
    const a_ref = useRef(null);
    const button_ref = useRef(null);
    const [text, setText] = useState('');
    const [data, setData] = useState('images/qrcode-solid-md.png');
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const handleChange = (event) => {
        setText(event.target.value);
        setInvalid(false);
    };
    const handleDownload = (event) => {
        if(!data)
            return;
        let a = a_ref.current;
        a.href = data;
        a.download = "qrcode.png";
        a.click();
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            button_ref.current.click();
            button_ref.current.focus();
        }
    }

    const handleSubmit = (event) => {
        if(!text){
            setInvalid(true);
            return;
        }

        setLoading(true);

        const url = 'https://www.mxnzp.com/api/qrcode/create/single';
        const params = {
            content: text,
            size: 500,
            type: 1,
            app_id: 'jyninllnnkfkllpv',
            app_secret: 'bWF3clZ2RENRMmx3aG95dVVaU1NKQT09',
        };

        axios.get(url, {params})
            .then(response => {
                const qrCodeBase64 = response.data.data.qrCodeBase64;
                setData(qrCodeBase64);
            })
            .catch(error => {
                console.error('Error generating QR code:', error);
            })
            .finally(() => {
                setLoading(false);
                setFinished(true);
            });
    };
    useEffect(() => {
    });
    return (
        <div tw={'col-span-4'}>
            <Wrapper>
                <HeaderWrapper>
                    <ButtonWrapper>
                        <BackButton onClick={() => {
                            navigate('/tools');
                            window.scroll(0, 0);
                        }}>
                            <FontAwesomeIcon icon={solid("arrow-left")} tw={'md:pr-4 align-middle relative -top-px'}/>
                        </BackButton>
                    </ButtonWrapper>
                    <H2>二维码生成器</H2>
                </HeaderWrapper>
                <ContentWrapper>
                    <LineWrapper>
                        <InLineTitle tw={'after:content-[\'*\'] after:ml-0.5 after:text-red-500 mb-2'}>输入内容</InLineTitle>
                    </LineWrapper>

                    <LineWrapper>
                        <TextInputLine
                            placeholder={'输入纯文本、URL etc.'} maxLength={2000} value={text}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            invalid={invalid}
                        />
                    </LineWrapper>

                    <LineWrapper tw={'mt-2'}>
                        <MButton disabled={loading} h={'36px'} w={'140px'} tw={'rounded-full'} onClick={handleSubmit} ref={button_ref}>
                            {
                                loading ?
                                    <>获取中<FontAwesomeIcon icon={solid("spinner")} spin tw={'ml-1'}/></>
                                    :
                                    <>获取QR码<FontAwesomeIcon icon={regular("hand-spock")} shake tw={'ml-1'}/></>
                            }
                        </MButton>
                    </LineWrapper>
                    <Gap/>
                    <LineWrapper>
                        <InLineTitle tw={'mb-2'}>获取结果</InLineTitle>
                    </LineWrapper>
                    <LineWrapper>
                        <PictureDisplay src={data}/>
                    </LineWrapper>
                    <LineWrapper tw={'mt-2'}>
                        <MButton disabled={!finished} h={'36px'} w={'140px'} tw={'rounded-full'} onClick={handleDownload}>
                            {
                                !finished ?
                                    <>暂无QR码<FontAwesomeIcon icon={solid("xmark")} shake tw={'ml-1'}/></>
                                    :
                                    <>保存QR码<FontAwesomeIcon icon={solid("download")} beat tw={'ml-1'}/></>
                            }
                        </MButton>
                        <a tw={'hidden'} ref={a_ref}/>
                    </LineWrapper>
                </ContentWrapper>
            </Wrapper>
        </div>
    );
}