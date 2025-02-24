import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    payments: [],
    payment: null,
    totalPayments: 0,
    loading: false,
    error: null,
    bruteGains: 0,
    expiredPayments: 0,
    netGains: 0,
}

const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        setPayments: (state, action) => {
            
                state.payments =[

                    ...action.payload,
                ]
            
        },
        setPayment: (state, action) => {
            state.payment = action.payload;
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
        updatePayment   : (state, action) => {
            console.log(action.payload.payment)
            state.payments = state.payments.map(payment => payment.id === action.payload.id ? action.payload.payment : payment);
        },
        deletePayment: (state, action) => {
            state.payments = state.payments.filter(payment => payment.id !== action.payload);
        },
        setBruteGains: (state, action) => {
            state.bruteGains = action.payload;
        },
        setExpiredPayments: (state, action) => {
            state.expiredPayments = action.payload;
        },
        setNetGains: (state, action) => {
            state.netGains = action.payload;
        },
    },
})  

export const {deletePayment, setPayments, setTotalPayments, setLoading, setError, updatePayment, setBruteGains, setExpiredPayments, setNetGains } = paymentsSlice.actions;
export default paymentsSlice.reducer;
