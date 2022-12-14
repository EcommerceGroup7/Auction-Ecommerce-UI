import React ,{useState,useEffect}from 'react'

const Countdown = ({start,end}) => {
    

    let endfff = new Date(end).getTime()
    let startfff = new Date().getTime()
    const [timeSum, setTimeSum] = useState(endfff-startfff)
    useEffect(()=>{
        setTimeout(()=>{
            setTimeSum(timeSum - 1000)
        },1000)
        
        // return()=>clearInterval(minTimeSetInterval)
    },[timeSum])

    const getFormattedTime = (milliseconds) =>{
        let total_seconds = parseInt(Math.floor(milliseconds / 1000))
        let total_minutes = parseInt(Math.floor(total_seconds / 60))
        let total_hours = parseInt(Math.floor(total_minutes / 60))
        let days = parseInt(Math.floor(total_hours / 24))

        let seconds = parseInt(total_seconds % 60)
        let minutes = parseInt(total_minutes % 60)
        let hours = parseInt(total_hours % 24)

        return `${days} day : ${hours} hour : ${minutes} minute : ${seconds} second`
    } 
  return (
    <div className=''>
      Count down: {getFormattedTime(timeSum)}
    </div>
  )
}

export default Countdown