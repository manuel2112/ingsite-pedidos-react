import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Table } from "react-bootstrap"
import { onHiddePedidoDetail } from "../../store";
import { currencyFormat, fechaLatina, nameArticle } from "../../helpers";

export const MdlPedidoDetalle = () => {

    const dispatch = useDispatch();
    const { isShowMdlPedidoDetail } = useSelector( state => state.ui );
    const { pedidoSelect } = useSelector( state => state.pedido );    

    const handleClose = () => {
        dispatch(onHiddePedidoDetail());
    }

    return (
        <>
            <Modal
                show={isShowMdlPedidoDetail}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="modal-lg"
                >
                <Modal.Header closeButton>
                    <Modal.Title>DETALLE PEDIDO CÓDIGO { pedidoSelect.PREVENTA.preventa_id }</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Table striped bordered hover className="caption-top">
                        <caption><strong>VENTA</strong></caption>
                        <tbody>
                            <tr>
                                <th className="table-dark text-center">CÓDIGO</th>
                                <td className="text-center">{ pedidoSelect.PREVENTA.preventa_id }</td>
                            </tr>
                            <tr>
                                <th className="table-dark text-center">FECHA</th>
                                <td className="text-center">{ fechaLatina(pedidoSelect.PREVENTA.hora) }</td>
                            </tr>
                            <tr>
                                <th className="table-dark text-center">CLIENTE</th>
                                <td className="text-center">{ pedidoSelect.PREVENTA.retira_nombre }</td>
                            </tr>
                            <tr>
                                <th className="table-dark text-center">VENDEDOR</th>
                                <td className="text-center">{ pedidoSelect.VENDEDOR.usuario_nombre }</td>
                            </tr>
                            <tr>
                                <th className="table-dark text-center">TOTAL</th>
                                <td className="text-center">{ currencyFormat(Number(pedidoSelect.PREVENTA.total)) }</td>
                            </tr>
                        </tbody>
                    </Table>

                    {
                        pedidoSelect.DETALLE.map( detalle => (
                            <Table striped bordered hover className="caption-top" key={ detalle.detpreventa_id }>
                                <caption><strong>{ nameArticle(detalle.familia_nombre, detalle.detalle)}</strong></caption>
                                <tbody>
                                    <tr>
                                        <th className="table-dark text-center">COD. ART.</th>
                                        <td className="text-center">{ detalle.codigo }</td>
                                    </tr>
                                    <tr>
                                        <th className="table-dark text-center">PRECIO</th>
                                        <td className="text-center">{ currencyFormat(Number(detalle.precio)) }</td>
                                    </tr>
                                    <tr>
                                        <th className="table-dark text-center">CANTIDAD</th>
                                        <td className="text-center">{ detalle.cantidad }</td>
                                    </tr>
                                    <tr>
                                        <th className="table-dark text-center">TOTAL</th>
                                        <td className="text-center">{ currencyFormat(Number(detalle.total_retira)) }</td>
                                    </tr>
                                </tbody>
                            </Table>
                        ))
                    }

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
