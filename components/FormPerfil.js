import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import AuthContext from '../context/auth/authContext';
import Alertas from './Alertas';


const ContenedorPerfil = styled.div`
    background-color: #000;
    width: 100%;
    height: 100%;
`;

const MarcoPerfil = styled.div`
    height: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
   
`;

const Form = styled.form`
    padding: 1em;
    width: 100%;
    max-width: 400px;

    h3{
        color: white;
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
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
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
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

const Perfil = () => {

    const authContext = useContext(AuthContext);
    const { usuario,
            msgcorrecto,
            msgerror,
            actualizarDatos,
            mostrarAlerta   } = authContext;
            
    const id         = usuario.uid;
    const name       = usuario.nombre;
    const correo     = usuario.email;
   
    const [ imguser, setImguser ] = useState({});
    const[ newDate, setNewDate ] = useState({
        nombre: name,
        email: correo,
        password: '',
    });

    const { nombre, email, password } = newDate; 

    const cambio = (e) => {
        setNewDate({
            ...newDate,
            [ e.target.name ] : e.target.value
        });
    };

    const img = (e) => {    
      const ruta = e.target.files[0];
      setImguser(ruta);
    }
    
    const envio = (e) => {
        e.preventDefault();
        if( nombre.trim() === '' || email.trim() === '' ){
            mostrarAlerta('El correo y nombre no pueden ir vacios');
            return;
        }
        actualizarDatos(id, imguser, newDate);
    }

    return ( 

            <ContenedorPerfil> 
                 
                 <MarcoPerfil>
                   
                    <Form>
                    <h3>Cambia tu información</h3>
                        <CamposInput 
                            type = "nombre"
                            placeholder="Edita tu nombre"
                            name="nombre"
                            value={nombre}
                            onChange={cambio}
                        />

                        <CamposInput
                            type = "email"
                            placeholder="Edita tu email"
                            name="email"
                            value={email}
                            onChange={cambio}
                        />

                        <CamposInput
                            type = "password"
                            placeholder = "Ingresa tu nueva contraseña"
                            name="password"
                            value={password}
                            onChange={cambio}
                        />

                        <CamposInput
                            type="file"
                            placeholder="Ingresa tu archivo"
                            name="archivo"
                            onChange = {img}
                        />

                { msgcorrecto || msgerror ? <Alertas /> : null }

                <BTN type="submit" onClick={(e) => envio(e)}>Aceptar</BTN>

                    </Form>

                     </MarcoPerfil>
                </ContenedorPerfil>

     );
}
 
export default Perfil;