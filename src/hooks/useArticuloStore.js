import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { pedidoApi } from "../api";
import { onArticles, onResetArticles } from "../store";
import { nameToken } from "../helpers";
import { useAuthStore } from "./useAuthStore";

export const useArticuloStore = () => {

    const dispatch = useDispatch();
    const { tokenExpired } = useAuthStore();
    const { articles, articlesTemp, families } = useSelector( state => state.articulo);

    const startArticles = async() => {
        
        Swal.showLoading();
        dispatch(onResetArticles());
        
        try {
            
            const {data} = await pedidoApi.get('/article');

            if(data.success){
                localStorage.setItem(nameToken, data.token);
                dispatch(onArticles(data));
                Swal.close();
            }else{
                Swal.fire('ERROR', 'FAVOR RECARGAR SISTEMA', 'error' );
            }
            
        } catch (error) {
            console.log(error);
            tokenExpired( error.response.data.errorToken );
        }

    }

    return {
        //PROPIEDADES
        articles,
        articlesTemp, 
        families,

        //MÉTODOS
        startArticles,
    }
}