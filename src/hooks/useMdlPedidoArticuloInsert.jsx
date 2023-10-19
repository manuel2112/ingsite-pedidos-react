import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "./useForm";
import { onAddArticlePedido, onArticleReset, onHiddeMdlArticleDetailsInsert, onShowMdlArticle } from "../store";

export const useMdlPedidoArticuloInsert = () => {
    
    const dispatch = useDispatch();

    const { user } = useSelector( state => state.auth);
    const { articleSelect } = useSelector( state => state.articulo);
    const { isShowMdlArticleDetailsInsert } = useSelector( state => state.ui);

    const { cantidad, valor, total, onInputChange, onResetForm, formState, setFormState } = useForm(articleSelect);

    const [isBtnDisabled, setIsBtnDisabled] = useState(true)

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        const type = typeof Number(cantidad);

        if( type != 'number' || (cantidad <= 0) || !cantidad || (valor <= 0) ){
            setIsBtnDisabled(true);
            setFormState({
                ...formState,
                total: 0
            });
            return;
        }
        
        setFormState({
            ...formState,
            cantidad: Number(cantidad),
            valor: Number(valor),
            total: Number(cantidad * valor)
        });
        setIsBtnDisabled(false);

    }, [cantidad, valor]);

    const handleClose = () => {
        onResetForm();
        dispatch(onArticleReset());
        dispatch(onShowMdlArticle());
        dispatch(onHiddeMdlArticleDetailsInsert());
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(onAddArticlePedido(formState));
        dispatch(onHiddeMdlArticleDetailsInsert());
    }

    return {
        //PROPIEDADES
        isShowMdlArticleDetailsInsert,
        articleSelect,
        valor,
        user,
        cantidad,
        inputRef,
        total,
        isBtnDisabled,

        //MÉTODOS
        handleClose,
        onSubmit,
        onInputChange,
    }
}
