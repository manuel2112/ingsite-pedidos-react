import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { pedidoApi } from "../api";
import { onClienteSelect, onClientes, onHiddeClienteInsert, onResetClientes } from "../store";
import { nameToken } from "../helpers";
import { useAuthStore } from "./useAuthStore";

export const useClienteStore = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();    
    
    const { clientes, clientesTemp, clienteSelect } = useSelector( state => state.cliente);

    const { tokenExpired } = useAuthStore();

    const startClientes = async() => {
        
        Swal.showLoading();
        dispatch(onResetClientes());
        
        try {
            
            const {data} = await pedidoApi.get('/client');

            if(data.success){
                dispatch(onClientes(data));
                Swal.close();
            }else{
                Swal.fire('ERROR', 'FAVOR RECARGAR SISTEMA', 'error' );
            }
            
        } catch (error) {
            console.log(error);
            tokenExpired( error.response.data.errorToken );
        }

    }

    const startClienteInsert = async(value) => {
        
        Swal.showLoading();

        const cliente = {
            rut: value.rutForm,
            nombre: value.nombreForm,
            direccion: value.direccionForm,
            ciudad: value.ciudadForm,
            fono: value.fonoForm,
            credito: value.isCreditForm,
            monto: value.montoCreditForm,
        }
        
        try {
            
            const {data} = await pedidoApi.post('/client', {cliente});
            localStorage.setItem(nameToken, data.token);

            if(data.success){                
                dispatch(onClienteSelect({id:data.cliente.clientes_id, name:data.cliente.razon}));
                Swal.fire({
                    title: 'CLIENTE',
                    text: data.msg,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#198754',
                    allowOutsideClick: false
                }).then((result) => {            
                    if (result.isConfirmed) {
                        dispatch(onHiddeClienteInsert());
                        navigate('/pedido/cliente-nuevo');
                    }
                })
            }else{
                Swal.fire('ERROR', data.msg, 'error' )
            }
            
        } catch (error) {
            console.log(error);
            tokenExpired( error.response.data.errorToken );
        }

    }

    return {
        //PROPIEDADES
        clientes,
        clientesTemp,
        clienteSelect,        

        //MÉTODOS
        startClientes,
        startClienteInsert
    }
}