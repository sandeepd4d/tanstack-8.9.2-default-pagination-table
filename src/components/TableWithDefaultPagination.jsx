import React, { useState } from 'react';
import {useReactTable, getCoreRowModel, getPaginationRowModel, flexRender} from '@tanstack/react-table';
import {columns} from '../columns';
import {defaultData} from '../data';
import { Table, Button } from 'react-bootstrap';

const TableWithDefaultPagination = () => {
    const [data] = useState([...defaultData]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel:getCoreRowModel(),
        getPaginationRowModel:getPaginationRowModel()
    });
    // console.log(table);

    return (
        <>
        <h1 className='text-center mt-4 mb-5 text-capitalize'>Table with default pagination</h1>
        <Table className='table table-bordered table-hover'>
            <thead>
                {
                    table.getHeaderGroups().map(row=>
                    <tr key={row.id}>
                        {
                            row.headers.map(header=>
                                <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                            )
                        }
                    </tr>
                    )
                }
            </thead>
            <tbody>
                {
                    table.getRowModel().rows.map(row=>
                        <tr key={row.id}>
                            {
                                row.getVisibleCells().map(cell=>
                                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                )
                            }
                        </tr>
                    )
                }
            </tbody>
            <tfoot>
                {
                    table.getFooterGroups().map(row=>
                        <tr key={row.id}>
                            {
                                row.headers.map(header=>
                                    <th key={header.id}>{flexRender(header.column.columnDef.footer, header.getContext())}</th>
                                )
                            }
                        </tr>
                    )
                }
            </tfoot>
        </Table>

        <div className='d-flex flex-wrap align-items-center justify-content-center w-100 gap-2 my-5'>
            <Button onClick={()=>table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className={!table.getCanPreviousPage()?'btn-secondary':'btn-primary'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  style={{width:'15px', height:'15px'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                </svg>
            </Button>
            <Button onClick={()=>table.previousPage()} disabled={!table.getCanPreviousPage()} className={!table.getCanPreviousPage()?'btn-secondary':'btn-primary'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:'15px', height:'15px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </Button>

            <Button onClick={()=>table.nextPage()} disabled={!table.getCanNextPage()} className={!table.getCanNextPage()?'btn-secondary':'btn-primary'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:'15px', height:'15px'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </Button>
            <Button onClick={()=>table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className={!table.getCanNextPage()?'btn-secondary':'btn-primary'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width:'15px', height:'15px'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
            </Button>
        </div>
        </>
    )
}

export default TableWithDefaultPagination;