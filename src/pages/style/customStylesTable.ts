import  { TableStyles } from "react-data-table-component";

export const customStylesTable: TableStyles = {
    headRow: {
        style: {
            backgroundColor: '#22c55e', // bg-gray-50
            borderBottom: '1px solid #e2e8f0', // border-gray-200
            width: '100%',

        }
    },
    headCells: {
        style: {
            fontSize: '0.875rem', // text-sm
            fontWeight: '600', // font-semibold
            color: '#ffffff', // text-gray-600
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            paddingLeft: '1rem',
            paddingRight: '1rem',
        }
    },
    cells: {
        style: {
            paddingLeft: '1rem',
            paddingRight: '1rem',
        }
    },
};