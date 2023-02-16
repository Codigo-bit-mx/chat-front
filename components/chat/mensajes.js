import React, { useContext } from 'react';
import styled      from 'styled-components';
import chatContext from '../../context/chat/chatContext';
import authContext from '../../context/auth/authContext';
import FormMensaje from './formMensaje';
import MsgInput    from './msgInput';
import MsgOut      from './msgOut';


const Mensajes = () => {

    const chat = useContext(chatContext);
    const { mensajes, menu, chatActivo, usuarioactivo } = chat;
    const auth = useContext(authContext);
    const { usuario } = auth; 


    return ( 

        <ContenedorMensaje>
       
            <Ul>

            <ContenedorTitulo>
                <img src={usuarioactivo.img} />
                <p>{`Chat con ${usuarioactivo.nombre}`}</p>
            </ContenedorTitulo>

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
        
        </ContenedorMensaje>

     );
}
 
export default Mensajes;

const ContenedorMensaje = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #000;

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
    height: 100%;

    @media(min-width: 768px){
        padding: 0em 4em;
    }
    p{
        color: white;
    }
`;

const ContenedorTitulo = styled.div`
 display: flex;
 align-items:center;
 p{
    margin-left: 10px;
    font-size: 13px;
    font-family: 'Poppins', sans-serif;
 } 
 img{
    width: 35px;
    height: 35px;
    border-radius: 10px;

    @media(min-width: 768px){
     width: 35px;
     height: 35px;
     border-radius: 10px;
    }
 }
`;