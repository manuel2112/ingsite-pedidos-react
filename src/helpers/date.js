
export const fechaLatina = (value = '') => {
    const dia   = value.substring(8,10);
    const mes   = value.substring(5,7);
    const anno  = value.substring(0,4);
    const hora  = value.substring(11,19);
    const fecha = `${dia}/${mes}/${anno} ${hora}`;
    return fecha;
}

export const fechaLatinaSinHora = (value = '') => {
    const dia   = value.substring(8,10);
    const mes   = value.substring(5,7);
    const anno  = value.substring(0,4);
    const fecha = `${dia}/${mes}/${anno}`;
    return fecha;
}