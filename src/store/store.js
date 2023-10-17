import { configureStore } from "@reduxjs/toolkit";
import { articuloSlice, authSlice, clienteSlice, pedidoSlice, uiSlice } from "./";

export const store = configureStore({
    reducer: {
        ui:         uiSlice.reducer,
        articulo:   articuloSlice.reducer,
        auth:       authSlice.reducer,
        pedido:     pedidoSlice.reducer,
        cliente:    clienteSlice.reducer,
    }
});