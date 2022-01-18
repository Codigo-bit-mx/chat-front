import React, { useContext, useEffect } from 'react';
import SocketContext from './socketContext';
import AuthContext from '../auth/authContext';
import chatContext from '../chat/chatContext';
import useSocket from '../../hooks/useSocket';

const SocketState = ( {children} ) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket(process.env.socket);

    const authContext = useContext(AuthContext);
    const { alarma, autenticacion } = authContext;
    console.log(alarma)
    const chat = useContext(chatContext);
    const {obtenerUsuarios, nuevoMensajes} = chat;
   
    useEffect(() => {
        if(autenticacion){
            conectarSocket()
        }
    }, [autenticacion, conectarSocket]);

    useEffect(() => {
      if(!autenticacion){
          desconectarSocket()
      }
    }, [autenticacion, desconectarSocket]);

    useEffect(() => {
        socket?.on('lista-usuarios', (usuarios) => {
            obtenerUsuarios(usuarios);
        });
    }, [socket, alarma]);

    useEffect(() => {
        socket?.on('mensaje-personal', (mensaje) => {
            nuevoMensajes(mensaje);
        });
    }, [socket]);

    return(

        <SocketContext.Provider 
        value={{
            socket,
            online
        }}>
            { children }
        </SocketContext.Provider >
    )
}

export default SocketState;