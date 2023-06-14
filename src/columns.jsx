import {createColumnHelper} from '@tanstack/react-table'
const columnHelper = createColumnHelper();

export const columns = [  
    columnHelper.accessor('id', {
        header: 'Id',
        footer: 'Id'
    }),
    columnHelper.accessor('name', {
        header: 'Name',
        footer: 'Name'
    }),
    columnHelper.accessor('age', {
        header:'Age',
        footer:'Age',
    }),
    columnHelper.accessor('city', {
        header:'City',
        footer:'City',
    }),
    columnHelper.accessor('food', {
        header:'Food',
        footer:'Food',
    }),
    columnHelper.accessor('color', {
        header:'Color',
        footer:'Color',
    }),
]