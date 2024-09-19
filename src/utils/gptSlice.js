import { createSlice } from "@reduxjs/toolkit";


const gptSlice = createSlice({
    name:"gpt",
    initialState:{
        GptSearchView:false,
        language:'en',
        gptSearchPlaceholder: "What would you like to watch today, Confused? Ask GPT!",
        search: "Search",  

    },
    reducers:{
        toggleGptSearchView:(state,action)=>{
            state.GptSearchView = !state.GptSearchView
        },
        setlanguage: (state, action) => {
            const { language, placeholder } = action.payload;
            state.search = action.payload.search;
            state.language = language;
            state.gptSearchPlaceholder = placeholder;
          },
    }
})

export const {toggleGptSearchView,setlanguage} =gptSlice.actions
export default gptSlice.reducer;
