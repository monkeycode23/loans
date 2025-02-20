import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    payments: [],
    totalPayments: 0,
    loading: false,
    error: null,
}

const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        setPayments: (state, action) => {
            state.payments = action.payload;
        },
        setTotalPayments: (state, action) => {
            state.totalPayments = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },  
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
})  

export const { setPayments, setTotalPayments, setLoading, setError } = paymentsSlice.actions;
export default paymentsSlice.reducer;
