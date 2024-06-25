import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Dashboard() {

    const [message,setMessage] = useState()
    const navigate = useNavigate()


axios.defaults.withCredentials = true;

    useEffect(()=>{

axios.get('http://localhost:8070/user/dashboard')
.then(res => {
      console.log(res.data.message)
   if(res.data.valid){
    setMessage(res.data.message)
   }else{
    //setMessage(res.data.message)
    navigate('/')
   }
    })
    .catch(err => {
        console.log(err);
        });
        


    })




  return (
    <div>
      <h1>This is the dashboard {message}</h1>
    </div>
  )
}

export default Dashboard
