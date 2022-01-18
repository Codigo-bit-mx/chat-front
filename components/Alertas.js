import React, { useContext } from 'react';
import styled from 'styled-components';
import authContext from '../context/auth/authContext';


const ContenedorAlerta = styled.div`
    padding: 10px 0;
`;

const ParrafoAlert = styled.p `
    color: white;
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    text-align: center;
`;


//llego el momento jeje!!
const Alertas = () => {
    
const auth = useContext(authContext);
const { msgcorrecto, msgerror } = auth;

    return ( 

        <ContenedorAlerta>
            
            <ParrafoAlert> {msgcorrecto ? msgcorrecto : msgerror} </ParrafoAlert>
       
        </ContenedorAlerta>
     
     );
}
 
export default Alertas;