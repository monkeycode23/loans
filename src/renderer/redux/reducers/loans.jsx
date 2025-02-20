import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loans: [],
    totalLoans: 0,
    payments: [],
    monthly: 0,
    loansTotalAmount: 0,
    paymentsTotalAmount: 0,
    loading: false,
    error: null,
}

const loansSlice = createSlice({
    name: 'loans',
    initialState,
    reducers: {
        setLoans: (state, action) => {
            state.loans = action.payload;
        },
        setTotalLoans: (state, action) => {
            state.totalLoans = action.payload;
        },  
        setPayments: (state, action) => {   
            state.payments = action.payload;
        },
        setMonthly: (state, action) => {
            state.monthly = action.payload;
        },  
        setLoansTotalAmount: (state, action) => {   
            state.loansTotalAmount = action.payload;
        },
        setPaymentsTotalAmount: (state, action) => {
            state.paymentsTotalAmount = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
})

export const { setLoans, setTotalLoans, setPayments, setMonthly, setLoansTotalAmount, setPaymentsTotalAmount, setLoading, setError } = loansSlice.actions;
export default loansSlice.reducer;      


