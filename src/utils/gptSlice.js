import { createSlice } from "@reduxjs/toolkit";


const gptSlice = createSlice({
    name:"gpt",
    initialState:{
        GptSearchView:false,
        language:'en',
        gptSearchPlaceholder: "What would you like to watch today, Confused? Ask GPT!",
        search: "Search",  
        MovieResult:null,
        MovieName:null,



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
          addGptMovie:(state,action)=>{
            const { MovieName, MovieResult } = action.payload;   
            state.MovieName = MovieName;
            state.MovieResult = MovieResult;


          }
    }
})

export const {toggleGptSearchView,setlanguage,addGptMovie} =gptSlice.actions
export default gptSlice.reducer;

