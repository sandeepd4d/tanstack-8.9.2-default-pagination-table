import {useState} from 'react';
import {defaultData} from '../data';
import {columns} from '../columns';
import {useReactTable, getCoreRowModel, flexRender} from '@tanstack/react-table';
import {Table} from 'react-bootstrap';

const BasicTable = () => {
    const [data] = useState(() => [...defaultData]);
    const table = useReactTable({data, columns, getCoreRowModel:getCoreRowModel()});

    // {console.log(table)}

    return (
        <Table className='table table-hover table-bordered'>
            <thead>        
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            <tfoot>
                {table.getFooterGroups().map(footerGroup => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map(footer => (
                            <th key={footer.id}>
                                {footer.isPlaceholder ? null : flexRender(footer.column.columnDef.footer, footer.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </tfoot>
        </Table>    
    )
}

export default BasicTable;