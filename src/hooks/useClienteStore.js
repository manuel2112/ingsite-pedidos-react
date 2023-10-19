import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { pedidoApi } from "../api";
import { onClienteSelect, onClientes, onHiddeClienteInsert, onResetClientes } from "../store";

export const useClienteStore = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { clientes, clientesTemp, clienteSelect } = useSelector( state => state.cliente);

    const startClientes = async() => {
        
        Swal.showLoading();
        dispatch(onResetClientes());
        
        try {
            
            const {data} = await pedidoApi.get('/clientes');

            if(data.success){
                dispatch(onClientes(data.info));
                Swal.close();
            }else{
                //TODO ERROR
                Swal.fire('ERROR', 'FAVOR RECARGAR SISTEMA', 'error' );
            }
            
        } catch (error) {
            console.log(error);
            Swal.fire('ERROR', 'PROTOCOLO NO SOPORTADO', 'error' );
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
            
            const {data} = await pedidoApi.post('/cliente', {cliente});

            if(data.success){
                dispatch(onClienteSelect({id:data.clienteId, name:cliente.nombre}));
                Swal.fire({
                    title: 'CLIENTE',
                    text: data.info,
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
                //TODO ERROR
                Swal.fire('ERROR', data.info, 'error' )
            }
            
        } catch (error) {
            console.log(error);
            Swal.fire('ERROR', 'PROTOCOLO NO SOPORTADO', 'error' );
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