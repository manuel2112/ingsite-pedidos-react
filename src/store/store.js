import { configureStore } from "@reduxjs/toolkit";
import { authSlice, pedidoSlice, uiSlice } from "./";

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        pedido: pedidoSlice.reducer,
        auth: authSlice.reducer
    }
});