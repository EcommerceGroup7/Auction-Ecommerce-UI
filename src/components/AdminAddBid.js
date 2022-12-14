import React ,{useState}from 'react'
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
const AdminAddBid = () => {
    const columns = [
        {
            field:'id', headerName:'Start Time', width:200
        },
        {
            field:'End_Time', headerName:'EndTime Time', width:200
        },
        {
            field:'Discount_Circle', headerName:'Discount Cycle',width:200
        },
        {
            field:'isOperation', headerName:'Operation',width:200,type:'number'
        },
    ]
    const rows = [
        { id: 1, End_Time: 'Snow', Discount_Circle: 'Jon', isOperation: 35 },
        { id: 2, End_Time: 'Lannister', Discount_Circle: 'Cersei', isOperation: 42 },
        { id: 3, End_Time: 'Lannister', Discount_Circle: 'Jaime', isOperation: 45 },
        { id: 4, End_Time: 'Stark', Discount_Circle: 'Arya', isOperation: 16 },
        { id: 5, End_Time: 'Targaryen', Discount_Circle: 'Daenerys', isOperation: null },
        { id: 6, End_Time: 'Melisandre', Discount_Circle: null, isOperation: 150 },
        { id: 7, End_Time: 'Clifford', Discount_Circle: 'Ferrara', isOperation: 44 },
        { id: 8, End_Time: 'Frances', Discount_Circle: 'Rossini', isOperation: 36 },
        { id: 9, End_Time: 'Roxie', Discount_Circle: 'Harvey', isOperation: 65 },
      ];
    const [valueStartTime, setValueStartTime] = useState('');
    const [valueEndTime, setValueEndTime] = useState('');
    const [discountCycle, setDiscountCycle] = useState('');
    console.log(valueStartTime.$d);
    console.log(valueEndTime.$d);
    console.log(discountCycle);
  return (
    <div className=''>
        <form action="">
            <div className='grid grid-cols-2 gap-3 mb-4'>
                <div>
                    <Stack spacing={3}> 
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} inputProps={{
                                ...props.inputProps,
                                placeholder: "Start Time"
                            }}
                            sx={{
                                input: { color:'#F2AF92' },
                                label: { color:'#F2AF92' },
                            }}
                            />}
                            label="Start Time"
                            value={valueStartTime}
                            onChange={(newValue) => {
                                setValueStartTime(newValue);
                            }}
                            
                        />
                    </Stack>
                </div>
                <div>
                    <Stack spacing={3}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} inputProps={{
                                ...props.inputProps,
                                placeholder: "End Time"
                            }}
                            sx={{
                                input: { color:'#F2AF92' },
                                label: { color:'#F2AF92' },
                            }}
                            />}
                            label="End Time"
                            value={valueEndTime}
                            onChange={(newValue) => {
                                setValueEndTime(newValue);
                            }}
                        />
                    </Stack>
                </div>
                <div>
                    <Stack spacing={3}> 
                        <TextField id="outlined-basic" label="Discount Cycle" variant="outlined" type="number" InputProps={{
                            endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
                        }} onChange={(e)=>{
                            setDiscountCycle(e.target.value)
                        }}/>
                    </Stack>
                </div>
            </div>
            <div>
                <Button type='submit' variant="contained" style={{backgroundColor:"#F2AF92",}}>Contained</Button>
            </div>
        </form>
        <div style={{ height: 400, width: '100%' ,marginTop:"10px"}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>

    </div>
  )
}

export default AdminAddBid