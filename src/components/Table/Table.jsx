import React from 'react';
import tw from "twin.macro";
import {Caption, TableWrapper, Tbody, Td, Th, Thead, Tr, Wrapper} from "@/components/Table/Styled.twin";
import {InLineTitle} from "@/styles/TextStyles";
import {Tooltip} from "react-tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import Picture from "@/components/PictureDisplay/Pictrue";

/**
 * ## `Table组件`
 * @param {Object} props - 组件的props对象
 * @param {String} props.title - 表标题
 * @param {Array<Array<String> | Object>} props.data - 表项数据
 * @param {Array<String>} props.headers - 表头项
 * @param {Array<String>} props.keys - 对象中选择哪些属性(按顺序)
 * @param {String} props.h - 表高度 e.g. '360px'
 * @param {String} props.td_max_width - 表项最大宽度 e.g. `'100px'`
 * @param {Boolean} props.isError - 是否显示数据加载失败
 * @returns {JSX.Element}
 * @constructor
 */
const Table = ({title, data, headers, keys, h, td_max_width, isError = false}) => {
    const renderHeaderRow = () => {
        return (
            <Tr>
                {Array.from(headers, (_, index) => (
                    <Th key={index}>{headers[index]}</Th>
                ))}
            </Tr>
        );
    };

    const renderRows = () => {
        if(!data)
            return <Tr>
                <Td colSpan={headers.length} max_width={td_max_width || ''} tw={'leading-10'}>
                    {/*暂无数据*/}
                </Td>
            </Tr>;
        if (Object.prototype.toString.call(data[0]) === '[object Array]') {
            return Array.from(data, (_, rowIndex) => (
                <Tr key={rowIndex}>
                    {Array.from(data[rowIndex], (_, columnIndex) => (
                        <Td
                            max_width={td_max_width || ''}
                            key={columnIndex}
                        >
                            {data[rowIndex][columnIndex]}
                        </Td>
                    ))}
                </Tr>
            ));
        } else if (Object.prototype.toString.call(data[0]) === '[object Object]') {
            const result = data.map((item) => keys.map((key) => item[key]));
            return Array.from(result, (_, rowIndex) => (
                <Tr key={rowIndex}>
                    {Array.from(result[rowIndex], (_, columnIndex) => (
                        <Td
                            max_width={td_max_width || ''}
                            key={columnIndex}
                        >
                            {result[rowIndex][columnIndex]}
                        </Td>
                    ))}
                </Tr>
            ));
        } else {
            return <Tr>
                <Td colSpan={headers.length} max_width={td_max_width || ''} tw={'leading-10'}>
                    {/*暂无数据*/}
                </Td>
            </Tr>;
        }
    };

    return (
        <>
            {/*<div tw={'bg-white leading-10 w-full relative -top-10 rounded-t-3xl'}>-</div>*/}
            {
                title &&
                <InLineTitle tw={'mt-2 mb-4'}>{title}</InLineTitle>
            }
            <Wrapper h={h || ''}>
                <TableWrapper>
                    <Thead>{renderHeaderRow()}</Thead>
                    <Tbody>{renderRows()}</Tbody>
                </TableWrapper>
                {!isError && !data && <Picture url={<FontAwesomeIcon icon={solid("spinner")} spin tw={'text-blue-300'}/>} h={'80%'} w={'100%'}/>}
                {!isError && data && data.length === 0 && <Picture url={<FontAwesomeIcon icon={solid("eye-slash")} fade tw={'text-blue-300'}/>} h={'80%'} w={'100%'}/>}
                {isError && <Picture errorFlag={true} h={'80%'} w={'100%'}/>}
            </Wrapper>
        </>
    );
};

export default Table;
