import React, { useEffect, useState } from 'react'
import axios from 'axios'

const LoginForm = () => {
    const [alllogin, setLogin]=useState([])
    const [isLogin, setIsLogin]= useState(null)

    const [form, setForm]=useState({email:'', mobile:''})

    const loadAllLogin=async()=>{
        const {data}= await axios.get(`http://localhost:3000/login`)
        setLogin(data)
    }
    useEffect(()=>{
        loadAllLogin();
    },[])

    const handleChange=async(e)=>{
        const {name,value}=e.target;
        setForm({...form, [name]:value})

    }

    const handleSubmit=async(e)=>{
        e.preventDefault();

        const userFound =alllogin.find((u)=>u.email == form.email || u.mobile == form.email)

        if(userFound){
            if(userFound.password == form.password){
                setIsLogin(userFound.role)
            }else{
                alert('password is incorrect')
            }
        }else{
            alert('User does not exist')
        }
        setForm({ email: '', password:''})
    }

  return (
    <div>
        {
            isLogin ?(
                <>
                <button onClick={()=>setIsLogin(null)}>Log Out</button>
                </>
            )
        :
        (
        <>
        <h2>Fill Login Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" value={form.email} onChange={handleChange} placeholder='Enter email or mobile' required/><br /><br />
        <input type="text" name="password" value={form.password} onChange={handleChange} placeholder='Enter password' required/><br /><br />

        <button type='submit'>Login</button>
      </form>
    </>
        )
    }
    <br /> <br />
    {
        isLogin &&(
         <>
      <center>
        
        <table border={2}>
            <thead>
                <tr>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>MOBILE</th>{
                        isLogin=='admin'&&(
                            <>
                            <th>PASSWORD</th>
                            <th>ROLE</th>
                            <th>ACTION</th>
                            </>
                        )
                    }
                   
                </tr>
            </thead>
            <tbody>
                {
                    alllogin.map((u)=>(
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.eamil}</td>
                            <td>{u.role}</td>
                            <td>
                                <button>Delete</button>{" "}
                                <button>Update</button>
                            </td>
                        </tr>
                    )     
                    )
                }
            </tbody>
        </table>
       
    
      </center>
       </>
        )}
    </div>
  )
}

export default LoginForm
