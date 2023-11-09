import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { pedidoApi } from "../api";
import { onArticles, onResetArticles } from "../store";
import { nameToken } from "../helpers";

export const useArticuloStore = () => {

    const dispatch = useDispatch();
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
                //TODO ERROR
                Swal.fire('ERROR', 'FAVOR RECARGAR SISTEMA', 'error' );
            }
            
        } catch (error) {
            console.log(error);
            Swal.fire('ERROR', 'PROTOCOLO NO SOPORTADO', 'error' );
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