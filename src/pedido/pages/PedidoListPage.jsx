import { useEffect } from "react"
import { PedidoLayout } from "../layout/PedidoLayout"
import { usePedidoStore } from "../../hooks";
import { Spinner, Table } from "react-bootstrap";
import { BtnPedido, HeaderBreadcrumb, MdlBuscarPorFecha, MdlPedidoDetalle } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { onSearchTitleReset, onShowBuscarPorFecha, onShowLoading } from "../../store";

export const PedidoListPage = () => {

    const dispatch = useDispatch();

    const { startPedidosList, pedidoList, searchTitle } = usePedidoStore();
    const { isShowMdlPedidoDetail, isShowMdlBuscarPorFecha, isLoading } = useSelector( state => state.ui );

    useEffect(() => {
        dispatch(onShowLoading());
        dispatch(onSearchTitleReset());
        startPedidosList();
    }, []);

    const onSearch = () => {
        dispatch(onShowBuscarPorFecha());
    }

    return (
        <PedidoLayout>
            <div className="col-12">
                <HeaderBreadcrumb title="PEDIDOS REALIZADOS" />
            </div>
            
            <div className="col-12 mt-0 mb-3 d-flex justify-content-center">
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={onSearch}
                >
                    BUSCAR POR FECHA
                </button>
            </div>

            <div className="col-12">

                {
                    searchTitle != ''
                    ?
                        <h4 className="text-center text-primary">{searchTitle}</h4>
                    :
                    ''
                }
                {
                    pedidoList.length > 0
                    ?
                        <Table striped bordered hover variant="primary">
                            <thead>
                                <tr>
                                    <th className="text-center" width="5%">#</th>
                                    <th className="text-center">FECHA<br />N° PEDIDO</th>
                                    <th className="text-center">CLIENTE<br />TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pedidoList.map( (pedido, idx) => (
                                        <BtnPedido key={ pedido.PREVENTA.preventa_id } pedido={pedido} idx={idx + 1} />
                                    ))
                                }
                            </tbody>
                        </Table>
                    :
                        isLoading
                        ?
                        <div className="d-flex justify-content-center">
                            <Spinner animation="grow" />
                        </div>
                        
                        :
                        <h6 className="text-center text-primary">SIN RESULTADOS</h6>
                        
                }
            </div>
                
            {
                isShowMdlPedidoDetail ? <MdlPedidoDetalle /> : ''
            }
            {
                isShowMdlBuscarPorFecha ? <MdlBuscarPorFecha /> : ''
            }
            
        </PedidoLayout>
    )
}
