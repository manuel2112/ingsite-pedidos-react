import { Button, ButtonGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { onGetArticles, onHiddeMdlArticle, onShowMdlArticleBox, onShowMdlFamilyBox } from "../../store";
import { MdlPedidoArticulo } from "./";
import { MdlPedidoFamilia } from "./MdlPedidoFamilia";

export const MdlPedido = () => {

    const dispatch = useDispatch();
    const { arrIdPedido } = useSelector( state => state.pedido );
    const { isShowMdlArticle, isShowMdlArticleBox, isShowMdlFamilyBox } = useSelector( state => state.ui);

    const handleClose = () => {
        dispatch(onHiddeMdlArticle());
    }
    const onProducts = () => {
        dispatch(onShowMdlArticleBox());
        dispatch(onGetArticles(arrIdPedido));
    }
    const onFamily = () => {
        dispatch(onShowMdlFamilyBox());
    }

    return (
        <>
            <Modal
                show={isShowMdlArticle}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="modal-lg"
                >
                <Modal.Header closeButton>
                    <Modal.Title>SELECCIONAR ARTÍCULO</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <div className="row text-center">
                        <div className="col-12">
                            <h4>BUSCAR POR:</h4>
                        </div>
                        <div className="col-12">
                            <ButtonGroup size="lg">
                                <Button 
                                    variant={ isShowMdlArticleBox ? 'primary' : 'outline-primary' }
                                    onClick={onProducts}>
                                    PRODUCTO
                                </Button>
                                <Button 
                                    variant={ isShowMdlFamilyBox ? 'primary' : 'outline-primary' }
                                    onClick={onFamily}>
                                    FAMILIA
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div className="col-12 mt-3">

                            {
                                isShowMdlArticleBox ? <MdlPedidoArticulo /> : ''
                            }
                            {
                                isShowMdlFamilyBox ? <MdlPedidoFamilia /> : ''
                            }
                            
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        onClick={handleClose}>
                        CERRAR
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
