import React from 'react'
import TableOrder from './TableOrder'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import {AiFillPlusCircle} from 'react-icons/ai'
import { Stack,TextField, InputAdornment } from '@mui/material';
import TableWeight from './TableWeight';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AdminOrderSection = () => {
  
  return (
    <div>
        <div className='mb-5'>
          <h1 className='mb-4 text-lg font-semibold'>Delivery Fee</h1>
          <TableOrder/>
        </div>
        <div>
          <h1 className='mb-4 text-lg font-semibold'>Weight Fee</h1>
          <TableWeight/>
        </div>
    </div>
  )
}

export default AdminOrderSection