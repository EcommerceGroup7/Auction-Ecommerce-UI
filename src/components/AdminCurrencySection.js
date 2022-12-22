import React from 'react'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useQuery} from '@apollo/client';
import {getCurrencyLog} from '../graphql/queries'
const columns = [
    {id: 'id', label: 'ID', minWidth: 170},
  { id: 'time', label: 'Time', minWidth: 170 },
  { id: 'total', label: 'Total Amount', minWidth: 170 },
  {
    id: 'user',
    label: 'User',
    minWidth: 170,
  },
  {
    id: 'log',
    label: 'Currency Log',
    minWidth: 170,
  }
];


const AdminCurrencySection = () => {
    const rows = [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const {loading:loadingCurencyLog, error:errorCurrencyLog, data:dataCurrencyLog} = useQuery(getCurrencyLog)
  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };
  if(!loadingCurencyLog){
    dataCurrencyLog.getCurrencyLog.map((itemLog,indexLog)=>{
        const date = new Date(itemLog.Time)
        const obj = {
            id:itemLog.Currency_Log_ID,
            time:date.toString().slice(4,24),
            total:itemLog.Total_Amount,
            user:itemLog.Currency.User_ID.User_Name,
            log:itemLog.Currency_Log_Value
        }
        console.log(obj);
        rows.push(obj)
    })
}
  return (
    <div>
        <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: '100%' }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                        {value}
                                    </TableCell>
                                );
                                })}
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5,10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    </div>
  )
}

export default AdminCurrencySection