import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    category:[]
}

const categorySlice = createSlice({
    name: "Category",
    initialState,
    reducers: {
        setCategory: (state,action)=>{
            state.category.push(action.payload)
        },
        clearCategory:(state,action)=>{
            state.category = []
        }
    }
})

export const {setCategory,clearCategory} = categorySlice.actions
export default categorySlice.reducer