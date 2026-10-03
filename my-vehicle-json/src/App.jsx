import React, { useState } from 'react'
import ShowVehicle from './ShowVehicle'
import VehicleForm from './VehicleForm'

const App = () => {
  const [ref, setRef]=useState(0)
  const [edit, setEdit]=useState(null)
  return (
    <div>
      <h2> Welcom to Vehicle World!</h2>
      <VehicleForm added={()=>{setRef (ref+1), setEdit(null)}} acceptEdit={edit}/>
      <ShowVehicle refresh ={ref} updateVehicle={(veh)=>{
        setEdit(veh)
      }}/>
    </div>
  )
}

export default App