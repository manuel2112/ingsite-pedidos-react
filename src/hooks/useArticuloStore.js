import { useDispatch, useSelector } from "react-redux";
import { pedidoApi } from "../api";
import { onArticles, onResetArticles } from "../store";
import Swal from "sweetalert2";

export const useArticuloStore = () => {

    const dispatch = useDispatch();
    const { articles, articlesTemp, families } = useSelector( state => state.articulo);

    const startArticles = async() => {
        
        Swal.showLoading();
        dispatch(onResetArticles());
        
        try {
            
            const {data} = await pedidoApi.get('/articulos');

            if(data.success){
                dispatch(onArticles(data.info));
                Swal.close();
            }else{
                //TODO ERROR
            }
            
        } catch (error) {
            console.log(error);
        //     dispatch(onLogout('Credenciales incorrectas'));
        //     setTimeout(() => {
        //         dispatch(clearErrorMessage());
        //     }, 10);
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