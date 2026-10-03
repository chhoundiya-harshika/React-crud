import React, { useEffect, useState } from 'react'
import axios from 'axios'

const VehicleForm = ({added,acceptEdit}) => {
    const [form , setForm]=useState({
        "serviceId": "",
      "customerName": " ",
      "vehicleNumber": "",
      "vehicleModel": "",
      "serviceType": " ",
      "mechanicName": "",
      "serviceDate": "",
      "serviceCost": "",
      "contactNumber": "",
      "serviceStatus": ""
    })

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setForm({...form,[name]:value})
    }

    useEffect(()=>{
if(acceptEdit){
    console.log("", acceptEdit)
    setForm(acceptEdit)
}
    },[acceptEdit])

const handleSubmit = async (e) => {
    e.preventDefault();

    if (acceptEdit) {
        await axios.put(
            `http://localhost:3000/services/${form.serviceId}`,
            form
        );
    } else {
        await axios.post(
            "http://localhost:3000/services",
            form
        );
    }

    added(); 

    setForm({
        serviceId: "",
        customerName: "",
        vehicleNumber: "",
        vehicleModel: "",
        serviceType: "",
        mechanicName: "",
        serviceDate: "",
        serviceCost: "",
        contactNumber: "",
        serviceStatus: ""
    });
};
  return (
    <div>
      <h2>
        {acceptEdit ? "Update Vehicle Form" : "Add vehicle Form"}

      </h2>
      <form onSubmit={handleSubmit}>
        serviceId: <input type="text" name='serviceId' value={form.serviceId} onChange={handleChange}/><br/><br/>
        customerName: <input type="text" name='customerName' value={form.customerName} onChange={handleChange}/><br/><br/>
        vehicleNumber: <input type="text" name='vehicleNumber' value={form.vehicleNumber} onChange={handleChange}/><br/><br/>
        vehicleModel: <input type="text" name='vehicleModel' value={form.vehicleModel} onChange={handleChange}/><br/><br/>
        mechanicName: <input type="text" name='mechanicName' value={form.mechanicName} onChange={handleChange}/><br/><br/>
        serviceDate: <input type="text" name='serviceDate' value={form.serviceDate} onChange={handleChange}/><br/><br/>
        serviceCost: <input type="text" name='serviceCost' value={form.serviceCost} onChange={handleChange}/><br/><br/>
        contactNumber: <input type="text" name='contactNumber' value={form.contactNumber} onChange={handleChange}/><br/><br/>
        serviceStatus: <input type="text" name='serviceStatus' value={form.serviceStatus} onChange={handleChange}/>
      <button>{acceptEdit ? "Update Vehicle " : "Add vehicle"}</button>
      </form>
    </div>
    
  )
}

export default VehicleForm
