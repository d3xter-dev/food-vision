import { Typography } from '@material-tailwind/react'
import React, { ComponentClass, FunctionComponent, useMemo } from 'react'

export type TableColumnProps<T> = {
    item: T
}

type TableColumn<T> = {
    title: string
    key: string
    className?: string
    component?: FunctionComponent<TableColumnProps<T>> | ComponentClass<TableColumnProps<T>>
}

type TableProps<T> = {
    loading?: boolean
    columns: TableColumn<T>[]
    rows: T[]
}

export function Table<T>({ rows, loading, columns }: TableProps<T>) {
    const tableData = useMemo((): T[] => (loading ? Array(4).fill({}) : rows), [loading, rows])

    return (
        <table className="w-full min-w-max table-auto text-left">
            <thead>
                <tr>
                    {columns.map((head) => (
                        <th
                            key={head.key}
                            className={'border-b border-blue-gray-100 bg-blue-gray-50 p-4 ' + head.className}
                        >
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                            >
                                {head.title}
                            </Typography>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableData.map((item, index) => (
                    <tr key={index} className="even:bg-blue-gray-50/50">
                        {columns.map((column) => (
                            <td key={column.key + index} className="p-4">
                                {loading ? (
                                    <Typography
                                        as="div"
                                        variant="h1"
                                        className="mb-4 h-3 my-auto w-full rounded-full bg-gray-300 animate-pulse"
                                    >
                                        &nbsp;
                                    </Typography>
                                ) : column.component ? (
                                    React.createElement(column.component, { item })
                                ) : (
                                    <Typography variant={'small'}>{item[column.key as keyof T] as string}</Typography>
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
