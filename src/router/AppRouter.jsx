import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../hooks';
import { LoginPage } from '../auth';
import { ClienteFrecuentePage, ClienteNoFrecuentePage, ClienteNuevo, HomePage, PedidoPage } from '../pedido';

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {

        checkAuthToken();

    }, [])
    
    if( status === 'checking'){
        return (
            'Cargando...'
        )
    }

    return (
        <Routes>

            {
                ( status === 'not-authenticated')
                ? 
                (
                    <>
                        <Route path='/auth/*' element={<LoginPage />} />
                        <Route path='/*' element={<Navigate to='/auth/login' />} />
                    </>
                )
                :
                (
                    <>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/pedido' element={<PedidoPage />} />
                        <Route path='/pedido/cliente-frecuente' element={<ClienteFrecuentePage />} />
                        <Route path='/pedido/cliente-no-frecuente' element={<ClienteNoFrecuentePage />} />
                        <Route path='/pedido/cliente-nuevo' element={<ClienteNuevo />} />
                        <Route path='/*' element={<Navigate to='/' />} />
                    </>
                ) 
            }            
            

            

        </Routes>
    )
}
