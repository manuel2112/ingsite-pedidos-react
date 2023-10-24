import { useClienteNoFrecuente } from "../../hooks";
import { PedidoLayout } from "../layout/PedidoLayout";
import { HeaderBreadcrumb, MdlPedido, MdlPedidoArticuloInsert, MdlPedidoArticuloUpdate, TblResumenPedido } from "../components";

export const ClienteNoFrecuentePage = () => {

    const { formClienteName, onInputChange, isInputDisabled, inputRef, isButtonArticlesShow, openMdlArticle, isShowMdlArticle, isShowMdlArticleDetailsInsert, isShowMdlArticleDetailsUpdate, pedido } = useClienteNoFrecuente();

    return (
        <PedidoLayout>
            <div className="col-12 mb-2">
                <HeaderBreadcrumb title="CLIENTE NO FRECUENTE" pedidoPage={true} />
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
