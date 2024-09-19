import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name:"config",
    initialState:{
        example:null,
    },
    reducers:{
        checkExample:(state,action)=>{
            state.example= action.payload
        }
    }
})


export const {checkExample} = configSlice.actions
export default configSlice.reducer