import React from 'react';
import '../styles/globals.css'
import AuthState from '../context/auth/authState';
import SocketState from '../context/socket/socketState';
import ChatState from '../context/chat/chatState';
import moment from 'moment';
import styled from 'styled-components/macro';
import 'moment/locale/es';
moment.locale('es');


function MyApp({ Component, pageProps }) {

  return (
  <AuthState>
    <ChatState>
    <SocketState> 
    
  <Component {...pageProps} />
    
   </SocketState> 
   </ChatState>
  </AuthState>
  
  )
}

export default MyApp
