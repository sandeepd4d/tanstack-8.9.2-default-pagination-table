import { useState, useEffect, useRef, useCallback} from 'react'
import './App.css'
import {Table,  Button} from 'react-bootstrap';
import {defaultData} from './data'
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getSortedRowModel,} from "@tanstack/react-table";

 const EditableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

 const onBlur = (e) => {
    tableMeta?.updateData(row.index, column.id, !isNaN?Number(e.target.value):e.target.value);
  };
  const onSelectChange = () => {
    const age = row.original.age;
    tableMeta?.updateData(row.index, "age", (age * -1));
  };
    return columnMeta?.type === "select" ? (
      <>
    <select className='form-select' onChange={onSelectChange}>
      {
        columnMeta?.options?.map((option,index) => (
          <option value={option.value} key={index}>{option.label}</option>
        ))
      }
    </select>
        </>
  ) : (
    <input
      value={value}
      // onChange={(e) => setValue(e.target.value)}
      onChange={(e)=>onBlur(e)}
      type={columnMeta?.type || "text"}
    />
  );
};
const columnHelper = createColumnHelper();

function useSkipper() {
  const shouldSkipRef = useRef(true)
  const shouldSkip = shouldSkipRef.current

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = useCallback(() => {
    shouldSkipRef.current = false
  }, [])

  useEffect(() => {
    shouldSkipRef.current = true
  })

  return [shouldSkip, skip]
}

function App() {
  const [data, setData] = useState(() => [...defaultData]);
  const [sorting, setSorting] = useState([]);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
  const newData = {
    id:data.length+1,
    name:'',
    age:0,
    city:'',
    food:'',
    color:'',
  }

  const addNewData =() => {
    data.unshift(newData);
    setData(data=>[...data]);
  }
  const columns = [
      columnHelper.accessor("formula", {
        header: "Add Formula",
        footer: 'Total',
        id: "formula",
        enableSorting:false,
        cell: EditableCell,
        meta: {
          type: "select",
          options: [
            { value: "+", label: "+" },
            { value: "-", label: "-" },
          ],
        },
      }),
      columnHelper.accessor(row=>row.id, {
        header: "#",
        enableSorting:false,
          meta: {
            type: "number",
          },
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: EditableCell,
          meta: {
            type: "text",
          },
      }),
      columnHelper.accessor("age", {
        header: "Age",
        cell: EditableCell,
          meta: {
            type: "number",
        },
        footer: ({ table }) => table.getPaginationRowModel().rows.reduce((total, row) => total + row.getValue('age'), 0),
      }),
      columnHelper.accessor("city", {
        header: "City",
        cell: EditableCell,
          meta: {
            type: "text",
          },
      }),
      columnHelper.accessor("food", {
        header: "Food",
        cell: EditableCell,
          meta: {
            type: "text",
          },
      }),
      columnHelper.accessor("color", {
        header: "Color",
        cell: EditableCell,
          meta: {
            type: "text",
          },
      }),
      columnHelper.accessor("delete", {
        header: "Action",
        id: "delete",
        enableSorting:false,
        cell: (tableProps) => (
          <Button
            classame="btn btn-primary"
            onClick={() => {
              const dataCopy = [...data];
              dataCopy.splice(tableProps.row.index, 1);
              setData(dataCopy);
            }}
            >
            Delete
          </Button>
        ),
      }),
  ];
  
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    debugTable: true,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        skipAutoResetPageIndex();
        setData((old) =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex],
              [columnId]: !isNaN(value) ? Number(value) : value,
            };
          }
          return row;
        })
        );
      },
    },
  });
  
  return (
    <>
      <Table bordered size="sm">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder ? null : (
                <div
                {...{
                  className: header.column.getCanSort()
                  ? 'cursor-pointer select-none'
                  : '',
                  onClick: header.column.getToggleSortingHandler(),
                }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                    )}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted()] ?? null}
                </div>
              )}
              </th> 
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
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
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </Table>

      <Button onClick={addNewData}>Add New Record</Button>

      <nav aria-label="Page navigation example">
        <ul className="pagination">
        {
        table.getCanPreviousPage() && (
          <>
          <li className="page-item"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            <a className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item"
          onClick={() => table.previousPage()}
          // disabled={table.getCanPreviousPage()}
          >
            <a className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
            </>
        )
            }
            {
              table.getCanNextPage() && (
                <>
          <li className="page-item"
          onClick={() => table.nextPage()}
          // disabled={!table.getCanNextPage()}
          >
            <a className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
          <li className="page-item"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          // disabled={!table.getCanNextPage()}
          >
            <a className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
            </>
          )}
        </ul>
      </nav>

       <div className="flex items-center justify-between gap-2">
        <span className="">
          <strong>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()} </strong>
        </span>
        <span className="">
          <input
            style={{"width":'auto'}}
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <span className=''>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
            >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </span>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
    </>
  )
}

export default App
