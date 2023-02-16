import React, {useContext, useState, useEffect} from 'react';
import styled              from 'styled-components';
import { AiFillCaretDown } from "react-icons/ai";
import AuthContext         from '../context/auth/authContext';
import chatContext         from '../context/chat/chatContext';
import { useRouter }       from 'next/router';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';


const Header = () => {
    
    const router = new useRouter();

    const authContext = useContext( AuthContext );
    const { usuario, alarma, usuarioAutenticado, cerrarSesion } = authContext; 
    const statechat = useContext(chatContext);
    const { interactive, cierreSessionChat, usuarioactivo } = statechat;

    const {nombre, img} = usuario;
    const [apertura, setApertura] = useState(false);

    const menu = () => {
        setApertura(
            !apertura
        );
    }

    useEffect(() => {
     if(alarma){
        usuarioAutenticado()
    }
    //eslint-disable-next-line
    }, [alarma]);
    
    const perfil = () => {
        router.push('/perfil');
    }

    const chat = () => {
        router.push('/chat');
    }

    const salida = () => {
        cerrarSesion()
        cierreSessionChat()
    }


    return ( 
        <ContenedorHeader>
            <MarcoHeader>

                <MarcoSlide>
                    <img src={img} />
                    <h4 onClick={ () => chat() }>Hola, {nombre}</h4>
                </MarcoSlide>
             

            { usuarioactivo.nombre && usuarioactivo.img ? (
                <ContenedorTitulo>
                <img src={usuarioactivo.img} />
                <p>{`Chat con ${usuarioactivo.nombre}`}</p>
                </ContenedorTitulo>
            ) : <div></div>}

               <MarcoBienvenida>
                    <ParrafoContenedor onClick={ () => interactive ()}> <MdOutlineArrowBackIosNew /> <span>Contactos</span> </ParrafoContenedor>              
                    <h4>  <AiFillCaretDown onClick = {() => menu() }/> </h4>
                </MarcoBienvenida>
            
            {apertura ? //menu
            
                <MarcoMenu>
                    <ul>
                        <li onClick={ () => perfil() }> <p> Perfil </p> </li>
                        <li onClick={ () => salida() }> <p> Salir </p> </li>
                    </ul>    
                </MarcoMenu>
            
            : null }

            </MarcoHeader>
        </ContenedorHeader>

     );
}
 
export default Header;
    

const ContenedorHeader = styled.div`
    width: 100%;
    padding: 0em 1em;
    background-color: #1d272d;
    /* border: 1px solid white; */
`;
const MarcoHeader = styled.div`
    display: grid;
    grid-template-columns: 25% 50% 25%;
    color: white;
    h3{
        cursor: pointer;
    }
`;
const MarcoSlide = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items:center;

    img{
        width: 30px;
        height: 30px;
        border-radius: 22px;
        margin-right: 12px;
    }
`;

const MarcoBienvenida = styled.div`
    display: flex;
    justify-content: end;
    align-items:center;
    font-size: 12px;
    font-family: 'Poppins', sans-serif;

    img{
        width: 30px;
        height: 30px;
        border-radius: 22px;
        margin-right: 12px;
    }

    @media(min-width: 768px){
        font-size: 14px;
    }
`;

const MarcoMenu = styled.div`
    position: absolute;
    top: 3em;
    right: 3em;

    ul{
        padding: 0em 10px;
        margin: 18px 0;
        list-style: none;
    }
     
    li{
        transition: .2s ease-out;
        cursor: pointer;
        &:hover{
            background-color: #171717;
        }
    }

    p {
        font-size: 14px;
        color: white;
    }
`;

const ParrafoContenedor = styled.p`
    margin:0;
    color: white;
    font-size: 11px;
    padding: 0 1em 0 25px;
    cursor: pointer;

    @media(min-width: 768px){
        font-size: 13px;
        padding: 0 0 0 15px;
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