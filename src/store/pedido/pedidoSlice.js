import { createSlice } from '@reduxjs/toolkit';

export const pedidoSlice = createSlice({
    name: 'pedido',
    initialState: {
        cliente: {},
        pedido: [],
        arrIdPedido: []
    },
    reducers: {
        onCliente: (state, {payload}) => {
            state.cliente = payload;
        },
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
        onResetValues: ( state ) => {
            state.cliente = {};
            state.pedido = [];
            state.arrIdPedido = [];
        }
    }
});

export const { 
    onCliente, 
    onAddArticlePedido, 
    onResetValues,
    onDeleteArticlePedido,
    onEditArticlePedido,
} = pedidoSlice.actions;