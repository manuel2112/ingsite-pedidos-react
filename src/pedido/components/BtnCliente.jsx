import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Badge, Button } from "react-bootstrap";
import { currencyFormat } from '../../helpers';
import { useDispatch } from 'react-redux';
import { onClienteSelect } from '../../store';

export const BtnCliente = ({cliente}) => {

    const dispatch = useDispatch();

    const objSaldo = useMemo(() => {

        if( cliente.debe >= 0 ){
            const saldo = currencyFormat(cliente.debe);
            return { saldo, class: 'primary' };
        }else if( cliente.debe < 0 ){
            const saldo = currencyFormat(cliente.debe * -1);
            return { saldo, class: 'danger' };
        }else{
            return { saldo: '', class: '' };
        }

    }, [cliente]);

    const onCliente = () => {
        dispatch(onClienteSelect({id:cliente.clientes_id, name:cliente.razon}));
        // dispatch(onArticleSelect(cliente));
        // dispatch(onHiddeMdlArticle());
        // dispatch(onShowMdlArticleDetailsInsert());
    }

    return (
        <Button 
            type="button" 
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={onCliente}>
            { cliente.razon || '---' } 
            <div>
                <Badge bg={ objSaldo.class }>{ objSaldo.saldo }</Badge> <br />
                <Badge bg="secondary">{ cliente.rut }</Badge>
            </div>
        </Button>
    )
}

BtnCliente.propTypes = {
    cliente: PropTypes.object,
};
