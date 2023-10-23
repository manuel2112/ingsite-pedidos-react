import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { currencyFormat, fechaLatinaSinHora } from '../../helpers';
import { onPedidoSelect, onShowPedidoDetail } from '../../store';

export const BtnPedido = ({pedido, idx}) => {

    const dispatch = useDispatch();

    const onDetails = () => {
        dispatch(onPedidoSelect(pedido));
        dispatch(onShowPedidoDetail());
    }

    return (
        <tr
            className="cursor-pointer"
            onClick={onDetails}>
            <td className="text-center">{ idx }</td>
            <td className="text-center">{ fechaLatinaSinHora(pedido.PREVENTA.fecha) }<br />{ pedido.PREVENTA.preventa_id }</td>
            <td className="text-center">{ pedido.PREVENTA.retira_nombre }<br />{ currencyFormat(Number(pedido.PREVENTA.total)) }</td>
        </tr>
    )
}

BtnPedido.propTypes = {
    pedido: PropTypes.object,
    idx: Number
};