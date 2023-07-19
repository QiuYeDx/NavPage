import React from 'react';
import tw from "twin.macro";
import {Caption, TableWrapper, Tbody, Td, Th, Thead, Tr, Wrapper} from "@/components/Table/Styled.twin";
import {InLineTitle} from "@/styles/TextStyles";

/**
 * **Table**组件
 * @param rows
 * @param columns
 * @param title
 * @param data - 二维数组
 * @param headers
 * @returns {JSX.Element}
 * @constructor
 */
const Table = ({rows, columns, title, data, headers}) => {
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
        return Array.from(data, (_, rowIndex) => (
            <Tr key={rowIndex}>
                {Array.from(data[rowIndex], (_, columnIndex) => (
                    <Td key={columnIndex}>
                        {data[rowIndex][columnIndex]}
                    </Td>
                ))}
            </Tr>
        ));
    };

    return (
        <>
            {/*<div tw={'bg-white leading-10 w-full relative -top-10 rounded-t-3xl'}>-</div>*/}
            <InLineTitle tw={'mt-2 mb-4'}>{title || ''}</InLineTitle>
            <Wrapper>
                <TableWrapper>
                    <Thead>{renderHeaderRow()}</Thead>
                    <Tbody>{renderRows()}</Tbody>
                    {
                        data.length === 0 ?
                            <Tbody>
                                <Td colSpan={headers.length} tw={'leading-10'}>
                                    暂无数据
                                </Td>
                            </Tbody>
                            : ''
                    }
                </TableWrapper>
            </Wrapper>

        </>
    );
};

export default Table;
