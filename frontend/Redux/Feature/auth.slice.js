import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    key: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo:(state,action)=>{
            state.user = action.payload.user
            state.key = action.payload.jwt_key 
        },
       
        clearUserInfo: (state,action)=>{
            state.key = null
            state.user = null
        }
    }
})

export const {setUserInfo,clearUserInfo} = authSlice.actions
export default authSlice.reducer