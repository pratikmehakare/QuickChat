import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    _id:"",
    name:"",
    email:"",
    token:"",
    onlineUser:[],
    socketConnection: null
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser : (state,action)=>{
            state._id= action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
        },
        setToken : (state,action) =>{
            state.token = action.payload
        },
        logout : (state,action) =>{
            state._id= ""
            state.name = ""
            state.email = ""
            state.token = ""   
            state.socketConnection = "" 
        },
        setOnlineUser : (state,action)=>{
            state.onlineUser = action.payload
        },
        setSocketConnection : (state,action) =>{
            state.socketConnection = action.payload
        }
    }
})

export const {setToken,setUser,logout,setOnlineUser,setSocketConnection} = userSlice.actions
export default userSlice.reducer