import React from 'react'
import {FaProductHunt} from 'react-icons/fa'
import {BsFillCartCheckFill,BsCartPlusFill} from 'react-icons/bs'
import {MdSell} from 'react-icons/md'
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
import { useQuery } from '@apollo/client';
import {getAdminProductCount,getAdminProductInfo,getFieldTotalProduct} from '../graphql/queries'
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Auction Field',
      },
    },
  };
  
  const columns = [
    { id: 'id', label: 'ID', minWidth: 170 },
    { id: 'name', label: 'Product Name', minWidth: 170 },
    { id: 'shop', label: 'Shop Name', minWidth: 170 },
    {
      id: 'price',
      label: 'Current Price',
      minWidth: 170,
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 170,
     
    },
  ];

  const AdminProductSection = () => {
    const rows = [];
    const labels = [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {loading:loadingAdminCount, error:errorAdminCount,data:dataAdminCount} = useQuery(getAdminProductCount)
  const {loading:loadingAdminInfo,error:errorAdminInfo,data:dataAdminInfo} = useQuery(getAdminProductInfo)
  const {loading:loadingField,error:errorField,data:dataField} = useQuery(getFieldTotalProduct)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  if(!loadingAdminInfo){
    dataAdminInfo.getAdminProductInfo.map((itemInfo,indexInfo)=>{
        const obj={
            id:itemInfo.Product_ID.Product_ID,
            name:itemInfo.Product_ID.Product_Name,
            shop:itemInfo.User_ID.Shop_Name === null ? '' : itemInfo.User_ID.Shop_Name,
            price:itemInfo.Current_Price,
            status:itemInfo.status
        }
        rows.push(obj)
    })
  }
  if(!loadingField){
    dataField.getFieldTotalProduct.map((itemField,indexField)=>{
        labels.push(itemField.Auction_Field_ID.slice(0,6))
    })
  }
  return (
    <div>
        <div className='flex gap-5 mb-5'>
           

            <div className='w-[400px] h-fit grid grid-cols-2 gap-3'>
                <div className='flex items-center border-2 border-background-signup justify-between p-3 rounded-md h-fit'>
                    <div className='flex items-center gap-2'>
                        <FaProductHunt size={25} color={'#F2AF92'}/>
                        <h1 className='text-base font-semibold'>Product Total</h1>
                    </div>
                    <h1>{!loadingAdminCount && dataAdminCount.getAdminProductCount.totalProduct}</h1>
                </div>
                <div className='flex items-center border-2 border-background-signup justify-between p-3 rounded-md h-fit'>
                    <div className='flex items-center gap-2'>
                        <BsFillCartCheckFill size={25} color={'#F2AF92'}/>
                        <h1 className='text-base font-semibold'>Ordered</h1>
                    </div>
                    <h1>{!loadingAdminCount && dataAdminCount.getAdminProductCount.ordered}</h1>
                </div>
                <div className='flex items-center border-2 border-background-signup justify-between p-3 rounded-md h-fit'>
                    <div className='flex items-center gap-2'>
                        <MdSell size={25} color={'#F2AF92'}/>
                        <h1 className='text-base font-semibold'>Sold</h1>
                    </div>
                    <h1>{!loadingAdminCount && dataAdminCount.getAdminProductCount.sold}</h1>
                </div>
                <div className='flex items-center border-2 border-background-signup justify-between p-3 rounded-md h-fit'>
                    <div className='flex items-center gap-2'>
                        <BsCartPlusFill size={25} color={'#F2AF92'}/>
                        <h1 className='text-base font-semibold'>Selling</h1>
                    </div>
                    <h1>{!loadingAdminCount && dataAdminCount.getAdminProductCount.selling}</h1>
                </div>
            </div>
            <div className='flex-1 w-full p-2 border-2 border-background-signup rounded-md'>
                <Bar options={options} data={ {
                    labels,
                    datasets: [
                    {
                        label: 'Product Quantity',
                        data: !loadingField && dataField.getFieldTotalProduct.map((itemFields,indexFields)=>itemFields.totalProduct),
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    ],
  }} width="max-content"/>
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
                            // align={column.align}
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

export default AdminProductSection