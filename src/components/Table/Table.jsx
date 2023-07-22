import React from 'react';
import tw from "twin.macro";
import {Caption, TableWrapper, Tbody, Td, Th, Thead, Tr, Wrapper} from "@/components/Table/Styled.twin";
import {InLineTitle} from "@/styles/TextStyles";
import {Tooltip} from "react-tooltip";

/**
 * **Table**组件
 * @param {Object} props - 组件的props对象
 * @param {String} props.title - 表标题
 * @param {Array<Array<String> | Object>} props.data - 表项数据
 * @param {Array<String>} props.headers - 表头项
 * @param {Array<String>} props.keys - 对象中选择哪些属性(按顺序)
 * @param {String} props.h - 表高度 e.g. '360px'
 * @returns {JSX.Element}
 * @constructor
 */
const Table = ({title, data, headers, keys, h}) => {
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
                <Td colSpan={headers.length} tw={'leading-10'}>
                    暂无数据
                </Td>
            </Tr>;
        if (Object.prototype.toString.call(data[0]) === '[object Array]') {
            return Array.from(data, (_, rowIndex) => (
                <Tr key={rowIndex}>
                    {Array.from(data[rowIndex], (_, columnIndex) => (
                        <Td
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
                            key={columnIndex}
                        >
                            {result[rowIndex][columnIndex]}
                        </Td>
                    ))}
                </Tr>
            ));
        } else {
            return <Tr>
                <Td colSpan={headers.length} tw={'leading-10'}>
                    暂无数据
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
                    {
                        !data || data.length === 0 ?
                            <Tbody>
                                <Tr>
                                    <Td colSpan={headers.length} tw={'leading-10'}>
                                        暂无数据
                                    </Td>
                                </Tr>
                            </Tbody>
                            : ''
                    }
                </TableWrapper>
            </Wrapper>
        </>
    );
};

export default Table;
