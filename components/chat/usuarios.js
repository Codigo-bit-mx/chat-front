import React, { useContext } from 'react';
import styled                from 'styled-components';
import chatContext           from '../../context/chat/chatContext';
import Image from 'next/image';

const ConUsuarios = styled.div`
    width: 100%;
    p{
        margin-left: 10px;
        color: white;
    }
`;

const Ul = styled.ul`
    margin: 2em 0;
    padding: 0;
    list-style: none;
`;

const Li = styled.li`
    margin: 13px 0;
    padding: 0;
    display: grid;
    grid-template-columns: 20% 80%;
    cursor: pointer;

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
    p{
        margin-left: 10px;  
        color: white;
        font-family: 'Poppins', sans-serif;
        font-size: 13px;
    }
    span{
        width: 100%;
        text-align: center;
        color: white;
        font-size: 11px;
        font-weight: 400;
        font-family: 'Poppins', sans-serif;
    }
`;

const Usuarios = ({usuario}) => {
    
    console.log(usuario)

    const chat = useContext(chatContext);
    const { chaACTIVO } = chat;
    
    const onClick = (uid) => {
        chaACTIVO(uid);
    }

   
    return ( 

        <ConUsuarios>
         
            <Ul>
                <Li onClick={() => onClick(usuario.uid)}>
                 
                 {usuario.img.length > 0 && ( 
                    //  <Image src={ usuario.img ? (usuario.img) : ("/usuario.jpg") }  alt="imagen de usuario" /> 
                     <img src={ usuario.img } alt="imagen de usuario" /> 
                  )}
            
                    <p> {usuario.nombre} </p>
                <div>
                    <span>   
                        {usuario.online ? ("linea") : ("Desconectado")}
                    </span>    
                </div>
                </Li>
            </Ul>
        
        </ConUsuarios>
     );
}
 
export default Usuarios;