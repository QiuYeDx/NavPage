import React, {useEffect, useRef, useState} from 'react';
import {useInView} from 'react-intersection-observer';
import gsap from 'gsap';
import {hasSelectionSupport} from "@testing-library/user-event/dist/utils";


/**
 * ## `NumberAnimation组件`: 按指定步长从`X`到`Y`的数字动画
 * @param {Object} props - 组件的props对象
 * @param {Number} props.fromValue - 初始值
 * @param {Number} props.toValue - 目标值
 * @param {Number} props.duration - 持续时间(s)
 * @param {Number} props.step - 步长
 * @param {String} props.ease - 缓动函数名, 参考[GSAP文档](https://greensock.com/docs/v3/Eases) e.g. `'power2.out'`, `'ease'`
 * @param {Boolean} props.freshFlag - 强制刷新触发标志位(可选)
 * @param {Boolean} props.isViewCtrl - 是否进入视野再播放动画 defaults: true
 * @returns {JSX.Element}
 * @constructor
 *
 * **`使用示例`**
 *
 * <NumberAnimation freshFlag={flag} fromValue={0} toValue={visitData[0].sum_count} duration={1} step={1} />
 *
 * **`每次反转freshFlag的布尔值即可强制刷新组件，执行从fromValue到toValue的动画。`**
 *
 */
const NumberAnimation = ({
                             fromValue = 0,
                             toValue = 0,
                             duration = 2,
                             step = 1,
                             ease = 'power2.out',
                             freshFlag = false,
                             isViewCtrl = true
                         }) => {
    const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
    const [ref, inView] = useInView();
    const numberRef = useRef();
    const gsapRef = useRef(null);

    useEffect(() => {
        const element = numberRef.current;
        gsapRef.current = gsap.to(element, {
            innerHTML: toValue,
            duration,
            snap: {innerHTML: step},
            ease,
        });
        if(isViewCtrl && !hasEnteredViewport)
            gsapRef.current.resume();
    }, [fromValue, toValue, duration, step]);

    useEffect(() => {
        gsapRef.current.restart();
    }, [freshFlag]);

    useEffect(() => {
        if (inView && !hasEnteredViewport) {
            setHasEnteredViewport(true);
        }
    }, [inView, hasEnteredViewport]);

    useEffect(() => {
        if(isViewCtrl && hasEnteredViewport)
            gsapRef.current.restart();
    }, [hasEnteredViewport]);

    return (
        <div ref={ref}>
            <span ref={numberRef}>{fromValue}</span>
        </div>
    );
};

export default NumberAnimation;
