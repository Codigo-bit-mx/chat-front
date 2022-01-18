import React, {useContext, useState, useEffect} from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import authContext from '../../context/auth/authContext';
import { useRouter } from 'next/router';
import Alertas from '../Alertas';

const ContenedorLogin = styled.div`
    height: 100vh;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ContenedorForm = styled.div`
    padding: 2em 2em;
    color: white;
    width: 100%;
    max-width: 400px;
`;

const CamposInput = styled.input`
    width: 100%;
    align-items: center;
    margin: 1em 0;
    padding: 8px 10px;
    border-radius: 16px;
    outline: none;
    font-size: 16px;
    font-weight: 550;
    border: 1px solid #e1e1e1;
`;

const BTN = styled.button`
    width: 30%;
    margin: 16px 0;
    padding: 6px;
    background: rgb(34, 150, 206);
    border-radius: 12px;
    border: 1px solid rgb(34, 150, 206);
    font-size: 16px;
    font-weight: 550;
    color: white;
    transition: .2s ease-in-out;
    &:hover{
        background-color: rgb(19, 98, 137);
    }
`;


const Login = () => {

    const router = new useRouter();

    const AuthContext = useContext(authContext);
    const { token, autenticacion, msgerror, iniciarSesion, usuarioAutenticado, mostrarAlerta } = AuthContext;

    const [usuario, setUsuario] = useState ({
        email: '',
        password:''
    });
    
    const {email, password} = usuario;
    
    const changeON = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const envio = (e) =>{
        e.preventDefault();
        //validacion de form
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta("Email y password vacios");
            return
        }
        iniciarSesion(usuario);
    }

    useEffect(() => {
        if(autenticacion || token){
            router.push('/chat');
            usuarioAutenticado();

        }
        //eslint-disable-next-line
    }, [autenticacion]);


    return ( 
    <>
    <ContenedorLogin>
        
        <ContenedorForm>
         <h1>ChatBitMx</h1>    
            <form>
                <CamposInput 
                 type="email"
                 placeholder="Ingresa tu correo"
                 name="email"
                 value={email}
                 onChange={changeON}
                 />
                
                <CamposInput 
                 type="password"
                 placeholder="Ingresa tu password"
                 name="password"
                 value={password}
                 onChange={changeON}
                 />

                { msgerror ? (<Alertas />) : null }

                 <BTN type="submit" onClick={envio}>Entrar</BTN>
            </form>

            <p>Obten una cuenta <Link href="/nueva-cuenta">  aqui!  </Link> </p>

        </ContenedorForm>
    </ContenedorLogin>
    </> 
     );

}
 
export default Login;   