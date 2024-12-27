import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo:(state,action)=>{
            state.user = action.payload
        },

        setIsAuthenticated:(state,action)=>{
            state.isAuthenticated = action.payload
        },
       
        clearUserInfo: (state,action)=>{

        }
    }
})

export const {setUserInfo,clearUserInfo,setIsAuthenticated} = authSlice.actions
export default authSlice.reducer