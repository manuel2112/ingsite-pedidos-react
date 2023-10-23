import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useClienteStore } from ".";
import { onArticleReset, onClienteSelect, onClienteSelectReset, onResetArticlesTemp, onResetFormPedido, onResetMdlBox, onResetPedido, onShowMdlArticle } from "../store";

const formCliente = {
    formClienteName: ''
}

export const useClienteNoFrecuente = () => {

    const dispatch = useDispatch();
    const { pedido } = useSelector( state => state.pedido );
    const { isShowMdlArticle, isShowMdlArticleDetailsInsert, isShowMdlArticleDetailsUpdate, isResetForm } = useSelector( state => state.ui );

    const { clienteSelect } = useClienteStore();

    const inputRef = useRef(null);
    const { formClienteName, onInputChange, onResetForm } = useForm(formCliente);
    const [ isInputDisabled, setIsInputDisabled ] = useState(false);
    const [ isButtonArticlesShow, setIsButtonArticlesShow ] = useState(false);

    useEffect(() => {
        inputRef.current.focus();
    }, []) 
    
    useEffect(() => {        
        if( isResetForm ){
            dispatch(onResetPedido());
            dispatch(onClienteSelectReset());
            dispatch(onArticleReset());
            setIsInputDisabled(false);
            dispatch(onResetFormPedido());
            onResetForm();
        }
    }, [isResetForm])

    useEffect(() => {
        if( clienteSelect.name != '' ) return;

        setIsInputDisabled(false);
        onResetForm();
    }, [clienteSelect])   

    useEffect(() => {
        const cliente = formClienteName.trim().toUpperCase();
        
        if( cliente.length < 4 ){
            dispatch(onClienteSelectReset());
            setIsButtonArticlesShow(false);
        }else{
            dispatch(onClienteSelect({id:'', name:cliente}));
            setIsButtonArticlesShow(true);
        }
    }, [formClienteName]);

    useEffect(() => {        
        if( pedido.length > 0 ) {
            setIsInputDisabled(true);
            return;
        }
    }, [pedido]);

    const openMdlArticle = () => {
        dispatch(onResetMdlBox());
        dispatch(onResetArticlesTemp());
        dispatch(onShowMdlArticle());
    }

    return {
        //PROPIEDADES
        formClienteName,
        isInputDisabled,
        inputRef,
        isButtonArticlesShow,
        openMdlArticle,
        isShowMdlArticle,
        isShowMdlArticleDetailsInsert,
        isShowMdlArticleDetailsUpdate,
        pedido,

        //MÉTODOS
        onInputChange,
    }
}
