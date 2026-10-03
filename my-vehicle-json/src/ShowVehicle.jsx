import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ShowVehicle = ({ refresh, updateVehicle }) => {

    const [allvehicle, setAllVehicle]= useState([])

    const loadsAllVehicle= async()=>{
        const {data} = await axios.get(`http://localhost:3000/services`);
        setAllVehicle(data)
    }
    useEffect(()=>{
         loadsAllVehicle();
    },[refresh])

    const handleDelete= async(id)=>{
        await axios.delete(`http://localhost:3000/services/${id}`)
        loadsAllVehicle();

    }
  return (
    <div>
      <h2> ALL Vehicles</h2>
      <table border='2'>
        <thead>
            <tr>
      <th>serviceId</th>
      <th>customerName</th>
      <th>vehicleNumber</th>
      <th>vehicleModel</th>
      <th>serviceType</th>
      <th>mechanicName</th>
      <th>serviceDate</th>
      <th>serviceCost</th>
      <th>contactNumber</th>
      <th>serviceStatus</th>
      <th>Action</th>
   
      </tr>     
        </thead>
        <tbody>
           { allvehicle.map((e) => (
                 <tr key={e.serviceId}>
                     <td>{e.serviceId}</td>
                    <td>{e.customerName}</td>
                    <td>{e.vehicleNumber}</td>
                    <td>{e.vehicleModel}</td>
                    <td>{e.serviceType}</td>
                    <td>{e.mechanicName}</td>
                    <td>{e.serviceDate}</td>
                    <td>{e.serviceCost}</td>
                    <td>{contactNumber}</td>
                    <td><button onClick={()=>handleDelete(e.serviceId)}>Delete</button>{" "}
                    <button onClick={()=>updateVehicle(e)}>Update</button>{" "}
                    </td>
                 </tr>

            )

            )}
        </tbody>
      </table>
    </div>
  )
}

export default ShowVehicle
