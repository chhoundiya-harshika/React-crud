import React, { useState } from 'react'
import ShowShopping from '../ShowShopping'
import ShoppingForm from './ShoppingForm'

const App = () => {
  const [ref, setRef]= useState(0)
  const [edit, setEdit]=useState(null)
  return (
    <div>
      <h2></h2>
      <ShoppingForm added={()=>{setRef(ref+1),setEdit(null)}} acceptEdit={edit}/>
      <ShowShopping refresh ={ref} updateShopping={(shop)=>{
        setEdit(shop)}}/>
    </div>
  )
}

export default App
