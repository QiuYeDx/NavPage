import React from 'react';
import 'twin.macro'
import {
    InputDesc, InputIcon,
    TextInputLine, TextInputLineWrapper

} from './Styled.twin'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

/**
 * **TextInput**组件用于显示带图标和描述的文本输入框。
 *
 * @param props - 组件的属性
 * @param {React.ReactNode} props.icon - 输入框前面显示的图标元素，可以使用FontAwesome等图标库提供的组件
 * @param {string} props.placeholder - 输入框的占位符文本
 * @param {string} props.desc - 输入框的描述文本
 * @param {string} props.id - 输入框的id属性，用于关联描述文本和输入框
 * @param {Function} props.onChange - 输入框值变化时的回调函数
 * @param {Function} props.onKeyPress - 按下键盘按键时的回调函数
 * @param {boolean} props.invalid - 输入框是否为无效状态（例如，格式错误）
 * @param {string} props.text - 输入框的当前文本值
 * @param {Function} props.setText - 更新输入框文本值的回调函数
 * @param {Function} props.iconOnClick -
 * @param {number} props.maxLength - 设置输入框最大输入长度
 * @param {string} props.data_tooltip_id - 用于数据提示的元素id属性
 * @param {string} props.data_tooltip_content - 数据提示的内容
 * @param {string} props.data_tooltip_variant - 数据提示的变体样式（例如，info、warning等）
 * @returns {JSX.Element} - 返回渲染的TextInput组件
 * 使用示例：
 *   ```
 *   <TextInput
 *      icon={<FontAwesomeIcon icon={solid("delete-left")} tw={'ml-1'}/>}
 *      placeholder={' '}
 *      desc={'输入bilibili视频URL'}
 *      id={'input_bilibili'}
 *      onChange={handleChange}
 *      onKeyPress={handleKeyPress}
 *      invalid={invalid}
 *      text={text}
 *      setText={setText}
 *      iconOnClick={() => {setText && setText('')}}
 *      data_tooltip_id={"url_tooltip"}
 *      data_tooltip_content={"直接粘贴B站分享文本即可"}
 *      data_tooltip_variant={"info"}
 *   />
 *   ```
 *
 *   或
 *
 *   ```
 *   <TextInput
 *       icon={<FontAwesomeIcon icon={solid("copy")} tw={'ml-1'}/>}
 *       placeholder={'待解析'}
 *       desc={'视频标题'}
 *       id={'input_title_main'}
 *       text={data ? data.title : ''}
 *       iconOnClick={() => {
 *           if (data) {
 *               clipboard.copy(data.title);
 *               notify_success('视频标题Copied !', 'title_copy');
 *           } else
 *               notify_error('视频标题Copy失败 !', 'title_copy_error');
 *       }}
 *       data_tooltip_id={"title_tooltip"}
 *       data_tooltip_content={data ? data.title : ''}
 *       data_tooltip_variant={"info"}
 *       readOnly
 *   />
 *   ```
 *
 *
 */
export default function TextInput({data_tooltip_id, text, setText, invalid, data_tooltip_content, data_tooltip_variant, desc, icon, id, onChange, onKeyPress, placeholder, iconOnClick, maxLength, ...restProps}){
    return (
        <TextInputLineWrapper
            data-tooltip-id={data_tooltip_id || ''}
            data-tooltip-content={data_tooltip_content || ''}
            data-tooltip-variant={data_tooltip_variant || ''}
        >
            <TextInputLine
                placeholder={placeholder || ''}
                className={'peer'}
                id={id || ''}
                maxLength={maxLength || 2000} value={text || ''}
                onChange={onChange || ''}
                onKeyPress={onKeyPress || ''}
                invalid={invalid || ''}
                {...restProps}
            />
            <InputDesc for={id || ''}>{desc || ''}</InputDesc>
            <InputIcon for={id} onClick={iconOnClick} tw={'active:text-blue-300 md:hover:text-blue-300 md:active:text-blue-500'}>{icon || ''}</InputIcon>
        </TextInputLineWrapper>
    );
}