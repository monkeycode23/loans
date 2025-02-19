import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/users';
import authReducer from './reducers/auth';


const rootReducer = {
    users: usersReducer,
    auth: authReducer,
};

export const store = configureStore({   
    reducer: rootReducer,
});

export default store;