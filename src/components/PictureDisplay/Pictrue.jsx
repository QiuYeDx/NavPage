import React, {useEffect, useState} from 'react';
import {PictureWrapper} from "@/components/PictureDisplay/Styled.twin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import tw from 'twin.macro';
import SimpleFadeTransition from "@/styles/transition/SimpleFadeTransition";
import {ASSETS_URL_Image} from "@/utils/assets";

/**
 * ## `Picture组件`: 含加载动画的Img组件
 *
 * @param {Object} props - 组件的props对象
 * @param {String | JSX.Element} [props.url='https://qiuyedx-oss.oss-cn-beijing.aliyuncs.com/nav/image-blue-300.svg'] - 图片资源路径或JSX元素
 * @param {String} [props.w='150px'] - 图片宽度（CSS单位）
 * @param {String} [props.h='150px'] - 图片高度（CSS单位）
 * @param {Boolean} [props.loadingFlag=false] - 是否强制显示加载占位符
 * @param {Boolean} [props.errorFlag=false] - 是否强制显示失败占位符
 * @param {JSX.Element} [props.placeholder] - 加载占位符，默认为旋转的spinner图标
 * @param {JSX.Element} [props.alt] - 失败占位符，默认为摇晃的警告图标
 * @param {TwStyle} [props._tw] - 给Wrapper添加额外的Tailwind CSS样式
 * @param {TwStyle} [props.ph_tw] - 给占位符添加额外的Tailwind CSS样式
 * @param {TwStyle} [props.img_tw] - 给img标签添加额外的Tailwind CSS样式
 * @param {'opacity' | 'down' | 'up' | 'left' | 'right' | 'slideFromBottom' | 'scale'} [props.fadeStyle='scale'] - 过渡效果类型('opacity', 'down', 'up', 'left', 'right', 'slideFromBottom', 'scale')
 * @param {String} [props.duration='1.2s'] - 过渡动画的持续时间
 * @param {String} [props.offset='80px'] - 过渡动画的偏移量
 * @param {String} [props.className='fadePicture'] - 用于CSSTransition的类名
 * @param {Boolean} [props.exit=true] - 是否应用退出动画
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Picture = ({
                     url = ASSETS_URL_Image,
                     w = '150px',
                     h = '150px',
                     loadingFlag = false,
                     errorFlag = false,
                     placeholder = <FontAwesomeIcon icon={solid("spinner")} spin />,
                     alt = <FontAwesomeIcon icon={solid("circle-exclamation")} shake />,
                     _tw = tw``,
                     ph_tw = tw``,
                     img_tw = tw``,
                     fadeStyle = 'opacity',
                     duration = '0s',
                     offset = '15px',
                     className = 'fadePicture',
                     exit = true
                 }) => {
    const [picLoading, setPicLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const image = new Image();

    useEffect(() => {
        if(typeof url === 'string'){
            setPicLoading(true);
            image.src = url;
            image.onload = () => {
                setPicLoading(false);
                setIsError(false);
            };
            image.onerror = () => {
                console.log('failed to load image');
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
                    <div className={'etc'}>
                        {alt}
                    </div>
                    :
                    picLoading || loadingFlag ?
                        <div className={'etc'} tw={'flex justify-center items-center'}>
                            {placeholder}
                        </div>
                        :
                        ''
            }
            <SimpleFadeTransition
                in={!isError && !errorFlag && !picLoading && !loadingFlag}
                fadeStyle={fadeStyle}
                duration={duration}
                offset={offset}
                className={className}
                exit={exit}
            >
                {(typeof url === 'string' ? <img src={url} alt={''}/> : <div>{url}</div>)}
            </SimpleFadeTransition>
        </PictureWrapper>
    );
};

export default Picture;
