import { createSlice } from '@reduxjs/toolkit';

export const pedidoSlice = createSlice({
    name: 'pedido',
    initialState: {
        pedido: [],
        arrIdPedido: []
    },
    reducers: {
        onAddArticlePedido: (state, {payload}) => {
            state.arrIdPedido = [];
            state.pedido.push(payload);
            state.pedido.map(article => state.arrIdPedido.push(article.articulos_id));
        },
        onEditArticlePedido: (state, {payload}) => {

            state.pedido = state.pedido.filter( article => {

                if( article.articulos_id === payload.articulos_id ){
                    article.cantidad = payload.cantidad;
                    article.valor = payload.valor;
                    article.total = payload.total;

                    return article;
                }

                return article;
            });

        },
        onDeleteArticlePedido: (state, {payload}) => {
            state.arrIdPedido = [];
            state.pedido = state.pedido.filter( article => article.articulos_id != payload );
            state.pedido.map(article => state.arrIdPedido.push(article.articulos_id));
        },
        onResetPedido: ( state ) => {
            state.pedido = [];
            state.arrIdPedido = [];
        }
    }
});

export const {
    onAddArticlePedido, 
    onResetPedido,
    onDeleteArticlePedido,
    onEditArticlePedido,
} = pedidoSlice.actions;