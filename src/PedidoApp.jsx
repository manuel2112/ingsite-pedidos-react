import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router"
import { Provider } from "react-redux"
import { store } from "./store"

export const PedidoApp = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
            {/* <BrowserRouter basename="/pedidos/test"> */}
                <AppRouter />
            </BrowserRouter>
        </Provider>
    )
}