import { useClienteFrecuente } from "../../hooks";
import { BtnCliente, HeaderBreadcrumb, MdlPedido, MdlPedidoArticuloInsert, MdlPedidoArticuloUpdate, TblResumenPedido } from "../components";
import { PedidoLayout } from "../layout/PedidoLayout";
import { Form, FormControl, InputGroup } from "react-bootstrap";

export const ClienteFrecuentePage = () => {

    const { formClienteName, onInputChange, isDisabled, handleClick, showButton, clientesTemp, openMdlArticle, isButtonChangeClienteShow, onChangeCliente, isShowMdlArticle, isShowMdlArticleDetailsInsert, isShowMdlArticleDetailsUpdate, pedido } = useClienteFrecuente();

    return (
        <PedidoLayout>
            <div className="col-12">
                <HeaderBreadcrumb title="CLIENTE FRECUENTE" pedidoPage={true} />
            </div>

            <div className="col-12">
                <Form>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="BUSCAR CLIENTE..."
                            type="text"
                            className="text-uppercase" 
                            name="formClienteName"
                            value={formClienteName}
                            onChange={onInputChange}
                            disabled={isDisabled}
                        />
                        <button 
                            type="button"
                            className="inner-btn" 
                            onClick={handleClick}
                            style={{display: showButton ? '' : 'none'}}
                            >
                            X
                        </button>
                    </InputGroup>
                </Form>
            </div>

            <div className="list-group list-box-article mt-2">
                {
                    !isDisabled
                    ?
                        clientesTemp.length > 0
                        ?
                        clientesTemp.map( (cliente) => 
                            (
                                <BtnCliente key={cliente.clientes_id} cliente={cliente} />
                            ) 
                        )                   
                        : 
                        (
                            <h1 className="text-center text-warning mt-2">- SIN CLIENTES PARA SELECCIONAR -</h1>
                        )
                    :
                    (
                        <div className="col-12 mt-1 mb-3 d-flex justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-primary mx-3"
                                onClick={openMdlArticle}
                            >
                                AGREGAR ARTÍCULO
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                style={{ display: isButtonChangeClienteShow ? 'block' : 'none' }}
                                onClick={onChangeCliente}
                            >
                                CAMBIAR CLIENTE
                            </button>
                        </div>
                    )
                }
                
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

            </div>

        </PedidoLayout>
    )
}
