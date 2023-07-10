import React, { useState, useEffect, useRef } from 'react';
import tw from 'twin.macro';
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
 *             button={<PageButton key={'morePage'}><FontAwesomeIcon icon={solid("list-ul")}/></PageButton>}
 *             menu={<HoverList closeClassName={'closeClassName'}
 *                  list={Array.from({length: totalPages}, (_, index) => '第 ' + (index + 1) + ' 页')}
 *                      onClick={(e) => {
 *                          if (e.target.id.includes('pageLi_')) {
 *                              setCurrentPage(parseInt(e.target.id.slice(7), 10));
 *                              setTimeout(() => {
 *                                  scroll_ref.current.scrollIntoView({behavior: 'smooth'});
 *                              }, 100);
 *                          }
 *                   }}
 *             />}
 * />
 * ```
 * @param button
 * @param menu
 * @param closeClassName - 当点击button或menu中含该类名的标签时会关闭menu
 * @returns {JSX.Element}
 * @constructor
 */
const PopupMenu = ({ button, menu, closeClassName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            // console.log(typeof event.target.className === 'string', event.target.className === 'string' && event.target.className.split(' '));
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }else if(menuRef.current && menuRef.current.contains(event.target) && typeof event.target.className === 'string' && event.target.className.split(' ').includes(closeClassName || 'closeClassName')){
                window.setTimeout(() => setIsOpen(false), 300);
            }
        };

        document.addEventListener('click', handleOutsideClick, true);

        return () => {
            document.removeEventListener('click', handleOutsideClick, true);
        };
    }, []);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div ref={menuRef} tw={'relative'}>
            <div onClick={handleButtonClick}>{button}</div>
            {isOpen && (
                <div tw={'absolute top-2 -left-1'}>
                    {menu}
                </div>
            )}
        </div>
    );
};

export default PopupMenu;
