import PropTypes from 'prop-types';
import { Breadcrumb } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { onClienteSelectReset, onListPedidoReset, onResetPedido } from '../../store';
import { useClienteStore } from '../../hooks';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const HeaderBreadcrumb = ({title, pedidoPage = false}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pedido } = useSelector( state => state.pedido );
    const { clienteSelect } = useClienteStore();

    const onHome = () => {
        dispatch(onListPedidoReset());
        if( (pedido.length > 0) || clienteSelect.name ){
            Swal.fire({
                title: 'PEDIDO',
                text: "TIENES UN PEDIDO EN CURSO ¿LO DESEAS ELIMINAR?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#fd7e14',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SI, ELIMINAR',
                cancelButtonText: 'NO',
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(onClienteSelectReset());
                    dispatch(onResetPedido());
                    navigate('/');
                }
            })
        }else{
            navigate('/');
        }
    }

    const onPedido = () => {
        dispatch(onListPedidoReset());
        if( (pedido.length > 0) || clienteSelect.name ){
            Swal.fire({
                title: 'PEDIDO',
                text: "TIENES UN PEDIDO EN CURSO ¿LO DESEAS ELIMINAR?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#fd7e14',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SI, ELIMINAR',
                cancelButtonText: 'NO',
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(onClienteSelectReset());
                    dispatch(onResetPedido());
                    navigate('/pedido');
                }
            })
        }else{
            navigate('/pedido');
        }
    }

    return (
        <Breadcrumb>
            <Breadcrumb.Item onClick={onHome}>HOME</Breadcrumb.Item>
            {
                pedidoPage && <Breadcrumb.Item onClick={onPedido}>PEDIDO</Breadcrumb.Item>
            }
            <Breadcrumb.Item active>{title}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

HeaderBreadcrumb.propTypes = {
    title: PropTypes.string,
    pedidoPage: PropTypes.bool
};

HeaderBreadcrumb.defaultProps = {
    title: ''
}
