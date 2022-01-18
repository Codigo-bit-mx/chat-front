import React, {useReducer} from 'react';
import chatContext from './chatContext';
import chatReducer from './chatReducer';
import authToken from '../../config/authToken';

import {
  TODOS_LOS_USUARIOS,
  CHAT_ACTIVO,
  NUEVO_MENSAJE,
  OBTENER_MENSAJES,
  APERTURA_CIERRE_MENU,
  CAMBIOS_PERFIL
} from '../../types/index';
import clienteAxios from '../../config/axios';


const ChatState = ({children}) => {

    const initialState = {
        uid: '',
        chatactivo: null, //uid usuario al que yo quiero enviar mensaje
        usuarios: [], // todos los usuarios de la base de datos
        mensajes: [], //el chat seleccionado
        menu: true
      }

    const [ state, dispatch ] = useReducer(chatReducer, initialState);

    //funciones 
    const obtenerUsuarios = (datos) => {
        dispatch({
          type: TODOS_LOS_USUARIOS,
          payload: datos
        })
    }

    const nuevoMensajes = (mensaje) => {
      dispatch({
        type: NUEVO_MENSAJE,
        payload: mensaje
      })
    }

    const chaACTIVO = async (uid) => {

      const token = localStorage.getItem('token');
      if(token){
        authToken(token);
      }
      dispatch({
        type: CHAT_ACTIVO,
        payload: uid
      })
      try {
       const respuesta = await clienteAxios.get(`/api/mensajes/${uid}`); 
       dispatch({
          type: OBTENER_MENSAJES,
          payload: respuesta.data.mensajes
        })

      } catch (error) {
        console.log(error);
      }

    }

    const interactive = () => {
      dispatch({
        type: 'APERTURA_CIERRE_MENU'
      })
    }

    return (
      <chatContext.Provider
            value={{
              usuarios: state.usuarios,
              chatactivo: state.chatactivo,
              mensajes: state.mensajes,
              menu: state.menu,
              obtenerUsuarios,
              chaACTIVO,
              nuevoMensajes,
              interactive
            }}
        >
          {children}
      </chatContext.Provider>
   )
};

export default ChatState;

