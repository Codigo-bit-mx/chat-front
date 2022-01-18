import React, { useContext } from 'react';
import styled      from 'styled-components';
import chatContext from '../../context/chat/chatContext';
import authContext from '../../context/auth/authContext';
import FormMensaje from './formMensaje';
import MsgInput    from './msgInput';
import MsgOut      from './msgOut';

const ContenedorMensaje = styled.div`
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;

    ::-webkit-scrollbar {
    -webkit-appearance: none;
    }

    ::-webkit-scrollbar:vertical {
    width:4px; 

    @media(min-width: 768px){
        width: 7px;
    }
    }

    /* ::-webkit-scrollbar-button: increment; */
    
    ::-webkit-scrollbar-button {
    display: none;
    }

    ::-webkit-scrollbar-thumb {
    background-color: #204289;
    border-radius: 20px;
    /* border: 1px solid #f1f2f3; */
    }

    ::-webkit-scrollbar-track {
    border-radius: 10px;  
    }
`;

const Ul = styled.ul`
    padding: 0em 1em;
    list-style: none;
    height: 100vh;

    @media(min-width: 768px){
        padding: 0em 4em;
    }
`;


const Mensajes = () => {

    const chat = useContext(chatContext);
    const { mensajes, menu, chatActivo } = chat;
    const auth = useContext(authContext);
    const { usuario } = auth; 
    
    return ( 

        <ContenedorMensaje>
         <div>
            <Ul>
            
            {mensajes.map( msg => (
            
                ( msg.para === usuario.uid )
                
                ?
              
                <MsgInput 
                    key={msg._id}
                    msg={msg}
                />
                :
                <MsgOut 
                    key={msg._id}
                    msg={msg}
                />
            )
            )}                       
            </Ul> 
            <FormMensaje />
         </div>
        </ContenedorMensaje>

     );
}
 
export default Mensajes;