import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: process.env.backendURLLOCAL
})

export default clienteAxios;