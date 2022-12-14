import React from 'react'
import {FaProductHunt} from 'react-icons/fa'
import {BsFillCartCheckFill,BsCartPlusFill} from 'react-icons/bs'
import {MdSell} from 'react-icons/md'
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Chart.js Bar Chart',
  //     },
  //   },
  // };
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Dataset 1',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //   ],
  // };
  // const columns = [
  //   { id: 'name', label: 'Name', minWidth: 170 },
  //   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  //   {
  //     id: 'population',
  //     label: 'Population',
  //     minWidth: 170,
  //     align: 'right',
  //     format: (value) => value.toLocaleString('en-US'),
  //   },
  //   {
  //     id: 'size',
  //     label: 'Size\u00a0(km\u00b2)',
  //     minWidth: 170,
  //     align: 'right',
  //     format: (value) => value.toLocaleString('en-US'),
  //   },
  //   {
  //     id: 'density',
  //     label: 'Density',
  //     minWidth: 170,
  //     align: 'right',
  //     format: (value) => value.toFixed(2),
  //   },
  // ];
  // function createData(name, code, population, size) {
  //   const density = population / size;
  //   return { name, code, population, size, density };
  // }
  
  // const rows = [
  //   createData('India', 'IN', 1324171354, 3287263),
  //   createData('China', 'CN', 1403500365, 9596961),
  //   createData('Italy', 'IT', 60483973, 301340),
  //   createData('United States', 'US', 327167434, 9833520),
  //   createData('Canada', 'CA', 37602103, 9984670),
  //   createData('Australia', 'AU', 25475400, 7692024),
  //   createData('Germany', 'DE', 83019200, 357578),
  //   createData('Ireland', 'IE', 4857000, 70273),
  //   createData('Mexico', 'MX', 126577691, 1972550),
  //   createData('Japan', 'JP', 126317000, 377973),
  //   createData('France', 'FR', 67022000, 640679),
  //   createData('United Kingdom', 'GB', 67545757, 242495),
  //   createData('Russia', 'RU', 146793744, 17098246),
  //   createData('Nigeria', 'NG', 200962417, 923768),
  //   createData('Brazil', 'BR', 210147125, 8515767),
  // ];
const AdminProductSection = () => {
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  return (
    <div>
        {/* <div className='flex gap-5 mb-5'>
            <div className='w-[400px] h-fit grid grid-cols-2 gap-3'>
                <div className='flex items-center border-2 border-background-signup justify-between p-3 rounded-md h-fit'>
                    <div className='flex items-center gap-2'>
                        <FaProductHunt size={25} color={'#F2AF92'}/>
                        <h1 className='text-base font-semibold'>All Products</h1>
                    </div>
                    <h1>95</h1>
                </div>
                <div className='flex items-center border-2 border-background-signup justify-between p-3 rounded-md h-fit'>
                    <div className='flex items-center gap-2'>
                        <BsFillCartCheckFill size={25} color={'#F2AF92'}/>
                        <h1 className='text-base font-semibold'>Ordered</h1>
                    </div>
                    <h1>95</h1>
                </div>
                <div className='flex items-center border-2 border-background-signup justify-between p-3 rounded-md h-fit'>
                    <div className='flex items-center gap-2'>
                        <MdSell size={25} color={'#F2AF92'}/>
                        <h1 className='text-base font-semibold'>Selled</h1>
                    </div>
                    <h1>95</h1>
                </div>
                <div className='flex items-center border-2 border-background-signup justify-between p-3 rounded-md h-fit'>
                    <div className='flex items-center gap-2'>
                        <BsCartPlusFill size={25} color={'#F2AF92'}/>
                        <h1 className='text-base font-semibold'>Still on</h1>
                    </div>
                    <h1>95</h1>
                </div>
            </div>
            <div className='flex-1 w-full p-2 border-2 border-background-signup rounded-md'>
                <Bar options={options} data={data} width="max-content"/>
            </div>
        </div>
        <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
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
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
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
        </div> */}
    </div>
  )
}

export default AdminProductSection