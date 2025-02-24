import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    page: 1,
    limit: 1,
    totalPages: 1,
    search: "",
    count: 0,
    totalResults: 0,
    
    
   
}

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setLimit: (state, action) => {
            state.limit = action.payload;
        },  
      setTotalPages: (state, action) => {
        state.totalPages = action.payload;
      },
      setSearch: (state, action) => {
        state.search = action.payload;
      },
      setCount: (state, action) => {
        state.count = action.payload;
      },
      setTotalResults: (state, action) => {
        state.totalResults = action.payload;
      },
       
    
       
    },
})

export const {  setPage, setLimit, setTotalPages, setSearch, setCount, setTotalResults } = paginationSlice.actions;
export default paginationSlice.reducer;      


