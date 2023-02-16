import React, { useContext } from 'react';
import styled                from 'styled-components';
import chatContext           from '../../context/chat/chatContext';
import Image from 'next/image';
import { VscCircleFilled } from "react-icons/vsc";


const Usuarios = ({usuario}) => {

    const chat = useContext(chatContext);
    const { chaACTIVO, usuarioActivo } = chat;
    const online = usuario.online;

    const onClick = ({uid, nombre, img}) => {
         chaACTIVO(uid);
         usuarioActivo({nombre, img})
    }

    return ( 

        <ConUsuarios>
         
            <Ul>
                <Li online={online} onClick={() => onClick(usuario)}>
                 <ContenedorOnline>
                 {usuario.img.length > 0 && ( 
                    //  <Image src={ usuario.img ? (usuario.img) : ("/usuario.jpg") }  alt="imagen de usuario" /> 
                     <img src={ usuario.img } alt="imagen de usuario" /> 
                  )}
            
                    <ParrafoGeneral> {usuario.nombre} </ParrafoGeneral>
                 </ContenedorOnline>
                <ContenedorOnline>

                    <i> <VscCircleFilled /> </i>
                   
                    <span>   
                        {online ? ("en linea") : ("Desconectado")}
                    </span>    
                </ContenedorOnline>
                
                </Li>

            </Ul>
        
        </ConUsuarios>
     );
}
 
export default Usuarios;


const ConUsuarios = styled.div`
    width: 100%;
    p{
        margin-left: 10px;
    }
`;

const Ul = styled.ul`
    margin: 2em 0;
    padding: 0;
    list-style: none;
`;

const Li = styled.li`
    display: grid; 
    grid-template-columns: 1fr; 
    grid-template-rows: 1fr 1fr; 
    margin: 13px 0;
    padding: 0;
    cursor: pointer;
    justify-content: center;
    align-items: center;

    img{
       width: 25px;
       height: 25px;
       border-radius: 10px;

       @media(min-width: 768px){
        width: 35px;
        height: 35px;
        border-radius: 10px;
       }
    }
    i{  
        // display:flex;
        // align-items:center;
        margin: 0 3px 0 3px; 
        color: ${({online}) => online ? 'green' : 'red'};
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
    }
    span{
        width: 100%;
        color: white;
        font-size: 11px;
        font-weight: 400;
        font-family: 'Poppins', sans-serif;
    }
`;
const ParrafoGeneral = styled.p`
    margin-left: 10px;  
    color: white;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
`;

const ContenedorOnline = styled.div`
    display: flex;
`;