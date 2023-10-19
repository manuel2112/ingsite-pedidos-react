import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "./useForm";
import { onEditArticlePedido, onHiddeMdlArticleDetailsUpdate } from "../store";

export const useMdlPedidoArticuloUpdate = () => {
    
    const dispatch = useDispatch();

    const { user } = useSelector( state => state.auth);
    const { articleSelect } = useSelector( state => state.articulo);
    const { isShowMdlArticleDetailsUpdate } = useSelector( state => state.ui);

    const [isBtnDisabled, setIsBtnDisabled] = useState(true)

    const { cantidad, valor, total, onInputChange, formState, setFormState } = useForm(articleSelect);

    useEffect(() => {        
        setFormState({
            ...formState,
            cantidad: Number(articleSelect.cantidad),
            valor: Number(articleSelect.valor),
            total: Number(articleSelect.total)
        });
    }, []) 

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

    }, [cantidad, valor])

    const handleClose = () => {
        dispatch(onHiddeMdlArticleDetailsUpdate());
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(onEditArticlePedido(formState));
        dispatch(onHiddeMdlArticleDetailsUpdate());
    }

    return {
        //PROPIEDADES
        isShowMdlArticleDetailsUpdate,
        articleSelect,
        valor,
        user,
        cantidad,
        total,
        isBtnDisabled,

        //MÉTODOS
        handleClose,
        onSubmit,
        onInputChange,
    }
}
