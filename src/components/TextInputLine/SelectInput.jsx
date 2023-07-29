import React, {useEffect, useRef, useState} from 'react';
import 'twin.macro';
import tw from 'twin.macro';
import {
    InputDesc, InputIcon, InputIcon2,
    TextInputLine, TextInputLineWrapper

} from './Styled.twin'
import gsap from "gsap";
import HoverList from "@/components/HoverList/HoverList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

/**
 *
 * @param props - 组件的属性
 * @param {React.ReactNode} props.icon - 输入框前面显示的图标元素，可以使用FontAwesome等图标库提供的组件
 * @param {string} props.placeholder - 输入框的占位符文本
 * @param {string} props.desc - 输入框的描述文本
 * @param {string} props.id - 输入框的id属性，用于关联描述文本和输入框
 * @param {Function} props.onChange - 输入框值变化时的回调函数
 * @param {Function} props.onKeyPress - 按下键盘按键时的回调函数
 * @param {boolean} props.invalid - 输入框是否为无效状态（例如，格式错误）
 * @param {string} props.text - 输入框的当前文本值 (状态托管在父组件)
 * @param {Function} props.setText - 更新输入框文本值的回调函数
 * @param {Function} props.iconOnClick -
 * @param {number} props.maxLength - 设置输入框最大输入长度
 * @param {string} props.data_tooltip_id - 用于数据提示的元素id属性
 * @param {string} props.data_tooltip_content - 数据提示的内容
 * @param {string} props.data_tooltip_variant - 数据提示的变体样式（例如，info、warning等）
 * @param {string} props.closeClassName - 点击触发悬浮菜单关闭的组件的类名
 * @param {string} props.animate - 选择渐入渐出动画 可选参数't.3', 'tr.3', 'br.3'等
 * @param {string} props.h - 悬浮菜单的最大高度
 * @param {string} props._t - 悬浮菜单的top偏移量
 * @param {string} props._l - 悬浮菜单的left偏移量
 * @param {string} props._r - 悬浮菜单的right偏移量
 * @returns {JSX.Element} - 返回渲染的TextInput组件
 *
 *
 */
export default function SelectInput({
                                        data_tooltip_id,
                                        text,
                                        setText,
                                        invalid,
                                        data_tooltip_content,
                                        data_tooltip_variant,
                                        desc,
                                        icon,
                                        id,
                                        onChange,
                                        onKeyPress,
                                        placeholder,
                                        iconOnClick,
                                        maxLength,
                                        selectList,
                                        closeClassName,
                                        animate,
                                        _t,
                                        _l,
                                        _r,
                                        h,
                                        ...restProps
                                    }) {
    const desc_ref = useRef();
    const tween_ref = useRef();
    const text_ref = useRef(text);

    const [isOpen, setIsOpen] = useState(false);
    const [isHiding, setIsHiding] = useState(false);
    const menuRef = useRef(null);
    const animates = {
        't-in.3': tw`animate-popup_t.3`,
        'tr-in.3': tw`animate-popup_tr.3`,
        'b-in.3': tw`animate-popup_b.3`,
        't-out.3': tw`animate-popout_t.3`,
        'tr-out.3': tw`animate-popout_tr.3`,
        'b-out.3': tw`animate-popout_b.3`,
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsHiding(true);
            } else if (menuRef.current && menuRef.current.contains(event.target) && typeof event.target.className === 'string' && event.target.className.split(' ').includes(closeClassName || 'closeClassName')) {
                setIsHiding(true);
            }
        };

        document.addEventListener('click', handleOutsideClick, true);

        return () => {
            document.removeEventListener('click', handleOutsideClick, true);
        };
    }, []);

    const handleButtonClick = () => {
        setIsOpen(true);
        setIsHiding(isOpen);
    };

    const handleFocus = () => {
        if (tween_ref.current) {
            tween_ref.current.kill(); // 先停止当前的Tween
            tween_ref.current = gsap.to(desc_ref.current, {
                y: -21,
                scale: 0.88,
                duration: 0.3,
                backgroundColor: 'white',
                ease: 'power2.out',
                yoyo: true,
            });
        }
    }

    const handleBlur = () => {
        setTimeout(() => {
            if (text_ref.current === '' && tween_ref.current) {
                tween_ref.current.kill(); // 先停止当前的Tween
                tween_ref.current = gsap.to(desc_ref.current, {
                    y: 0, scale: 1, duration: 0.3, backgroundColor: 'rgba(255 255 255 0)', ease: 'power2.out',
                });
            }
        }, 100);
    }

    const handleAnimationed = () => {
        if (isHiding) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        if (text === '') {
            text_ref.current = '';
            tween_ref.current && tween_ref.current.kill();
            gsap.to(desc_ref.current, {
                y: 0,
                scale: 1,
                duration: 0.3,
                backgroundColor: 'white',
                ease: 'power2.out',
            });
        } else {
            tween_ref.current && tween_ref.current.kill();
            tween_ref.current = gsap.to(desc_ref.current, {
                y: -21,
                scale: 0.88,
                duration: 0.3,
                backgroundColor: 'white',
                ease: 'power2.out',
            });
            tween_ref.current.restart();
        }
    }, [text]);

    return (
        <TextInputLineWrapper
            ref={menuRef}
            data-tooltip-id={data_tooltip_id || ''}
            data-tooltip-content={data_tooltip_content || ''}
            data-tooltip-variant={data_tooltip_variant || ''}
            onBlur={handleBlur}
            onFocus={handleFocus}
        >
            <TextInputLine
                onClick={handleButtonClick}
                placeholder={placeholder || ''}
                className={'peer'}
                id={id || ''}
                maxLength={maxLength || 2000}
                value={text || ''}
                onChange={onChange || ''}
                onKeyPress={onKeyPress || ''}
                invalid={invalid || ''}
                readOnly
                {...restProps}
            />
            <HoverList
                isHidden={!isOpen}
                animate={animate && (isHiding ? animates[animate.split('.').join('-out.')] : animates[animate.split('.').join('-in.')])}
                validText={text}
                h={h || '360px'}
                _t={_t || '36px'}
                _l={_l || 'auto'}
                _r={_r || '10px'}
                closeClassName={closeClassName ? closeClassName + ' closeClassName' : 'closeClassName'}
                list={selectList || ['jump', 'wait', 'click', 'input']}
                onAnimationEnd={handleAnimationed}
                onClick={(e) => {
                    if (e.target.id.includes('pageLi_')) {
                        const chosenIndex = parseInt(e.target.id.slice(7), 10) - 1;
                        setText(selectList[chosenIndex]);
                        text_ref.current = selectList[chosenIndex];
                    }
                }}
            />

            <InputDesc for={id || ''} ref={desc_ref}>{desc || ''}</InputDesc>
            <InputIcon2 for={id}
                        tw={''}><FontAwesomeIcon icon={solid("ellipsis")} fade/></InputIcon2>
            <InputIcon for={id} onClick={iconOnClick}
                       tw={''}>{icon || ''}</InputIcon>
        </TextInputLineWrapper>
    );
}