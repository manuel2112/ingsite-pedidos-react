import { useAuthStore } from "../../hooks"

export const Navbar = () => {

    const { user, startLogout } = useAuthStore();

    const onLogout = () => {
        startLogout();
    }

    return (
        <>
            <div className="navbar navbar-dark bg-dark mb-2 px-4">

                <span className="navbar-brand">
                    { user.name }
                </span>

                <button 
                    className="btn btn-outline-danger"
                    onClick={onLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Salir</span>
                </button>

            </div>
        </>
    )
}
