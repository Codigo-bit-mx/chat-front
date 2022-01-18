import React, { useContext } from 'react';
import styled from 'styled-components';
import { horaMes } from '../../helpers/horaMes';
import chatContext from '../../context/chat/chatContext';
import Image       from 'next/image';


const Li = styled.li`
    margin: 1em 0;
    display: grid;
    grid-template-columns: 10% 90%;
    text-align: left;


    @media(min-width: 768px){
        grid-template-columns: 5% 90%;
    }

    img{
        margin: 8px 0 0 0;
        width: 20px;
        height: 20px;
        border-radius: 22px;
    }
`;

const Persona = styled.p`
    margin: 5px 1em;
    color: #828282;
    font-size: 8px;
    font-weight: bold;

    @media(min-width: 768px){
        font-size: 12px;
    }
`;

const Mensaje = styled.p`
    color: #E0E0E0;
    font-size: 12px;
    font-family: 'Poppins', sans-serif;
    padding: 0 2em;
    @media(min-width: 768px){
        font-size: 14px;
    }
`;

const MsgOut = ({msg}) => {

    const chat = useContext(chatContext);
    const { menu } = chat
    const {nombre, mensaje, img} = msg;

    return ( 
        <Li
            menu={menu}
        >
            <div>
            <Image src={img ? (img) : ("/usuario.jpg") } alt="img" />
            </div>
            
            <div>
            <Mensaje> {mensaje} </Mensaje> 
            <Persona> {nombre} <span>{ horaMes(msg.createdAt) }</span> </Persona>
            </div>
      
        </Li> 
     );
}
 
export default MsgOut;