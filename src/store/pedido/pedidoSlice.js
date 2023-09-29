import { createSlice } from '@reduxjs/toolkit';

export const pedidoSlice = createSlice({
    name: 'pedido',
    initialState: {
        counter: 10
    },
    reducers: {
        incrementPedido: (state, /* action */ ) => {
            state.counter += 1;
        },
    }
});

export const { incrementPedido } = pedidoSlice.actions;