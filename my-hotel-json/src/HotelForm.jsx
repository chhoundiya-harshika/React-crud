import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const HotelForm = ({added, acceptEdit}) => {
    const[form , setForm] =useState({
        "bookingId": '',
      "customerName": "",
      "roomNumber": "",
      "roomType": "",
      "checkInDate": "",
      "checkOutDate": "",
      "guests": 2,
      "mobileNumber": "",
      "totalAmount": 12000,
      "bookingStatus": ""
    })

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setForm({...form,[name]:value})

    }
    useEffect(()=>{
    if(acceptEdit){
        console.log(" ", acceptEdit)
        setForm(acceptEdit)
    }
    },[acceptEdit])

    const handleSubmit=async(e)=>{
        e.preventDefault();

        if(acceptEdit){
            await axios.put(`http://localhost:3003/bookings`, form);
        }else{
            await axios.post(`http://localhost:3003/bookings`, form);
        }
    }
    added();
    setForm(
        {
        "bookingId": '',
      "customerName": "",
      "roomNumber": "",
      "roomType": "",
      "checkInDate": "",
      "checkOutDate": "",
      "guests": 2,
      "mobileNumber": "",
      "totalAmount": 12000,
      "bookingStatus": ""
    }

    )
  return (
    <div>
      <h2>{acceptEdit ? "Update Hotel Form" : "Add Hotel Form"}</h2>
      <form onSubmit={handleSubmit}>
        bookingId: <input type="text" name='bookingId' value={form.bookingId} onChange={handleChange} /><br/><br/>
        customerName: <input type="text" name='customerName' value={form.customerName} onChange={handleChange} /><br/><br/>
        roomNumber: <input type="text" name='roomNumber' value={form.roomNumber} onChange={handleChange} /><br/><br/>
        roomType: <input type="text" name='roomType' value={form.roomType} onChange={handleChange} /><br/><br/>
        checkInDate: <input type="text" name='checkInDate' value={form.checkInDate} onChange={handleChange} /><br/><br/>
        checkOutDate: <input type="text" name='checkOutDate' value={form.checkOutDate} onChange={handleChange} /><br/><br/>
        guests: <input type="text" name='guests' value={form.guests} onChange={handleChange} /><br/><br/>
        mobileNumber: <input type="text" name='mobileNumber' value={form.mobileNumber} onChange={handleChange} /><br/><br/>
        bookingId: <input type="text" name='bookingId' value={form.bookingId} onChange={handleChange} /><br/><br/>
        bookingStatus: <input type="text" name='bookingStatus' value={form.bookingStatus} onChange={handleChange} /><br/><br/>
        <button>{acceptEdit ? "Update Hotel " : "Add Hotel "}</button>
      </form>
    </div>
  )
}

export default HotelForm
