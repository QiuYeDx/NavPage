import React from 'react';
import tw from "twin.macro";
import {Caption, TableWrapper, Tbody, Td, Th, Thead, Tr, Wrapper} from "@/components/Table/Styled.twin";
import {InLineTitle} from "@/styles/TextStyles";

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
            <TableWrapper>
                <Caption><InLineTitle>{title || ''}</InLineTitle></Caption>
                <Thead>{renderHeaderRow()}</Thead>
            </TableWrapper>
            <div tw={'bg-white leading-10 w-full relative -top-10 rounded-t-3xl'}>-</div>
            <Wrapper>
                <TableWrapper>
                    <Tbody>{renderRows()}</Tbody>
                    {
                        data.length === 0 ?
                            <Tbody>
                                <Td colSpan={4} tw={'leading-10'}>
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
