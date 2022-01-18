import {
    TODOS_LOS_USUARIOS,
    CHAT_ACTIVO,
    NUEVO_MENSAJE,
    OBTENER_MENSAJES,
    APERTURA_CIERRE_MENU
} from '../../types/index';


const chatReducer = (state, action) => {
    switch(action.type) {

        case TODOS_LOS_USUARIOS:
        return{
            ...state,
            usuarios: action.payload
        }   

        case CHAT_ACTIVO: 
            if( state.chatactivo === action.payload) return state;
        return{
            ...state,
            chatactivo: action.payload,
            mensajes: []
        }
        
        case NUEVO_MENSAJE:
        if( state.chatactivo === action.payload.de ||
            state.chatactivo === action.payload.para ) {
            return{
                ...state,
                mensajes: [...state.mensajes, action.payload]
            }
        }else{
            return state;
        }

        case OBTENER_MENSAJES:
            return{
                ...state,
                mensajes: action.payload
            }

        case APERTURA_CIERRE_MENU: 
             return{
                 ...state,
                 menu: !state.menu
             }
        
        default:
           return state;
    }
}


export default chatReducer;