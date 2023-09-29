import PropTypes from 'prop-types';
import { logoCliente } from "../../helpers"
import { Navbar } from "../components"
import { Link } from 'react-router-dom';

export const PedidoLayout = ({children}) => {
    return (
        <>
            <Navbar />

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Link to="/">
                            <img src={logoCliente} alt='INGSITE' className='logo-cliente-site' />
                        </Link>
                    </div>
                </div>
                <div className="row mt-5">
                    {children}
                </div>
            </div>
        </>
    )
}

PedidoLayout.propTypes = {
    children: PropTypes.node,
};
