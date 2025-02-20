import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/users';
import authReducer from './reducers/auth';
import clientsReducer from './reducers/clients';
import loansReducer from './reducers/loans';
import paymentsReducer from './reducers/payments';

const rootReducer = {
    users: usersReducer,
    auth: authReducer,  
    clients: clientsReducer,
    loans: loansReducer,
    payments: paymentsReducer,
};

export const store = configureStore({   
    reducer: rootReducer,
});

export default store;