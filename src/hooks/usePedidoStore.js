import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { pedidoApi } from "../api";
import { useAuthStore, useClienteStore } from "./";
import { onHiddeBuscarPorFecha, onHiddeLoading, onListPedido, onListPedidoReset, onResetFormPedido, onSearchTitle } from "../store";

export const usePedidoStore = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { pedido, pedidoList, arrIdPedido, searchTitle } = useSelector( state => state.pedido );
    
    const { user } = useAuthStore();
    const { clienteSelect } = useClienteStore();

    const startPedido = async({total = 0}) => {    
        
        Swal.showLoading();
        
        try {            

            const dataString = {
                clienteId:  clienteSelect.id, 
                clienteNmb: clienteSelect.name, 
                pedido:     pedido, 
                total:      total, 
                vendedor:   user.id,
            }
            const {data} = await pedidoApi.post('/pedido', dataString);

            if(data.success){
                dispatch(onResetFormPedido());
                Swal.fire({
                    title: 'PEDIDO ENVIADO',
                    text: data.info,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#198754',
                    allowOutsideClick: false
                }).then((result) => {            
                    if (result.isConfirmed) {
                        navigate('/pedido');
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

    const startPedidosList = async() => {    
        
        Swal.showLoading();
        
        try {

            const {data} = await pedidoApi.get('/ultimos');

            if(data.success){
                dispatch(onListPedido(data.info.res));
                Swal.close();
            }else{
                //TODO ERROR
                Swal.fire('ERROR', data.info, 'error' )
            }
            
        } catch (error) {
            console.log(error);
            Swal.fire('ERROR', 'PROTOCOLO NO SOPORTADO', 'error' );
        }
    }

    const startSearchList = async({unica = '',desde = '', hasta = ''}) => {

        Swal.showLoading();
        const fecha = {};
        fecha.unica = unica; 
        fecha.desde = desde; 
        fecha.hasta = hasta;
        
        try {

            const {data} = await pedidoApi.post('/search', {fecha});
            
            dispatch(onHiddeLoading());

            if(data.success){
                dispatch(onListPedidoReset());
                dispatch(onHiddeBuscarPorFecha());
                dispatch(onSearchTitle(data.caption));
                dispatch(onListPedido(data.info.res));
                Swal.close();
            }else{
                Swal.fire('ERROR', data.info, 'error' )
            }
        } catch (error) {
            console.log(error);
            Swal.fire('ERROR', 'PROTOCOLO NO SOPORTADO', 'error' );
        }
    }

    return {
        //PROPIEDADES
        pedido, 
        pedidoList, 
        arrIdPedido,
        searchTitle,

        //MÉTODOS
        startPedido,
        startPedidosList,
        startSearchList,
    }
}