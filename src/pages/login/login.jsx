import React, { useRef, useState } from 'react'
import "./login.css"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/userSlice'

const Login = () => {
    const emailRef=useRef();
    const passwordRef=useRef();
    const authToken=useSelector((state)=>state.user.authToken)
    const dispatch=useDispatch();
    const [err,setErr]=useState(false);
     

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{

            const res=await axios.post("https://api-staging-v2.sploot.space/api/v2/auth/signin",{
                username:emailRef.current.value,
                password:passwordRef.current.value
            })
            
            const token=res.data.data.data.authToken
            
             dispatch(login({token}))
            
            

        }catch(err){
            setErr(true);
        }
        
    }

  return (
    <div className='formdiv'>
    <h2>Hey Sploot!!</h2>
        <form onSubmit={handleSubmit} className="formLogin">
            <label>Email</label>
            <input type="email" name="email" required="true" ref={emailRef}></input>
            <label>Password</label>
            <input type="password" name="password" required="true" ref={passwordRef}></input>
            <button type="submit" className='loginbtn'>login</button>
        <p>{authToken}</p>
        </form>
        {err &&
        <p className='errMess'> There's been an error, try again</p>
        }
   
    </div>
  )
}

export default Login