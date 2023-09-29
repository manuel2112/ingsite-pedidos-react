import { Link } from "react-router-dom"
import { PedidoLayout } from "../layout/PedidoLayout"

export const HomePage = () => {
    return (
        <PedidoLayout>
            <div className="col-6">
                <div className="d-grid">
                    <Link to="/pedido" className="btn btn-outline-primary btn-home">
                        REALIZAR PEDIDO
                    </Link>                       
                </div>
            </div>
            <div className="col-6">
                <div className="d-grid">
                    <Link to="/" className="btn btn-outline-primary btn-home">
                        PEDIDOS REALIZADOS
                    </Link>                      
                </div>
            </div>
        </PedidoLayout>
    )
}
