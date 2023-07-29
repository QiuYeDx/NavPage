import React, {useEffect, useState} from 'react';
import {PictureWrapper} from "@/components/PictureDisplay/Styled.twin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import tw from 'twin.macro';

/**
 * ## `Picture组件`: 含加载动画的Img组件
 * @param {Object} props - 组件的props对象
 * @param {String} props.url - 图片资源路径
 * @param {String} props.w - 宽 width (css)
 * @param {String} props.h - 高 height (css)
 * @param {Boolean} props.loadingFlag - 是否显示加载占位符
 * @param {JSX.Element} props.placeholder - 占位符 e.g. `<FontAwesomeIcon icon={solid("spinner")} spin />`
 * @param {TwStyle} props._tw - 给Wrapper添加额外样式
 * @param {TwStyle} props.ph_tw - 给占位符添加额外样式
 * @param {TwStyle} props.img_tw - 给img标签添加额外样式
 * @returns {JSX.Element}
 * @constructor
 *
 */
const Picture = ({
                     url = 'images/qrcode-solid-md.png',
                     w = '150px',
                     h = '150px',
                     loadingFlag = false,
                     placeholder = <FontAwesomeIcon icon={solid("spinner")} spin />,
                     _tw = tw``,
                     ph_tw = tw``,
                     img_tw = tw``,
                 }) => {
    const [picLoading, setPicLoading] = useState(true);
    const image = new Image();

    useEffect(() => {
        setPicLoading(true);
        image.src = url;
        image.onload = () => {
            setPicLoading(false);
        };
        image.onerror = () => {
            // 图片加载失败时也设置 loading 为 false
            setPicLoading(false);
        };
    }, [url]);

    return (
        <PictureWrapper height={h} width={w} _tw={_tw} img_tw={img_tw}>
            {
                picLoading || loadingFlag ?
                    <div>
                        {placeholder}
                    </div>
                    :
                    <img src={url} alt={''}/>
            }
        </PictureWrapper>
    );
};

export default Picture;
