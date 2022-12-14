import React from 'react'
import {HiUserGroup} from 'react-icons/hi'
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
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
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
        text: 'Chart.js Bar Chart',
      },
    },
  };
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
const AdminCurrencySection = () => {
  return (
    <div>
        <div className='flex gap-5 mb-5'>
            <div className='w-[400px] h-fit grid grid-cols-2 gap-3'>
                <div className='flex items-center border-2 border-background-signup justify-between p-3 rounded-md h-fit'>
                    <div className='flex items-center gap-2'>
                        <HiUserGroup size={25} color={"#F2AF92"}/>
                        <h1 className='text-base font-semibold'>Users</h1>
                    </div>
                    <h1>95</h1>
                </div>
                <div className='flex items-center border-2 border-background-signup justify-between p-3 rounded-md h-fit'>
                    <div className='flex items-center gap-2'>
                        <HiUserGroup size={25} color={"#F2AF92"}/>
                        <h1 className='text-base font-semibold'>Users</h1>
                    </div>
                    <h1>95</h1>
                </div>
            </div>
            <div className='flex-1 w-full p-2 border-2 border-background-signup rounded-md'>
                <Bar options={options} data={data} />
            </div>
        </div>
    </div>
  )
}

export default AdminCurrencySection