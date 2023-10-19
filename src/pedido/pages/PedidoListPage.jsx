import { useEffect } from "react"
import { PedidoLayout } from "../layout/PedidoLayout"
import { usePedidoStore } from "../../hooks";
import { Table } from "react-bootstrap";
import { BtnPedido, MdlPedidoDetalle } from "../components";
import { useSelector } from "react-redux";

export const PedidoListPage = () => {

    const { startPedidosList, pedidoList } = usePedidoStore();
    const { isShowMdlPedidoDetail } = useSelector( state => state.ui );

    useEffect(() => {
        startPedidosList();
    }, []);

    return (
        <PedidoLayout>
            <div className="col-12">
                <h1>ÚLTIMOS PEDIDOS REALIZADOS</h1>
            </div>

            <div className="col-12">
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
            </div>
                
            {
                isShowMdlPedidoDetail ? <MdlPedidoDetalle /> : ''
            }
            
        </PedidoLayout>
    )
}
