import { FormControl, InputGroup } from "react-bootstrap";
import { useArticuloStore, useForm } from "../../hooks";
import { BtnArticulo } from "./BtnArticulo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetArticles, onSearchArticle } from "../../store";

const searchFormFields = {
    txtSearch: ''
}

export const MdlPedidoArticulo = () => {

    const dispatch = useDispatch()
    const { arrIdPedido } = useSelector( state => state.pedido );
    const [showButton, setShowButton] = useState(false)
    const { txtSearch, onInputChange, onResetForm } = useForm(searchFormFields);
    const { articlesTemp } = useArticuloStore();

    useEffect(() => {
        const term = txtSearch.toUpperCase().trim();    
        
        if( term.length === 0 ) {
            setShowButton(false);
            return;
        }
        
        setShowButton(true);
        dispatch(onSearchArticle({term, arr:arrIdPedido}));

    }, [txtSearch])

    const handleClick  = () => {
        setShowButton(false);
        onResetForm();
        dispatch(onGetArticles(arrIdPedido));
    };

    return (
        <>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="BUSCAR ARTÍCULO..."
                    type="text"
                    name="txtSearch"
                    value={txtSearch}
                    onChange={onInputChange}
                />
                <button 
                    className="inner-btn" 
                    onClick={handleClick}
                    style={{display: showButton ? '' : 'none'}}
                    >
                    X
                </button>
            </InputGroup>

            <div className="list-group list-box-article mt-2">
                {
                    articlesTemp.length > 0 
                    ?
                    ( 
                        articlesTemp.map( article => (
                            <BtnArticulo article={article} key={article.articulos_id} />                            
                        ))
                    )
                    : 'SIN VALORES EXISTENTES'
                }
            </div>
        </>
    )
}
