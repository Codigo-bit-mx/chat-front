import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import AuthContext from '../context/auth/authContext';
//componentes
import Login from '../components/login/Login';

const Home = () => {
  
  const authContext = useContext(AuthContext);
  const {autenticado, usuarioAutenticado} = authContext;

  return (
  
    <>
      <Layout>
         
        <Login />
    
      </Layout>
    </>
   )
}


export default Home;