import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ShowShopping = ({refresh, updateShopping})=> {

    const [allshopping, setAllShopping]=useState([])

    const loadALLShopping=async()=>{
      const {data}= await axios.get(``)

    }
    useEffect(()=>{
     loadALLShopping();

    },[refresh])

    const handleDelete=async()=>{
        await axios.delete(``)
        loadALLShopping();
    }
  return (
    <div>
      <h2> ALL Shoppings</h2>
      <table boerder='2'>
        <thead>
            <tr>
      <th>orderId</th>
      <th>customerName</th>
      <th>productName</th>
      <th>category</th>
      <th>quantity</th>
      <th>price</th>
      <th>orderDate</th>
      <th>paymentMethod</th>
      <th>deliveryAddress</th>
      <th>orderStatus</th>
      <th>Action</th>
   
      </tr>     
        </thead>
        <tbody>
           { allshopping.map((e) => (
                 <tr key={e.orderId}>
                     <td>{e.orderId}</td>
                    <td>{e.customerName}</td>
                    <td>{e.productName}</td>
                    <td>{e.category}</td>
                    <td>{e.quantity}</td>
                    <td>{e.price}</td>
                    <td>{e.orderDate}</td>
                    <td>{e.paymentMethod}</td>
                    <td>{e.deliveryAddress}</td>
                    <td>{e.orderStatus}</td>
                    <td><button onClick={()=>handleDelete(e.orderId)}>Delete</button>{" "}
                    <button onClick={()=>updateShopping(e)}>Update</button>{" "}
                    </td>
                 </tr>

            )

            )}
        </tbody>
      </table>
    </div>
  )
}

export default ShowShopping
