import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    clients: [],
    totalClients: 0,
    loading: false,
    error: null,
}

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setClients: (state, action) => {
            state.clients = action.payload;
        },
        setTotalClients: (state, action) => {
            state.totalClients = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },  
        setError: (state, action) => {  
            state.error = action.payload;
        },
    },
})

export const { setClients, setTotalClients, setLoading, setError } = clientsSlice.actions;
export default clientsSlice.reducer;
