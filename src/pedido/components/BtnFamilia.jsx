import PropTypes from 'prop-types';
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import { onSearchArticleByFamily, onShowMdlArticleBox } from '../../store';

export const BtnFamilia = ({family}) => {

    const dispatch = useDispatch();
    const { arrIdPedido } = useSelector( state => state.pedido );

    const onFamily = () => {
        dispatch(onSearchArticleByFamily({ id: family.familia_id, arr: arrIdPedido}));        
        dispatch(onShowMdlArticleBox());
    }

    return (
        <Button 
            type="button" 
            className="list-group-item d-flex justify-content-center py-3"
            onClick={onFamily}>
            { family.familia_nombre || '---' }
        </Button>
    )
}

BtnFamilia.propTypes = {
    family: PropTypes.object,
};
