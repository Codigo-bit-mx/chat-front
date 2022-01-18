import {
    REGISTRO_EXITOSO,
    LOGIN_EXITOSO,
    USUARIO_AUTENTICADO,
    ACTUALIZACION_DATOS_USUARIO,
    CERRAR_SESION,
    ALARMA,
    MSG_ERROR,
    LIMPIAR_MSG_ERROR,
    LIMPIAR_MSG_CORRECTO
    } from '../../types/index';


const authReducer = ( state, action ) => {
    switch(action.type){

        case REGISTRO_EXITOSO: 
         case LOGIN_EXITOSO:
            return{
                ...state,
                token: localStorage.getItem('token'),
                autenticacion: true,
                usuario: action.payload.usuario
            }

        case USUARIO_AUTENTICADO:
            return{
                ...state,
                autenticacion: true,
                usuario: action.payload
            }

        case ACTUALIZACION_DATOS_USUARIO: 
            return{
                ...state,
                alarma: true,
                cambios: true,
                msgcorrecto: action.payload
            }   
        
        case ALARMA: 
            return{
                ...state,
                alarma: false,
                cambios: false
            }

        case CERRAR_SESION:
            return{
                ...state,
                token: localStorage.removeItem('token'),
                autenticacion: false,
                usuario: []
            }

        case LIMPIAR_MSG_CORRECTO:
            return{
                ...state,
                msgcorrecto: ''
            }

        case MSG_ERROR:
            return {
                ...state,
                msgerror: action.payload
            }

        case LIMPIAR_MSG_ERROR:
            return {
                ...state,
                msgerror: ''
            }

       default:
            return state;
        }
}



export default authReducer;