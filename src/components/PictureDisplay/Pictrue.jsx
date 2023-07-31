import React, {useEffect, useState} from 'react';
import {PictureWrapper} from "@/components/PictureDisplay/Styled.twin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import tw from 'twin.macro';

/**
 * ## `Picture组件`: 含加载动画的Img组件
 * @param {Object} props - 组件的props对象
 * @param {String | JSX.Element} props.url - 图片资源路径 | JSX元素
 * @param {String} props.w - 宽 width (css)
 * @param {String} props.h - 高 height (css)
 * @param {Boolean} props.loadingFlag - 是否强制显示加载占位符
 * @param {Boolean} props.errorFlag - 是否强制显示失败占位符
 * @param {JSX.Element} props.placeholder - 加载占位符 e.g. `<FontAwesomeIcon icon={solid("spinner")} spin />`
 * @param {JSX.Element} props.alt - 失败占位符 e.g. `<FontAwesomeIcon icon={solid("spinner")} spin />`
 * @param {TwStyle} props._tw - 给Wrapper添加额外样式
 * @param {TwStyle} props.ph_tw - 给占位符添加额外样式
 * @param {TwStyle} props.img_tw - 给img标签添加额外样式
 * @returns {JSX.Element}
 * @constructor
 *
 */
const Picture = ({
                     url = 'images/image-blue-300.svg',
                     w = '150px',
                     h = '150px',
                     loadingFlag = false,
                     errorFlag = false,
                     placeholder = <FontAwesomeIcon icon={solid("spinner")} spin />,
                     alt = <FontAwesomeIcon icon={solid("circle-exclamation")} shake />,
                     _tw = tw``,
                     ph_tw = tw``,
                     img_tw = tw``,
                 }) => {
    const [picLoading, setPicLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const image = new Image();

    // const checkImage = async (url) => {
    //     try {
    //         const response = await fetch(url);
    //         const contentType = response.headers.get('content-type');
    //         if (response.ok && contentType && contentType.startsWith('image/')) {
    //             setPicLoading(false);
    //             setIsError(false);
    //         } else {
    //             setPicLoading(false);
    //             setIsError(true);
    //         }
    //     } catch (error) {
    //         setPicLoading(false);
    //         setIsError(true);
    //         console.error(error);
    //     }
    // };

    useEffect(() => {
        if(typeof url === 'string'){
            setPicLoading(true);
            // checkImage(url);

            image.src = url;
            image.onload = () => {
                setPicLoading(false);
                setIsError(false);
            };
            image.onerror = () => {
                console.log('failed to load image');
                // 图片加载失败时也设置 loading 为 false
                setPicLoading(false);
                setIsError(true);
            };
        }else{
            setPicLoading(false);
            setIsError(false);
        }
    }, [url]);

    return (
        <PictureWrapper height={h} width={w} _tw={_tw} img_tw={img_tw} ph_tw={ph_tw}>
            {
                isError || errorFlag ?
                    <div>
                        {alt}
                    </div>
                    :
                    picLoading || loadingFlag ?
                        <div>
                            {placeholder}
                        </div>
                        :
                        (typeof url === 'string' ? <img src={url} alt={''}/> : <div>{url}</div>)
            }
        </PictureWrapper>
    );
};

export default Picture;
