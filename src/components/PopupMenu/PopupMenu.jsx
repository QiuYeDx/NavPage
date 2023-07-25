import React, {useState, useEffect, useRef} from 'react';
import tw, {styled} from 'twin.macro';
import 'twin.macro';

/**
 * **PopupMenu小型浮动菜单组件（Headless组件）**
 *
 * - 可搭配 **HoverList** 组件使用
 * - button和menu组件通过参数传递
 * - 点击button显示menu，点击其他区域关闭menu。
 * - 当点击button或menu中含**closeClassName**指定类名的标签时会关闭menu
 *
 * - 示例：
 *
 * ```
 * <PopupMenu  closeClassName={'closeClassName'}
 *             animate={'b.3'}
 *             button={<PageButton key={'morePage'}><FontAwesomeIcon icon={solid("list-ul")}/></PageButton>}
 *             menu={<HoverList
 *                         closeClassName={'closeClassName'}
 *                         _b={'18px'}
 *                         _l={'-35px'}
 *                         validText={`第 ${currentPage} 页`}
 *                         list={Array.from({length: totalPages}, (_, index) => '第 ' + (index + 1) + ' 页')}
 *                         onClick={(e) => {
 *                             if (e.target.id.includes('pageLi_')) {
 *                                 setCurrentPage(parseInt(e.target.id.slice(7), 10));
 *                                 setTimeout(() => {
 *                                     scroll_ref.current.scrollIntoView({behavior: 'smooth'});
 *                                 }, 100);
 *                             }
 *                         }}
 *             />}
 * />
 * ```
 * @param button
 * @param menu
 * @param closeClassName - 当点击button或menu中含该类名的标签时会关闭menu
 * @param animate - 选择渐入渐出动画 可选参数't.3', 'tr.3', 'br.3'等
 * @returns {JSX.Element}
 * @constructor
 */
const PopupMenu = ({button, menu, closeClassName, animate}) => {
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

    const handleAnimationed = () => {
        if (isHiding) {
            setIsOpen(false);
        }
    }

    return (
        <div ref={menuRef} tw={'relative'}>
            <div onClick={handleButtonClick}>{button}</div>
            <AnimateWrapper onAnimationEnd={handleAnimationed}
                            isHidden={!isOpen}
                            animate={animate && isHiding ? animates[animate.split('.').join('-out.')] : animates[animate.split('.').join('-in.')]}>
                {menu}
            </AnimateWrapper>
        </div>
    );
};

const AnimateWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  ${({animate}) => animate};
  ${({isHidden}) => isHidden ? 'display: none' : ''};
  ${tw`z-50`};
`

export default PopupMenu;
