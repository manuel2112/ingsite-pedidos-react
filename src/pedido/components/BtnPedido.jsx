import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
import { currencyFormat, fechaLatinaSinHora } from '../../helpers';
// import { onPedidoSelect, onShowPedidoDetail } from '../../store';
import { usePedidoStore } from '../../hooks';

export const BtnPedido = ({pedido, idx}) => {

    // const dispatch = useDispatch();
    const { startPedidosById } = usePedidoStore();

    const onDetails = () => {
        startPedidosById(pedido.preventa_id);
        // dispatch(onPedidoSelect(pedido));
        // dispatch(onShowPedidoDetail());
    }

    return (
        <tr
            className="cursor-pointer"
            onClick={onDetails}>
            <td className="text-center">{ idx }</td>
            <td className="text-center">{ fechaLatinaSinHora(pedido.fecha) }<br />{ pedido.preventa_id }</td>
            <td className="text-center">{ pedido.retira_nombre }<br />{ currencyFormat(Number(pedido.total)) }</td>
        </tr>
    )
}

BtnPedido.propTypes = {
    pedido: PropTypes.object,
    idx: Number
};