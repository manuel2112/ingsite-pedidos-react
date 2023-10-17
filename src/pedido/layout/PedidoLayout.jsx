import PropTypes from 'prop-types';
import { logoCliente } from "../../helpers";
import { Navbar } from "../components";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { onClienteSelectReset, onResetPedido } from '../../store';
import { useClienteStore } from '../../hooks';

export const PedidoLayout = ({children}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pedido } = useSelector( state => state.pedido );
    const { clienteSelect } = useClienteStore();

    const onHome = () => {
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

    return (
        <>
            <Navbar />

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <img 
                            src={logoCliente} 
                            alt='INGSITE' 
                            className='logo-cliente-site'
                            style={{cursor: 'pointer'}}
                            onClick={onHome}
                            />
                    </div>
                </div>
                <div className="row mt-5">
                    {children}
                </div>
            </div>
        </>
    )
}

PedidoLayout.propTypes = {
    children: PropTypes.node,
};
