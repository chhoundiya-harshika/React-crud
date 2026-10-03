import React from 'react'
import ShowHotel from './ShowHotel'
import HotelForm from './HotelForm'
import { useState } from 'react'

const App = () => {
   const [ref, setRef]=useState(0)
  const [edit, setEdit]=useState(null)
  return (
    <div>
      <h2>WELCOME TO MY HOTEL! </h2>
      <ShowHotel added={()=>{setEdit (ref+1), setEdit(null)}} acceptEdit={edit}/>
      <HotelForm refresh={ref} updateHotel={(hot)=>{
        setEdit(hot)
      }}/>

    </div>
  )
}

export default App

