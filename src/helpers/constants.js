let letLogoIngsite  = '';
let letLogoCliente  = '';
let letUrlApp       = 'https://ingsite.cl/pedidos/test';

if(location.hostname === "localhost" || location.hostname === "127.0.0.1"){
    letLogoIngsite  = '/src';
    letLogoCliente  = '/src';
    letUrlApp  = '';
}

export const logoIngsite        = `${letUrlApp}${letLogoIngsite}/assets/images/logo.png`;
export const logoCliente        = `${letUrlApp}${letLogoCliente}/assets/images/logo-juane.png`;
export const nameToken          = 'token-pedido-juane';
export const titleSite          = 'INGSITE - PEDIDOS JUANE';
export const boolNameArticulo   = true; // TRUE=FAMILIA+ARTICULO FALSE=ARTICULO
export const boolStockNulo      = true; // TRUE=BLOCKEAR FALSE=PASA
export const dateMin            = new Date("2023-09-30 00:00:00");
export const dateMax            = new Date();