import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { TiEdit, TiTrash } from "react-icons/ti";
import Swal from 'sweetalert2';
import { usePedidoStore } from '../../hooks';
import { currencyFormat } from "../../helpers";
import { onArticleSelect, onDeleteArticlePedido, onResetFormPedido, onShowMdlArticleDetailsUpdate } from "../../store";

export const TblResumenPedido = () => {
    
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
    

    return (
        <>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th className="text-right">ARTÍCULO</th>
                        <th>VALOR</th>
                        <th>CANTIDAD</th>
                        <th>TOTAL</th>
                        <th>EDITAR</th>
                        <th>ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        pedido.map( (ped, idx) => (
                            <tr key={ ped.articulos_id }>
                                <td width={ '2%' }>{ idx + 1 }</td>
                                <td>{ ped.articulos_descripcion }</td>
                                <td>{ currencyFormat(ped.valor) }</td>
                                <td width={ '10%' }>{ ped.cantidad }</td>
                                <td>{ currencyFormat(ped.total) }</td>
                                <td width={ '10%' }>
                                    <button className="btn btn-warning btn-sm" onClick={ e => onEdit(e,ped) }>
                                        <TiEdit size="1.5em" color="white" />
                                    </button>
                                </td>
                                <td width={ '10%' }>
                                    <button className="btn btn-danger btn-sm" onClick={ e => onDelete(e,ped) }>
                                        <TiTrash size="1.5em" color="white" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }

                    <tr className="table-dark">
                        <th colSpan="6">
                            TOTAL
                        </th>
                        <th>
                            { currencyFormat(total) }
                        </th>
                    </tr>
                    
                </tbody>
            </Table>

            <div className="col-12 d-flex justify-content-between">
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={onClean}>
                    LIMPIAR
                </button>
                <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={onSend}>
                    ENVIAR
                </button>
            </div>
        </>
    )
}
