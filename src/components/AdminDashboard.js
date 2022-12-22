import React from 'react'
import {BiUser} from 'react-icons/bi'
import {FaUsers} from 'react-icons/fa'
import {RiAuctionFill} from 'react-icons/ri'
import {AiOutlineBarChart} from 'react-icons/ai'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useQuery } from '@apollo/client'
import { getAllUser,adminDashBoardAuction, adminDashboardSales } from '../graphql/queries'
ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
    labels: ['Fruit', 'Meat', 'Sea Food', 'Vegatables'],
    datasets: [
      {
        label: 'Category Order',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const datass = {
    labels: ['Quận 10', 'Quận Thủ Đức', 'Huyện Bình Chánh', 'Quận Bình Thạnh', "Quận 1"],
    datasets: [
      {
        label: 'District',
        data: [52, 62, 48, 5,10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const columns = [
    { id: 'id', label: 'ID', minWidth: 170 },
    { id: 'name', label: 'Username', minWidth: 100 },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
    },
    {
      id: 'shop',
      label: 'Shop Name',
      minWidth: 170,
    },
    {
      id: 'isActive',
      label: 'Is Active',
      minWidth: 170,
    },
  ];
  
  const AdminDashboard = () => {
    const rows = [];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const {loading,error,data:datas} = useQuery(getAllUser)
    const {loading:loadingAdminAuc, error:errorAdminAuc,data:dataAdminAuc} = useQuery(adminDashBoardAuction)
    const {loading:loadingAdminSale,error:errorAdminSale,data:dataAdminSale} = useQuery(adminDashboardSales)
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    if(!loading){
        datas.getAllUser.map((itemUser,indexUser)=>{
            const obj = {
                id:itemUser.User_ID,
                name:itemUser.User_Name,
                email:itemUser.Email,
                shop:itemUser.Shop_Name === null ? "No name shop" : itemUser.Shop_Name,
                isActive:itemUser.isActive ? "Active" : "No Active"
            }
            rows.push(obj)
        })
    }
  return (
    <div>AdminDashboard
        <div className='grid md:grid-cols-2 lg:grid-cols-3 my-5 gap-2'>
            <div className='flex justify-between items-center border-2 border-background-signup px-4 py-3 rounded-lg'>
                <div className='flex items-center gap-1'>
                    <BiUser size={30}/>
                    <h1 className='text-base'>User</h1>
                </div>
                <h1>{!loading && datas.getAllUser.length}</h1>
            </div>
            <div className='flex justify-between items-center border-2 border-background-signup px-4 py-3 rounded-lg'>
                <div className='flex items-center gap-1'>
                    <RiAuctionFill size={30}/>
                    <h1 className='text-base'>Auction Field</h1>
                </div>
                <h1>{!loadingAdminAuc && dataAdminAuc.adminDashBoardAuction.length}</h1>
            </div>
            <div className='flex justify-between items-center border-2 border-background-signup px-4 py-3 rounded-lg'>
                <div className='flex items-center gap-1'>
                    <AiOutlineBarChart size={30}/>
                    <h1 className='text-base'>Sales</h1>
                </div>
                <h1>{!loadingAdminSale && dataAdminSale.adminDashboardSales.length}</h1>
            </div>
        </div>
        <div className='grid grid-cols-2 gap-2 mb-4'>
            <div className=' border-2 border-background-signup rounded-md'>
                <Pie data={datass} width={"400px"} height={"400px"}  options={{ maintainAspectRatio: false }}/>
            </div>
            <div className='border-2 border-background-signup rounded-md'>
                <Pie data={data} width={"400px"} height={"400px"} options={{ maintainAspectRatio: false }}/>
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

export default AdminDashboard