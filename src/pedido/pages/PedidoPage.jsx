import { Link } from "react-router-dom"
import { PedidoLayout } from "../layout/PedidoLayout"

export const PedidoPage = () => {
    return (
        <PedidoLayout>
            <div className="col-4">
                <div className="d-grid">
                    <Link to="/pedido/cliente-frecuente" className="btn btn-outline-primary btn-cliente">
                        CLIENTE FRECUENTE
                    </Link>                       
                </div>
            </div>
            <div className="col-4">
                <div className="d-grid">
                    <Link to="/pedido/cliente-no-frecuente" className="btn btn-outline-primary btn-cliente">
                        CLIENTE NO FRECUENTE
                    </Link>                      
                </div>
            </div>
            <div className="col-4">
                <div className="d-grid">
                    <Link to="/pedido/cliente-nuevo" className="btn btn-outline-primary btn-cliente">
                        CLIENTE NUEVO
                    </Link>                      
                </div>
            </div>
        </PedidoLayout>
    )
}
