import React, {useContext, useState} from 'react';
import Link            from 'next/link';
import styled          from 'styled-components';
import Layout          from '../components/Layout';
import { FaArrowLeft } from "react-icons/fa";
import AuthContext     from '../context/auth/authContext';
import { useRouter }   from 'next/router';
import Alertas         from '../components/Alertas';

const ContenedorNewCuenta = styled.div`
    height: 100vh;
    min-height: 100px;
    display: flex;
    align-items:center;
    justify-content: center;
    
`;

const ContenedorNewForm = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 2em 2em;
    a{
        color: white
    }
    h2{
        color: white;
        font-size: 22px;
    }
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

const BtnRegistro = styled.button`
    background-color: rgb(34, 150, 206);
    margin: 12px 0;
    padding: 10px;
    border: 1px solid rgb(34, 150, 206);
    border-radius: 16px;
    color: white;

    &:hover{
        background-color: rgb(19, 98, 137);
    }
`;

const NuevaCuenta = () => {

    const router = new useRouter();
    
    const authContext = useContext(AuthContext);
    const { msgerror, registroUsuario, mostrarAlerta } = authContext;

    const [newuser, setNewUser] = useState ({
        nombre: '',
        email: '',
        password: ''
    });

    const { nombre, email, password } = newuser;

    const change = (e) => {
        setNewUser({
            ...newuser,
            [e.target.name] : e.target.value
        })
    }
    
    const envio = (e) => {
        e.preventDefault();
        if(nombre.trim() === "" || email.trim() === "" || password.trim() === "") {
            mostrarAlerta("Faltan algunos datos para el registro.");
            return
        }
        registroUsuario(newuser);
        setTimeout(() => {
            router.push('/chat');
        }, 2000);
        
    }

    return ( 
        <>
        <Layout>
        <ContenedorNewCuenta>
            
            <ContenedorNewForm>
                <Link href="/">
                    <a><FaArrowLeft /> Back </a>
                </Link>
                
                <h2>Registro de cuenta</h2>
                <form>
                    <CamposInput 
                     type="text"
                     placeholder="Ingresa tu nombre"
                     name="nombre"
                     value={nombre}
                     onChange={change}
                    />
                    
                    <CamposInput 
                     type="email"
                     placeholder="Ingresa tu email"
                     name="email" 
                     value={email}
                     onChange={change}
                    />
                    
                    <CamposInput 
                     type="password"
                     placeholder="Ingresa tu password" 
                     name="password"
                     value={password}
                     onChange={change}
                    />
                
                    {msgerror ? ( <Alertas /> ) : null} 

                    <BtnRegistro type="submit"
                        onClick={envio}>Registrar
                    </BtnRegistro>
                
                </form>
            
            </ContenedorNewForm>
        </ContenedorNewCuenta>
        </Layout>
        </>

     );
}
 
export default NuevaCuenta;