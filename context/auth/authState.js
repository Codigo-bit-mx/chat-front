import React, {useReducer} from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import authToken from '../../config/authToken';

import {
    REGISTRO_EXITOSO,
    LOGIN_EXITOSO,
    USUARIO_AUTENTICADO,
    CERRAR_SESION,
    ACTUALIZACION_DATOS_USUARIO,
    ALARMA,
    LIMPIAR_MSG_CORRECTO,
    MSG_ERROR,
    LIMPIAR_MSG_ERROR
} from '../../types/index';

import clienteAxios from "../../config/axios";


const AuthState = ({children}) => {

  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : '', 
    autenticacion: false,
    usuario: [],
    alarma: false,
    msgcorrecto: '',
    msgerror: ''
  }

  const [ state, dispatch ] = useReducer(authReducer, initialState);

  const iniciarSesion = async (datos) => {
      try {
        const resultado = await clienteAxios.post('api/login', datos);
        localStorage.setItem('token', resultado.data.token);
        dispatch({
          type: LOGIN_EXITOSO,
          payload: resultado.data
        })
      } catch (error) {
  
        dispatch({
          type: MSG_ERROR,
          payload: error.response.data.msg
        })

        setTimeout(() => {
          dispatch({
            type: LIMPIAR_MSG_ERROR,
          })
        }, 3000)    
    }
  }

  const usuarioAutenticado = async() =>{
    const token = localStorage.getItem('token');
    if(token){
      authToken(token);
    }
    try {
      const resultado = await clienteAxios.get('/api/login/renew');
      dispatch({
        type: USUARIO_AUTENTICADO,
        payload: resultado.data.usuario
      })
    } catch (error) {
      dispatch({
        type: MSG_ERROR,
        payload: error.response.data.msg
      })
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_MSG_ERROR,
        })
      }, 3000)   
    }
  }

  const registroUsuario = async (datos) => {
    
    try {
      const resultado = await clienteAxios.post('/api/login/new', datos);
      console.log(resultado)
      localStorage.setItem('token', resultado.data.token);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: resultado.data  
      })
    } catch (error) {
      dispatch({
        type: MSG_ERROR,
        payload: error.response.data.msg
      })
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_MSG_ERROR,
        })
      }, 3000)   
  }
  }

  const actualizarDatos = async (id, imguser, newDate) => { 

    try {
      
      if(imguser.name !== undefined){
        actualizarIMG(id, imguser);
      }
      const respuesta = await clienteAxios.put(`/api/login/edit/${id}`, newDate); 
      dispatch({
        type: ACTUALIZACION_DATOS_USUARIO,  
        payload: respuesta.data.msg  
      })

      setTimeout(() => {
        dispatch({
          type: ALARMA
        })

        dispatch({
          type: LIMPIAR_MSG_CORRECTO
        })
      }, 3000)

    } catch (error) {
      dispatch({
        type: MSG_ERROR,
        payload: error.response.data.msg
      })
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_MSG_ERROR,
        })
      }, 3000)   
    }
  }


  const actualizarIMG = async (id, imguser) => {
      
      try {
        const form = new FormData();
        form.append('archivo', imguser);
        await clienteAxios.put(`/api/login/edit/img/${id}`, form);
      } catch (error) {
        console.log("error");
      }
  }

  const mostrarAlerta = (msg) => {
    
      dispatch({
        type: MSG_ERROR,
        payload: msg
      })

      setTimeout(() => {
        dispatch({
          type: LIMPIAR_MSG_ERROR,
        })
      }, 2000)
  
    }

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }


  return(
    <authContext.Provider
        value={{
            usuario: state.usuario,
            autenticacion: state.autenticacion,
            token: state.token,
            alarma: state.alarma,
            msgcorrecto: state.msgcorrecto,
            msgerror: state.msgerror,
            iniciarSesion,
            registroUsuario,
            usuarioAutenticado,
            cerrarSesion,
            actualizarDatos,
            mostrarAlerta
        }}
    >
        {children}
    </authContext.Provider>    
  );
}


export default AuthState;
