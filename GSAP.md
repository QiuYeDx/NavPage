# GSAP实现三种常用的动画序列

## 效果一

### 效果描述

延迟 3s 执行正向动画, items根据`stagger`间隔***顺序***依次执行完毕后, 再次根据`stagger`间隔***顺序***依次执行反向动画.

### 代码示例

```js
const gsap_ref2 = useRef(null);
useLayoutEffect(() => {

    // 创建一个新的 GSAP timeline，重复无限次
    gsap_ref2.current = gsap.timeline({repeat: -1});

    // 设置初始属性
    gsap_ref2.current.set('.gsap_letter', {
        y: 0,
        opacity: 1,
    });

    // 添加正向动画
    gsap_ref2.current.to(`.gsap_letter`, {
        y: -15,
        opacity: 0.6,
        duration: 0.5,
        ease: 'ease.out(4)',
        stagger: 0.15,
        delay: 3,
    });

    // 添加反向动画
    gsap_ref2.current.to(`.gsap_letter`, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'ease.out(4)',
        stagger: 0.15,
    });
}, []);
```

效果等同于

```js
const gsap_ref2 = useRef(null);
useLayoutEffect(() => {

    // 创建一个新的 GSAP timeline，重复无限次
    gsap_ref2.current = gsap.timeline({repeat: -1});

    // 设置初始属性
    gsap_ref2.current.set('.gsap_letter', {
        y: -15,
        opacity: 0.6,
    });

    // 添加反向动画
    gsap_ref2.current.to(`.gsap_letter`, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'ease.out(4)',
        stagger: 0.15,
    });

    // 添加正向动画
    gsap_ref2.current.to(`.gsap_letter`, {
        y: -15,
        opacity: 0.6,
        duration: 0.5,
        ease: 'ease.out(4)',
        stagger: 0.15,
        delay: 3,
    });

}, []);
```

## 效果二

### 效果描述

延迟 3s 执行正向动画, items根据`stagger`间隔***顺序***依次执行完毕后, 再次根据`stagger`间隔***逆序***依次执行反向动画.

### 代码示例

```js
const gsap_ref2 = useRef(null);
useLayoutEffect(() => {

    // 创建一个新的 GSAP timeline，重复无限次
    gsap_ref2.current = gsap.timeline({repeat: -1});

    // 设置初始属性
    gsap_ref2.current.set('.gsap_letter', {
        y: 0,
        opacity: 1,
    });

    // 添加正向动画
    gsap_ref2.current.to(`.gsap_letter`, {
        y: -15,
        opacity: 0.6,
        duration: 0.5,
        ease: 'ease.out(4)',
        stagger: 0.15,
        delay: 3,
    });

    // 添加反向动画
    gsap_ref2.current.to(`.gsap_letter`, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'ease.out(4)',
        stagger: -0.15,
    });
}, []);
```

## 效果三

### 效果描述

延迟 3s 执行正向动画, 每个 item 自身有一个`timeline`，先正向后反向动画。（这里多加了个`delay: -0.2`是为了让反向动画提前播放以使连贯性更佳）
然后每个 item 都会在上一个 item 的动画末尾时刻前 0.72s 开始执行自身的动画。

### 代码示例

```js
const gsap_ref2 = useRef(null);
useLayoutEffect(() => {
    // 创建一个新的 GSAP timeline，重复无限次
    gsap_ref2.current = gsap.timeline({repeat: -1, repeatDelay: 3});

    const elements = document.querySelectorAll('.gsap_letter');

    elements.forEach((element) => {
        const tl = gsap.timeline({repeat: 0}) // 创建每个元素的timeline，不重复，但是整体timeline会无限重复
            .to(element, {
                y: -15,
                opacity: 0.5,
                duration: 0.5,
                ease: 'back.out(4)',
            })
            .to(element, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'back.out(4)',
                delay: -0.2,
            });

        // 将每个元素的timeline添加到主timeline中
        gsap_ref2.current.add(tl, '-=0.72'); // 用负偏移时间来使动画更紧凑地连接
        // 减慢整个动画的播放速率
        gsap_ref2.current.timeScale(0.8);
    });
}, []);
```

## 相关链接

[>> GSAP实现三种常用的动画序列 <<](https://qiuyedx.com/?p=2393)