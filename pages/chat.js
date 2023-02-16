import React, { useContext, useEffect, useState } from 'react';
import Layout        from '../components/Layout';
import AuthContext   from '../context/auth/authContext'; 
import chatContext   from '../context/chat/chatContext';
import { useRouter } from 'next/router';
import styled        from 'styled-components';
//componentes
import Header   from '../components/Header';
import Usuarios from '../components/chat/usuarios';
import Mensajes from '../components/chat/mensajes';


const ContenedorCHAT = styled.div`
    width: 100%;
    
`;

const MarcoCHAT = styled.div`
    display: grid;
    grid-template-columns: ${({menu}) => menu ? '30% 70%' : '100%'};    
    // padding: 0em 10px;
    min-height: 93.4%;

    @media(min-width: 768px){
        grid-template-columns: ${({menu}) => menu ? '20% 80%' : '100%'};  
        // padding: 0em 2em;
    }
`;

const MarcoUsuarios = styled.div`
    display: ${({menu}) => menu ? 'block' : 'none'};
    padding: 0px 15px;
    min-height: 93.4%;
    border-right: 1px solid #343434;
    -webkit-transform: translateX(0);
    transform: translateX(0);
    -webkit-transition: 150ms ease-in;
    transition: 150ms ease-in;
    background-color: #20272c;

    p{
        color: white;
    }
`;

const ContenerdorDialogo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 93.4%;
    background-color: #000;
`;

const Dialogo = styled.p`
    font-size: 14px;
    color: white;
    font-family: 'Poppins', sans-serif;
    text-align: center;
    margin: 0;
    padding: 0 5px;
`;


const Chat = () => {
    
    const router = new useRouter();
    const [nombre, setNombre] = useState(null)

    const authContext = useContext(AuthContext);
    const { usuario, autenticacion, alarma, usuarioAutenticado } = authContext;
    const chat = useContext(chatContext);
    const { usuarios, menu, chatactivo, interactive } = chat;
    
    useEffect(() => {
        if(!autenticacion) {
            router.push('/');
        }
        //eslint-disable-next-line
    }, [autenticacion]);


    useEffect(() => {
    if(alarma){
        usuarioAutenticado()
    }   
    //eslint-disable-next-line
    }, [alarma])
    
    return ( 
        <>
        <Layout> 

        
        <ContenedorCHAT> 
        <Header />
           
         <MarcoCHAT menu={menu}>    
    
            <MarcoUsuarios 
                menu={menu}
            >
                
            {
                usuarios
                .filter( user => user.uid !== usuario.uid)
                .map(usuario => (
                    <Usuarios 
                        key={usuario.uid}
                        usuario={usuario}
                    />
                ))
            }

            </MarcoUsuarios>

        <div>
            
            { chatactivo ? ( <Mensajes  /> ) : (<ContenerdorDialogo> <Dialogo> Selecciona un Chat en el apartado de contactos ! </Dialogo> </ContenerdorDialogo> ) }  
            
        </div>
       
         </MarcoCHAT>
        </ContenedorCHAT>


        </Layout>
        </>
     );
}
 
export default Chat;
