import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useClienteStore } from "../../hooks"
import { PedidoLayout } from "../layout/PedidoLayout"
import { onArticleReset, onClienteSelectReset, onResetFormPedido, onResetMdlBox, onResetPedido, onShowMdlArticle } from "../../store";
import { MdlPedido, MdlPedidoArticuloInsert, MdlPedidoArticuloUpdate, TblResumenPedido } from "../components";

export const ClienteNuevo = () => {

    const dispatch = useDispatch();

    const { clienteSelect } = useClienteStore();
    const { pedido } = useSelector( state => state.pedido );
    const { isShowMdlArticle, isShowMdlArticleDetailsInsert, isShowMdlArticleDetailsUpdate, isResetForm } = useSelector( state => state.ui ); 
    
    useEffect(() => {        
        if( isResetForm ){
            dispatch(onResetPedido());
            dispatch(onClienteSelectReset());
            dispatch(onArticleReset());
            dispatch(onResetFormPedido());
        }
    }, [isResetForm])

    const openMdlArticle = () => {
        dispatch(onResetMdlBox());
        dispatch(onShowMdlArticle());
    }

    return (
        <PedidoLayout>
            <div className="col-12">
                <h1>Cliente Nuevo</h1>
            </div>

            <div className="col-12">
                <form>
                    <input 
                        type="text" 
                        className="form-control text-uppercase" 
                        placeholder="INGRESAR CLIENTE" 
                        name="formClienteName"
                        defaultValue={clienteSelect.name}
                        disabled
                    />
                </form>
            </div>

            <div className="col-12 mt-4 mb-3 d-flex justify-content-center">
                <button
                    type="button"
                    className="btn btn-outline-primary"
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
