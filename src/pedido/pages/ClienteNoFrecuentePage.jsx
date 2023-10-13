import { useEffect, useRef, useState } from "react";
import { useForm } from "../../hooks";
import { PedidoLayout } from "../layout/PedidoLayout"
import { useDispatch, useSelector } from "react-redux";
import { onCliente, onResetArticlesTemp, onResetMdlBox, onShowMdlArticle } from "../../store";
import { MdlPedido, MdlPedidoArticuloInsert, MdlPedidoArticuloUpdate, TblResumenPedido } from "../components";

const formCliente = {
    formClienteName: ''
}

export const ClienteNoFrecuentePage = () => {

    const dispatch = useDispatch();
    const { cliente, pedido } = useSelector( state => state.pedido );
    const { isShowMdlArticle, isShowMdlArticleDetailsInsert, isShowMdlArticleDetailsUpdate } = useSelector( state => state.ui );

    const inputRef = useRef(null);
    const { formClienteName, onInputChange, onResetForm } = useForm(formCliente);
    const [ isInputDisabled, setIsInputDisabled ] = useState(false);
    const [ isButtonArticlesShow, setIsButtonArticlesShow ] = useState(false);

    useEffect(() => {

        if(cliente.name?.length > 0) return;

        setIsInputDisabled(false);
        onResetForm();

    }, [cliente])

    useEffect(() => {
        inputRef.current.focus();
    }, [])    

    useEffect(() => {

        const cliente = formClienteName.trim().toUpperCase();
        
        if( cliente.length < 4 ){
            dispatch(onCliente({}));
            setIsButtonArticlesShow(false);
        }else{
            dispatch(onCliente({id:'', name:cliente}));
            setIsButtonArticlesShow(true);
        }

    }, [formClienteName]);

    useEffect(() => {
        
        if( pedido.length === 0 ) return;

        setIsInputDisabled(true);

    }, [pedido])

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
