import { useEffect } from "react"
import { Link } from "react-router-dom"
import { PedidoLayout } from "../layout/PedidoLayout"
import { useArticuloStore } from "../../hooks";
import { useDispatch } from "react-redux";
import { onResetValues } from "../../store";

export const PedidoPage = () => {

    const dispatch = useDispatch();
    
    const { startArticles } = useArticuloStore();
    useEffect(() => {
        startArticles();
        dispatch(onResetValues());
    }, [])
    

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
