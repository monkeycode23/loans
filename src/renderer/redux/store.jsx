import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/users';
import authReducer from './reducers/auth';
import clientsReducer from './reducers/clients';
import loansReducer from './reducers/loans';
import paymentsReducer from './reducers/payments';
import paginationReducer from './reducers/Pagination';
import gainsReducer from './reducers/gains';
const rootReducer = {
    users: usersReducer,
    auth: authReducer,  
    clients: clientsReducer,
    loans: loansReducer,
    payments: paymentsReducer,
    pagination: paginationReducer,
    gains: gainsReducer,
};

export const store = configureStore({   
    reducer: rootReducer,
});

export default store;