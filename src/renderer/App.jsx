import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import DefaultLayout from './layouts/DefaultLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Error404 from './pages/error/404';


function App() {

 
  async function createUser(){
   // const user = await window.database.models.Users.createUser({username: "Juan", email: "juan@gmail.com", password: "123456"});
  }

 
  return (
    <Routes>
      <Route path="/auth" >
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
      <Route path="/" element={<PrivateRoute><DefaultLayout/></PrivateRoute>} >
        <Route index path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
      </Route>

      <Route path="*" element={<Error404 />} />
     
    </Routes>
  );
}

export default App;