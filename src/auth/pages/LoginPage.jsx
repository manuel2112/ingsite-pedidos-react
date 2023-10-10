import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import { logoIngsite, logoCliente } from "../../helpers";
import Swal from 'sweetalert2';
import './LoginPage.css';
import { Form } from 'react-bootstrap';

const loginFormFields = {
    loginUser: '',
    loginPassword: ''
}

export const LoginPage = () => {

    const { loginUser, loginPassword, onInputChange } = useForm(loginFormFields);
    const { startLogin, errorMessage } = useAuthStore();

    useEffect(() => {
        
        if( errorMessage !== undefined ){
            Swal.fire('Error en la autenticación', errorMessage, 'error')
        }

    }, [errorMessage])

    const onSubmit = e => {
        e.preventDefault();

        if( loginUser.length < 4 || loginPassword.length < 4 ){
            return;
        }
        
        startLogin({user: loginUser, pass: loginPassword});
    }

    return (
        <>
            <img src={logoCliente} alt='INGSITE' className='logo-cliente-login' />

            <div className="container login-container">
                <div className="row">
                    <div className="col-12 login-form-1">
                        <h3>SISTEMA DE PEDIDOS</h3>
                        <img src={logoIngsite} alt='INGSITE' className='logo-ingsite' />
                        <Form onSubmit={onSubmit}>
                            <div className="form-group mb-2">
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="USUARIO"
                                    name='loginUser'
                                    value={loginUser}
                                    onChange={onInputChange}                                    
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="CONTRASEÑA"
                                    name='loginPassword'
                                    value={loginPassword}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <input 
                                    type="submit"
                                    className="btnSubmit"
                                    value="INGRESAR" 
                                />
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}