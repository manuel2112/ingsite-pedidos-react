import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap";
import { PedidoLayout } from "../layout/PedidoLayout"
import { MdlClienteInsert } from "../components";
import { useArticuloStore, useClienteStore } from "../../hooks";
import { onShowClienteInsert } from "../../store";

export const PedidoPage = () => {

    const dispatch = useDispatch();    
    const { startArticles } = useArticuloStore();
    const { startClientes } = useClienteStore();
    const { isShowMdlClienteInsert } = useSelector( state => state.ui );
    
    useEffect(() => {
        startArticles();
        startClientes();
    }, []);

    const newClient = () => {
        dispatch(onShowClienteInsert());
    }
    

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
                    <Button
                        type="button"
                        variant="outline-primary"
                        className="btn-cliente"
                        onClick={newClient}>
                    CLIENTE NUEVO
                    </Button>
                    {/* <Link to="/pedido/cliente-nuevo" className="btn btn-outline-primary btn-cliente">
                        CLIENTE NUEVO
                    </Link>                       */}
                </div>
            </div>

            {
                isShowMdlClienteInsert ? <MdlClienteInsert /> : ''
            }

        </PedidoLayout>
    )
}
