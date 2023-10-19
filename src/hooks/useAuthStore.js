import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { pedidoApi } from "../api";
import { nameToken } from "../helpers";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {

    const dispatch = useDispatch();
    const {status, user, errorMessage} = useSelector( state => state.auth );

    const startLogin = async({user, pass}) => {
        
        Swal.showLoading();
        dispatch(onChecking());
        
        try {

            const login = {
                user,
                pass 
            }
            const {data} = await pedidoApi.post('/usuario', {login});

            if(data.success){
                localStorage.setItem(nameToken, data.token);
                dispatch(onLogin({name: data.user_name, id: data.user_id, perfil: data.user_perfil}));
                Swal.close();
            }else{
                dispatch(onLogout(data.msg));
                setTimeout(() => {
                    dispatch(clearErrorMessage());
                }, 10);
            }
            
        } catch (error) {
            console.log(error);
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }

    }

    const checkAuthToken = async() => {

        Swal.showLoading();
        const token = localStorage.getItem(nameToken);

        if( !token ){
            Swal.close();
            return dispatch(onLogout()); 
        }

        try {

            const {data} = await pedidoApi.get(`/tokenRenew`);
            
            if(data.success){
                localStorage.setItem(nameToken, data.token);
                dispatch(onLogin({name: data.user_name, id: data.user_id, perfil: data.user_perfil}));
                Swal.close();
            }else{
                localStorage.clear();
                dispatch(onLogout());
                Swal.close();
            }

        } catch (error) {
            console.log(error);
            localStorage.clear();
            dispatch(onLogout());
            Swal.close();
        }

    }

    const startLogout = () => {

        Swal.showLoading();
        localStorage.clear();
        dispatch(onLogout());
        Swal.close();

    }

    return {
        //PROPIEDADES
        status, 
        user, 
        errorMessage,

        //MÉTODOS
        startLogin,
        checkAuthToken,
        startLogout

    }
}