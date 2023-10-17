import { useEffect, useRef, useState } from "react";
import { useClienteStore, useForm } from "../../hooks";
import { PedidoLayout } from "../layout/PedidoLayout"
import { useDispatch, useSelector } from "react-redux";
import { onArticleReset, onClienteSelectReset, onClienteSelect, onResetArticlesTemp, onResetFormPedido, onResetMdlBox, onResetPedido, onShowMdlArticle } from "../../store";
import { MdlPedido, MdlPedidoArticuloInsert, MdlPedidoArticuloUpdate, TblResumenPedido } from "../components";

const formCliente = {
    formClienteName: ''
}

export const ClienteNoFrecuentePage = () => {

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

    return (
        <PedidoLayout>
            <div className="col-12">
                <h1>Cliente No Frecuente</h1>
            </div>

            <div className="col-12">
                <form>
                    <input 
                        type="text" 
                        className="form-control text-uppercase" 
                        placeholder="INGRESAR CLIENTE" 
                        name="formClienteName"
                        value={formClienteName}
                        onChange={onInputChange}
                        disabled={isInputDisabled}
                        ref={inputRef}
                    />
                </form>
            </div>

            <div className="col-12 mt-4 mb-3 d-flex justify-content-center">
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    style={{ display: isButtonArticlesShow ? 'block' : 'none' }}
                    onClick={openMdlArticle}
                >
                    AGREGAR ARTÍCULO
                </button>
            </div>

            {
                isShowMdlArticle ? <MdlPedido /> : ''
            }
            {
                isShowMdlArticleDetailsInsert ? <MdlPedidoArticuloInsert /> : ''
            }
            {
                isShowMdlArticleDetailsUpdate ? <MdlPedidoArticuloUpdate /> : ''
            }
            {
                pedido.length > 0 ? <TblResumenPedido /> : ''
            }            
            
        </PedidoLayout>
    )
}
