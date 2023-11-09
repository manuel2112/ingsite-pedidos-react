import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { Badge, Button } from "react-bootstrap"
import { useDispatch } from 'react-redux';
import { onArticleSelect, onHiddeMdlArticle, onShowMdlArticleDetailsInsert } from '../../store';
import { boolStockNulo, currencyFormat, nameArticle } from '../../helpers';

export const BtnArticulo = ({article}) => {

    const dispatch = useDispatch();

    const isDisabled = useMemo(() => article.articulos_stock < 1 && boolStockNulo, [article]);

    const [articlesAddFields, setArticlesAddFields] = useState(article);
    

    useEffect(() => {
        setArticlesAddFields({
            ...articlesAddFields,
            total: 0,
            valor: Number(article.articulos_venta),
            cantidad: '',
        });
    }, [article])
    

    const onArticle = () => {
        dispatch(onArticleSelect(articlesAddFields));
        dispatch(onHiddeMdlArticle());
        dispatch(onShowMdlArticleDetailsInsert());
    }

    return (
        <Button 
            type="button" 
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={onArticle}
            disabled={isDisabled}>
            { nameArticle(article.familia.familia_nombre, article.articulos_descripcion) }
            <div>
                <Badge bg={ article.articulos_stock > 0 ? 'secondary' : 'danger' }>{ article.articulos_stock }</Badge> <br />
                <Badge bg="primary">{ currencyFormat(Number(article.articulos_venta)) }</Badge>
            </div>
        </Button>
    )
}

BtnArticulo.propTypes = {
    article: PropTypes.object,
};