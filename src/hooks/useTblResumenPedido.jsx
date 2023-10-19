import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { usePedidoStore } from "./usePedidoStore";
import { onArticleSelect, onDeleteArticlePedido, onResetFormPedido, onShowMdlArticleDetailsUpdate } from "../store";

export const useTblResumenPedido = () => {
    
    const dispatch = useDispatch();

    const { pedido } = useSelector( state => state.pedido );
    const { startPedido } = usePedidoStore();
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let suma = 0;
        pedido.map( ped => {
            suma += ped.total
        })
        setTotal(suma);
    }, [pedido])

    const onEdit = (e, value) => {
        dispatch(onArticleSelect(value));
        dispatch(onShowMdlArticleDetailsUpdate());
    }
    
    const onDelete = (e, value) => {
        Swal.fire({
            title: '¿ESTÁS SEGURO DE ELIMINAR ESTE ARTÍCULO?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ELIMINAR',
            cancelButtonText: 'CANCELAR',
            confirmButtonColor: '#d33',
            allowOutsideClick: false
        }).then((result) => {            
            if (result.isConfirmed) {
                dispatch(onDeleteArticlePedido(value.articulos_id));
                Swal.fire('ARTÍCULO ELIMINADO EXITOSAMENTE', '', 'success')
            }
        })
    }

    const onClean = () => {
        Swal.fire({
            title: '¿ESTÁS SEGURO DE ELIMINAR ESTE PEDIDO?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'SI, ELIMINAR',
            cancelButtonText: 'CANCELAR',
            confirmButtonColor: '#d33',
            allowOutsideClick: false
        }).then((result) => {            
            if (result.isConfirmed) {
                dispatch(onResetFormPedido());
                Swal.fire('PEDIDO ELIMINADO EXITOSAMENTE', '', 'success')
            }
        })
    }
    const onSend = () => {
        Swal.fire({
            title: '¿ESTÁS SEGURO DE ENVIAR ESTE PEDIDO?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'SI, ENVIAR',
            cancelButtonText: 'CANCELAR',
            confirmButtonColor: '#198754',
            allowOutsideClick: false
        }).then((result) => {     
            if (result.isConfirmed) {
                Swal.fire('', '', '')          
                startPedido({total});   
                            
            }
        })
    }

    return {
        //PROPIEDADES
        pedido,
        total,

        //MÉTODOS
        onEdit,
        onDelete,
        onClean,
        onSend
    }
}
