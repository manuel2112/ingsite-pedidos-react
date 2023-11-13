import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { pedidoApi } from "../api";
import { useAuthStore, useClienteStore } from "./";
import { onHiddeBuscarPorFecha, onHiddeLoading, onListPedido, onListPedidoReset, onPedidoSelect, onResetFormPedido, onSearchTitle, onShowPedidoDetail } from "../store";
import { nameToken } from "../helpers";

export const usePedidoStore = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { pedido, pedidoList, arrIdPedido, searchTitle } = useSelector( state => state.pedido );
    
    const { user, tokenExpired } = useAuthStore();
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
            const {data} = await pedidoApi.post('/preventa', dataString);

            if(data.success){
                localStorage.setItem(nameToken, data.token);
                dispatch(onResetFormPedido());
                Swal.fire({
                    title: 'PEDIDO ENVIADO',
                    text: data.msg,
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
                Swal.fire('ERROR', data.info, 'error' )
            }
            
        } catch (error) {
            console.log(error);
            tokenExpired( error.response.data.errorToken );
        }

    }

    const startPedidosList = async() => {    
        
        Swal.showLoading();
        
        try {

            const {data} = await pedidoApi.get('/preventa');

            if(data.success){
                localStorage.setItem(nameToken, data.token);
                dispatch(onListPedido(data));
                Swal.close();
            }else{
                //TODO ERROR
                Swal.fire('ERROR', data.info, 'error' )
            }
            
        } catch (error) {
            console.log(error);
            tokenExpired( error.response.data.errorToken );
        }
    }

    const startPedidosById = async(id) => {    
        
        Swal.showLoading();
        
        try {

            const {data} = await pedidoApi.get(`/preventa/get-by-id/${id}`);

            if(data.success){
                localStorage.setItem(nameToken, data.token);
                dispatch(onPedidoSelect(data.preventa));
                dispatch(onShowPedidoDetail());
                Swal.close();
            }else{
                Swal.fire('ERROR', data.info, 'error' )
            }
            
        } catch (error) {
            console.log(error);
            tokenExpired( error.response.data.errorToken );
        }
    }

    const startSearchList = async({unica = '',desde = '', hasta = ''}) => {

        Swal.showLoading();
        
        try {

            const {data} = await pedidoApi.get('/preventa/get-by-date', {
                params: {
                    unica,
                    desde,
                    hasta
                }
            });
            
            dispatch(onHiddeLoading());

            if(data.success){
                dispatch(onListPedidoReset());
                dispatch(onHiddeBuscarPorFecha());
                dispatch(onSearchTitle(data.caption));
                dispatch(onListPedido(data));
                Swal.close();
            }else{
                Swal.fire('ERROR', data.info, 'error' )
            }
        } catch (error) {
            console.log(error);
            tokenExpired( error.response.data.errorToken );
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
        startPedidosById
    }
}