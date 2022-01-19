import React       from 'react';
import styled      from 'styled-components';
import Image       from 'next/image';
import { horaMes } from '../../helpers/horaMes';

const Li = styled.li`
    margin: 1em 0;
    display: grid;
    grid-template-columns: 95% 5%;
    text-align: right;

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
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    @media(min-width: 768px){
        font-size: 12px;
    }
`;

const Mensaje = styled.p`
    color: #E0E0E0;
    padding: 0 2em;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;

    @media(min-width: 768px){
        font-size: 14px;
    }
`;

const MsgInput = ({msg}) => {

    const {nombre, mensaje, img} = msg;
       
    return ( 

    <Li>
        
        <div>
        <Mensaje> {mensaje} </Mensaje> 
        <Persona>{nombre} <span> { horaMes(msg.createdAt) }</span> </Persona>
        </div>
        <div>
        <img src={img ? (img) : ("/usuario.jpg") } alt="img" />
        </div>
    </Li> 

     );
}
 
export default MsgInput;