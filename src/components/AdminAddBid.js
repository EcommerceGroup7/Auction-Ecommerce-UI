import React ,{useState}from 'react'
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery,useMutation } from '@apollo/client';
import { createAuctionField } from '../graphql/mutation';
import { getAllAuctionField } from '../graphql/queries';
import { useFormik } from 'formik';
const AdminAddBid = () => {
    const [valueStartTime, setValueStartTime] = useState('');
    const [valueEndTime, setValueEndTime] = useState('');
    const [discountCycle, setDiscountCycle] = useState(0);
    const {loading,error,data} = useQuery(getAllAuctionField)
    const [createField,dataMutation] = useMutation(createAuctionField,{
        refetchQueries:[
            {
                query:getAllAuctionField
            }
        ]
    })
    const {values, errors, touched, handleChange,handleSubmit} = useFormik({
        initialValues:{
            startTime:'',
            endTime:'',
            discountCycle:0
        },
        onSubmit:async values=>{
            try{
                await createField({
                    variables:{
                        Start_Time:valueStartTime.toString().slice(4,24),
                        End_Time:valueEndTime.toString().slice(4,24),
                        Discount_Circle:+discountCycle
                    }
                })
            }
            catch(err){
                console.log(err.message);
            }
        }
    })
    const columns = [
        {
            field:'id', headerName:'ID', width:200
        },
        {
            field:'Start_Time', headerName:'Start Time', width:200
        },
        {
            field:'End_Time', headerName:'End Time', width:200
        },
        {
            field:'Discount_Circle', headerName:'Discount Cycle',width:200
        },
        {
            field:'isOperation', headerName:'Operation',width:150
        },
    ]
    const rows = [];
    if(!loading){
        data.getAllAuctionField.map((item,index)=>{
            const start = new Date(item.Start_Time)
            const end = new Date(item.End_Time)
            const obj = {
                id:item.Auction_Field_ID,
                Start_Time:start.toString().slice(4,24),
                End_Time:end.toString().slice(4,24),
                Discount_Circle:item.Discount_Circle,
                isOperation:item.isOperation ? "Is Active" : 'No Active'
            }
            rows.push(obj)
        })
    }
   
    console.log(valueStartTime.$d);
    console.log(valueEndTime.$d);
    console.log(discountCycle);
  return (
    <div className=''>
        <form action="" onSubmit={handleSubmit}>
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
                <Button type='submit' variant="contained" style={{backgroundColor:"#F2AF92",}}>Add bid</Button>
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