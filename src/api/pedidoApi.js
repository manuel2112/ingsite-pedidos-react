import axios from 'axios';
import { nameToken } from '../helpers';

const apiLocal  = 'http://localhost:8080/ingsite/api-pedidos/apirest';
const apiServer = 'https://ingsite.cl/api/api-juane/apirest';

const VITE_API_URL = (location.hostname === "localhost" || location.hostname === "127.0.0.1") 
                ? apiLocal
                : apiServer;


const pedidoApi = axios.create({
    baseURL: VITE_API_URL
});

// Todo: configurar interceptores
pedidoApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem(nameToken)
    }

    return config;
})


export default pedidoApi;