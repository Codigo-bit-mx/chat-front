import React, {useContext, useState, useEffect} from 'react';
import styled              from 'styled-components';
import { AiFillCaretDown } from "react-icons/ai";
import AuthContext         from '../context/auth/authContext';
import { useRouter }       from 'next/router';
import Image               from 'next/image';

const ContenedorHeader = styled.div`
    width: 100%;
    padding: 1em 3em 0 3em;
    /* border: 1px solid white; */
`;
const MarcoHeader = styled.div`
    display: grid;
    grid-template-columns: 75% 25%;
    color: white;

    h3{
        cursor: pointer;
    }
`;

const MarcoBienvenida = styled.div`
    display: flex;
    justify-content: end;
    font-size: 12px;
    font-family: 'Poppins', sans-serif;

    img{
        width: 20px;
        height: 20px;
        border-radius: 22px;
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

const Header = () => {
    
    const router = new useRouter();

    const authContext = useContext( AuthContext );
    const { usuario, alarma, usuarioAutenticado,cerrarSesion } = authContext; 

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



    return ( 
        <ContenedorHeader>
            <MarcoHeader>

                <div>
                    <h3 onClick={ () => chat() }>Chatbit</h3>
                </div>

                <MarcoBienvenida>
                    <img src={img} />
                    <h4> Hola, {nombre} <AiFillCaretDown onClick = {() => menu() }/> </h4>
                </MarcoBienvenida>
            
            {apertura ? //menu
            
                <MarcoMenu>
                    <ul>
                        <li onClick={ () => perfil() }> <p> Perfil </p> </li>
                        <li onClick={ () => cerrarSesion() }> <p> Salir </p> </li>
                    </ul>    
                </MarcoMenu>
            
            : null }

            </MarcoHeader>
        </ContenedorHeader>

     );
}
 
export default Header;
    

