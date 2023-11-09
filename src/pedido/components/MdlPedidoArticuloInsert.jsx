import { Button, Form, Modal } from "react-bootstrap"
import { useMdlPedidoArticuloInsert } from "../../hooks";
import { nameArticle } from "../../helpers";

export const MdlPedidoArticuloInsert = () => {

    const { isShowMdlArticleDetailsInsert, handleClose, articleSelect, onSubmit, valor, user, onInputChange, cantidad, inputRef, total, isBtnDisabled  } = useMdlPedidoArticuloInsert();

    return (
        <>
            <Modal
                show={isShowMdlArticleDetailsInsert}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="modal-lg"
                >
                <Modal.Header closeButton>
                    <Modal.Title>{ nameArticle(articleSelect.familia.familia_nombre, articleSelect.articulos_descripcion) }</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Form onSubmit={onSubmit}>

                        <div className="row mb-3">
                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label className="mb-0">ARTÍCULO:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="ARTÍCULO..." 
                                        value={articleSelect.articulos_descripcion}
                                        disabled
                                        />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row mb-3">                        
                            <div className="col-6">
                                <Form.Group>
                                    <Form.Label className="mb-0">CÓDIGO:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="CÓDIGO..." 
                                        value={articleSelect.articulos_codigo}
                                        disabled
                                        />
                                </Form.Group>
                            </div>                            
                            <div className="col-6">
                                <Form.Group className="mb-2">
                                    <Form.Label className="mb-0">UNIDAD:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="UNIDAD..." 
                                        value={articleSelect.articulos_unidad}
                                        disabled
                                        />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row mb-3">                        
                            <div className="col-6">
                                <Form.Group>
                                    <Form.Label className="mb-0">STOCK:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="STOCK..." 
                                        value={articleSelect.articulos_stock}
                                        disabled
                                        />
                                </Form.Group>
                            </div>                            
                            <div className="col-6">
                                <Form.Group className="mb-2">
                                    <Form.Label className="mb-0">PRECIO VENTA:</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="PRECIO VENTA..." 
                                        name="valor"
                                        value={valor}
                                        disabled={ user.perfil != '1' ? true : false }
                                        onChange={onInputChange}
                                        />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row mb-3">                        
                            <div className="col-6">
                                <Form.Group>
                                    <Form.Label className="mb-0">CANTIDAD:</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="CANTIDAD..."
                                        name="cantidad"
                                        value={ cantidad }
                                        onChange={onInputChange}
                                        ref={inputRef}
                                        />
                                </Form.Group>
                            </div>                            
                            <div className="col-6">
                                <Form.Group className="mb-2">
                                    <Form.Label className="mb-0">TOTAL $:</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="TOTAL..."
                                        name="total"
                                        value={total}
                                        onChange={onInputChange}
                                        disabled
                                        />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 d-grid gap-2">
                                <Button 
                                    variant="primary" 
                                    type="submit"
                                    disabled={isBtnDisabled}>
                                    AGREGAR
                                </Button>
                            </div>
                        </div>
                    </Form>
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
