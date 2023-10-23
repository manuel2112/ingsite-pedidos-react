import { Link } from "react-router-dom"
import { PedidoLayout } from "../layout/PedidoLayout"

export const HomePage = () => {
    return (
        <PedidoLayout>
            <div className="col-12 col-sm-6 mb-2">
                <div className="d-grid">
                    <Link to="/pedido" className="btn btn-outline-primary btn-home">
                        REALIZAR PEDIDO
                    </Link>                       
                </div>
            </div>
            <div className="col-12 col-sm-6">
                <div className="d-grid">
                    <Link to="/pedido/listado" className="btn btn-outline-primary btn-home">
                        PEDIDOS REALIZADOS
                    </Link>                      
                </div>
            </div>
        </PedidoLayout>
    )
}
