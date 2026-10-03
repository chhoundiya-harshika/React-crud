import React, { useEffect, useState } from 'react'

const ShoppingForm = ({added, acceptEdit}) => {
  const [form, setForm]=useState({
         "orderId": "",
      "customerName": "",
      "productName": "",
      "category": "",
      "quantity": 1,
      "price": 65000,
      "orderDate": "",
      "paymentMethod": "",
      "deliveryAddress": "",
      "orderStatus": ""
  })
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setForm({...form, [name]:value })

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
            ``,
            form
        );
    } else {
        await axios.post(
            "",
            form
        );
    }

    added();

    setForm({
        orderId: "",
      customerName: "",
      productName: "",
    category: "",
      quantity: 1,
      price: 65000,
      orderDate: "",
      paymentMethod: "",
      deliveryAddress: "",
      orderStatus: ""
    })
  }
  return (
    <div>
       <h2>
        {acceptEdit ? "Update Shopping Form" : "Add Shopping Form"}

      </h2>
      <form onSubmit={handleSubmit}>
        orderId: <input type="text" name='orderId' value={form.orderId} onChange={handleChange}/><br/><br/>
        customerName: <input type="text" name='customerName' value={form.customerName} onChange={handleChange}/><br/><br/>
        productName: <input type="productName" name='productName' value={form.productName} onChange={handleChange}/><br/><br/>
        category: <input type="category" name='category' value={form.category} onChange={handleChange}/><br/><br/>
        quantity: <input type="quantity" name='quantity' value={form.quantity} onChange={handleChange}/><br/><br/>
        price: <input type="price" name='price' value={form.price} onChange={handleChange}/><br/><br/>
        orderDate: <input type="orderDate" name='orderDate' value={form.orderDate} onChange={handleChange}/><br/><br/>
        paymentMethod: <input type="text" name='paymentMethod' value={form.paymentMethod} onChange={handleChange}/><br/><br/>

        deliveryAddress: <input type="text" name='deliveryAddress' value={form.deliveryAddress} onChange={handleChange}/><br/><br/>
        orderStatus: <input type="text" name='orderStatus' value={form.orderStatus} onChange={handleChange}/>
      <button>{acceptEdit ? "Update Shopping " : "Add Shopping"}</button>
      </form>
    </div>
  )
}

export default ShoppingForm
