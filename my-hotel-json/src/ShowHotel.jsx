import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const ShowHotel = ({refresh, updateHotel}) => {
    const [allhotel, setAllHotel]=useState([])

    const loadAllHotel=async()=>{
        const {data} = await axios.get('http://localhost:3003/bookings')
        setAllHotel(data)
    }

    useEffect(()=>{
     loadAllHotel();
    },[refresh])

    const handleDelete=async(bookingId)=>{
        await axios.delete(`http://localhost:3003/bookings/${form.bookingId}`)
        loadAllHotel();
    }

  return (
    <div>
      <h2>MY HOTEL</h2>
      <table border='2'>
        <thead>
            <tr>
                <th>bookingId</th>
                <th>customerName</th>
     <th> roomNumber</th>
      <th>roomType</th>
      <th>checkInDate</th>
      <th>checkOutDate</th>
      <th>guests</th>
      <th>mobileNumber</th>
      <th>totalAmount</th>
     <th> bookingStatus</th>
            </tr>
        </thead>
        <tbody>
            {allhotel.map((e)=>(
                <tr key={e.bookingId}>
                    <td>{e.customerName}</td>
                    <td>{e.roomNumber}</td>
                    <td>{e.checkInDate}</td>
                    <td>{e.checkOutDate}</td>
                    <td>{e.guests}</td>
                    <td>{e.mobileNumber}</td>
                    <td>{e.totalAmount}</td>
                    <td>{e.bookingStatus}</td>
                    <td><button onClick={()=>handleDelete(e.serviceId)}>Delete</button>{" "}
                    <button onClick={()=>updateHotel(e)}>Update</button>{" "}
                    </td>
                </tr>

            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ShowHotel
