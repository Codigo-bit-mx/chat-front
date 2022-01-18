import clienteAxios from "./axios";

const authToken = token => {
    if(token){
        clienteAxios.defaults.headers.common['x-token'] = token;
    }else{
        delete clienteAxios.defaults.headers.common['x-token'];
    }
}

export default authToken;