import React, { useContext, useState } from 'react';
import styled        from 'styled-components';
import SocketContext from '../../context/socket/socketContext';
import authContext   from '../../context/auth/authContext';
import chatContext   from '../../context/chat/chatContext';
import { MdSend }    from 'react-icons/md';  

const ContenedorForm = styled.div`
    display: grid;
    grid-template-columns: 85% 15%; 
    padding: 0 1em;
    background-color: #20272c;
`;

const ContenedorInput = styled.div`
    width: 100%;
    margin: 15px 0;
`;

const Input = styled.input`
    background-color: #3c3c3c;
    width: 100%;
    height: 50px;
    padding: 5px;
    color: white;
    border: none;
    border-radius: 10px;
    margin: 0;
    outline: none;
    font-family: 'Poppins',sans-serif;
`;

const ContenedorBTN = styled.div`
    margin: 14px 0;
    padding: 0em 1em 0 0;

    @media(min-width: 768px){
        margin: 14px 0;
    }
`;

const BTN = styled.button`
    color: white;
    background-color: #4a69ab;
    border: none;
    border-radius: 8px;
    padding: 6px 6px;
    margin: 0 0 0 3px;

    @media(min-width: 768px){
        padding: 6px 11px;
    }
`;


const FormMensaje = () => {

    const socketContext = useContext(SocketContext);
    const {socket} = socketContext;
    const auth = useContext(authContext);
    const {usuario} = auth;
    const chat = useContext(chatContext);
    const {chatactivo} = chat;

    const [mensaje, setMensaje] = useState(''); 

    const onchange = ({target}) => {
        setMensaje( target.value )
    }

    const envioMensaje = (e) => {
        e.preventDefault();
        if(mensaje.length === 0 ){
            return
        }
        
        //TODO: Emitir un evento de sockets para enviar el mensaje
        // {
            // de: UID del usuario enviando el mensaje
            // para: UID del usuario que recibe el mensaje
            // mensaje: lo que quiero enviar 
        // }

        socket.emit( 'mensaje-personal', {
            de: usuario.uid,
            para: chatactivo,
            mensaje,
            nombre: usuario.nombre,
            img: usuario.img
        })
        setMensaje('');
    }

    return ( 

        <form>
            <ContenedorForm>
               
            <ContenedorInput> 
                <Input 
                type= "text"
                autoComplete="off"
                placeholder="Escribe tu mensaje"
                name="mensaje"
                value={mensaje}
                onChange={onchange}
                />
            </ContenedorInput>

            <ContenedorBTN>
                <BTN type="submit" onClick={envioMensaje}>  <MdSend /> </BTN>            
            </ContenedorBTN>
            
            </ContenedorForm>
        </form>



     );
}
 
export default FormMensaje;