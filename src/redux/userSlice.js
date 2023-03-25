import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user", //name of the store
    initialState:{
        authToken:"" || localStorage.getItem('jwt'),
        username:"",
        imgurl:""
    },
    reducers:{
        login: (state,action)=>{
              state.authToken=action.payload.token
              localStorage.setItem('jwt',action.payload.token)
         
        },
        userVal: (state,action)=>{
        
            state.username=action.payload.userval.name
            state.imgurl=action.payload.userval.photoUrl
       
      },
        logout: (state)=>{
            localStorage.removeItem('jwt')
        }
    }
})

export const {login,logout,userVal} =userSlice.actions;
export default userSlice.reducer;