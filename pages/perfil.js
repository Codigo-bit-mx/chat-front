import React, {useContext, useEffect} from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import FormPerfil from '../components/FormPerfil';
import AuthContext from '../context/auth/authContext'; 
import { useRouter } from 'next/router';

const Perfil = () => {

    const router = new useRouter();

    const authContext = useContext(AuthContext);
    const {autenticacion, token ,cerrarSesion, usuarioAutenticado } = authContext;


    useEffect(() => {
        if(!autenticacion) {
            router.push('/');
        }
        //eslint-disable-next-line
    }, [ autenticacion ]);
    
    return ( 
         <Layout>
            <Header />  
            <FormPerfil />
        </Layout> 
     );
}
 
export default Perfil;