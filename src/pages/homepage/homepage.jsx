import axios from 'axios';
import "./homepage.css"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, userVal } from '../../redux/userSlice';
import Blog from '../../components/blog/blog';

const Homepage = () => {
    const dispatch=useDispatch();
    const authToken=useSelector(state=>state.user.authToken);
    const userInfo=useSelector((state=>state.user))
   
    const handleLogout = e=>{
        e.preventDefault();
        dispatch(logout())
        window.location.href="/"
    }
    const userDetail=async()=>{
        const res=await axios.get("https://api-staging-v2.sploot.space/api/v2/user",{
            headers:{authorization:"Bearer "+authToken}
          }
            
          )
      
          const userval=res.data.data.data
          
          dispatch(userVal({userval}));   
    }
 
   

  useEffect(()=>{
    userDetail();
    
    
  },[])
  return (
    <>

<div className='headerBlog'>
<img style={{width:'50px'}} src={userInfo.imgurl} />

<p className='username'>Hello, {userInfo.username}</p>
<button onClick={handleLogout} className='logoutbtn'>Logout</button>
</div>
    <div>
      <Blog />
    </div>

    </>
  )
}

export default Homepage