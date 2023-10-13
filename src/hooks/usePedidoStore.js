import { useDispatch, useSelector } from "react-redux";
import { pedidoApi } from "../api";
import Swal from "sweetalert2";
import { useAuthStore } from "./useAuthStore";
import { onResetValues } from "../store";
import { useNavigate } from "react-router-dom";

export const usePedidoStore = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cliente, pedido } = useSelector( state => state.pedido );
    const { user } = useAuthStore();

    const startPedido = async({total = 0}) => {    
        
        Swal.showLoading();
        
        try {            

            const dataString = {
                clienteId:  cliente.id, 
                clienteNmb: cliente.name, 
                pedido:     pedido, 
                total:      total, 
                vendedor:   user.id,
            }
            const {data} = await pedidoApi.post('/pedido', dataString);

            if(data.success){
                dispatch(onResetValues());
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

    return {
        //PROPIEDADES

        //MÉTODOS
        startPedido

    }
}