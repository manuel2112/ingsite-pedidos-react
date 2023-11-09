import { createSlice } from '@reduxjs/toolkit';

export const clienteSlice = createSlice({
    name: 'cliente',
    initialState: {
        clientes: [],
        clientesTemp: [],
        clienteSelect: [],
    },
    reducers: {
        onClientes: ( state, {payload} ) => {
            state.clientes = payload.clientes;
        },
        onGetClientes: ( state ) => {
            state.clientesTemp  = state.clientes;
        },
        onResetClientes: ( state ) => {
            state.clientes      = [];
            state.clientesTemp  = [];
        },
        onClienteSelect: ( state, {payload} ) => {
            state.clienteSelect = payload;
        },
        onClienteSelectReset: ( state ) => {
            state.clienteSelect = [];
        },
        onSearchCliente: ( state, {payload} ) => {
            state.clientesTemp = state.clientes.filter( cliente => cliente.razon.includes(payload))
        },
    }
});

export const { 
    onClientes,
    onGetClientes,
    onResetClientes,
    onClienteSelect,
    onClienteSelectReset,
    onSearchCliente,
} = clienteSlice.actions;