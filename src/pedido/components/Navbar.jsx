import { useEffect } from "react";
import { useAuthStore } from "../../hooks"
import { titleSite } from "../../helpers";

export const Navbar = () => {

    const { user, startLogout } = useAuthStore();

    useEffect(() => {
        document.title = titleSite || 'INGSITE - SISTEMA DE PEDIDOS';
    }, [])
    

    const onLogout = () => {
        startLogout();
    }

    return (
        <>
            <div className="navbar navbar-dark bg-dark mb-2 px-4">

                <span className="navbar-brand user">
                    { user.name }
                </span>

                <button 
                    className="btn btn-outline-danger"
                    onClick={onLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>SALIR</span>
                </button>

            </div>
        </>
    )
}
