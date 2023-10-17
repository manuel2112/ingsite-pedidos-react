import { useDispatch, useSelector } from "react-redux";
import { useClienteStore } from "./useClienteStore";
import { useEffect, useState } from "react";
import { useForm } from "./useForm";
import { onArticleReset, onClienteSelectReset, onGetClientes, onResetArticlesTemp, onResetFormPedido, onResetMdlBox, onResetPedido, onSearchCliente, onShowMdlArticle } from "../store";

const formCliente = {
    formClienteName: ''
}

export const useClienteFrecuente = () => {

    const dispatch = useDispatch();

    const { pedido } = useSelector( state => state.pedido );
    const { clientesTemp, clienteSelect } = useClienteStore();
    const { isShowMdlArticle, isShowMdlArticleDetailsInsert, isShowMdlArticleDetailsUpdate, isResetForm } = useSelector( state => state.ui );

    const [ isDisabled, setIsDisabled ] = useState(false);
    const [ showButton, setShowButton ] = useState(false);
    const [ isButtonChangeClienteShow, setIsButtonChangeClienteShow ] = useState(true);
    const { formClienteName, onInputChange, onResetForm, setFormState } = useForm(formCliente);

    useEffect(() => {        
        dispatch(onGetClientes());
    }, [])
    
    useEffect(() => {
        
        if( isResetForm ){
            dispatch(onResetPedido());
            dispatch(onClienteSelectReset());
            dispatch(onArticleReset());
            onResetForm();
            dispatch(onResetFormPedido());
        }
    }, [isResetForm])
    
    useEffect(() => {
        
        if( pedido.length === 0 ) {
            setIsButtonChangeClienteShow(true);
            return;
        }

        setIsButtonChangeClienteShow(false);

    }, [pedido])

    useEffect(() => {

        if( clienteSelect.id == undefined ) {
            setIsDisabled(false);
            return;
        }

        setIsDisabled(true);
        setShowButton(false);
        setFormState({ formClienteName: clienteSelect.name });

    }, [clienteSelect])

    useEffect(() => {

        if( clienteSelect.id != undefined ) return;

        const term = formClienteName.toUpperCase().trim(); 
        
        if( term.length === 0 ) {
            setShowButton(false);
            return;
        }
        
        setShowButton(true);
        dispatch(onSearchCliente(term));

    }, [formClienteName])

    const onChangeCliente = () => {
        setIsDisabled(false);
        dispatch(onGetClientes());
        dispatch(onClienteSelectReset());
        onResetForm();
    }

    const openMdlArticle = () => {
        dispatch(onResetMdlBox());
        dispatch(onResetArticlesTemp());
        dispatch(onShowMdlArticle());
    }

    const handleClick  = () => {
        setShowButton(false);
        onResetForm();
        dispatch(onGetClientes());
    };


    return {
        //PROPIEDADES
        formClienteName,
        isDisabled,
        showButton,
        clientesTemp,
        isButtonChangeClienteShow,
        isShowMdlArticle, 
        isShowMdlArticleDetailsInsert, 
        isShowMdlArticleDetailsUpdate,
        pedido,

        //MÉTODOS
        onInputChange,
        handleClick,
        openMdlArticle,
        onChangeCliente,

    }
}
