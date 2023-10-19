import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRut } from "react-rut-formatter";
import { useClienteStore, useForm } from "./";
import { onHiddeClienteInsert } from "../store";

const formNuevoCliente = {
    rutForm: '',
    nombreForm: '',
    direccionForm: '',
    ciudadForm: '',
    fonoForm: '',
    isCreditForm: '',
    montoCreditForm: '',
}
const formValidations = {
    nombreForm: [ (value) => value.length >= 4, 'EL NOMBRE ES REQUERIDO'],
    direccionForm: [ (value) => value.length >= 4, 'LA DIRECCIÓN ES REQUERIDA'],
    ciudadForm: [ (value) => value.length >= 4, 'LA CIUDAD ES REQUERIDA'],
    fonoForm: [ (value) => value.length === 9, 'EL TELÉFONO DEBE TENER 9 DÍGITOS'],
    isCreditForm: [ (value) => value.length > 0, 'SELECCIONE UNA OPCIÓN']
}

export const useMdlClienteInsert = () => {

    const dispatch = useDispatch();
    const { isShowMdlClienteInsert } = useSelector( state => state.ui );
    const { startClienteInsert } = useClienteStore();
    
    const {  nombreForm, direccionForm, ciudadForm, fonoForm, isCreditForm, montoCreditForm, formState, setFormState, nombreFormValid, direccionFormValid, ciudadFormValid, fonoFormValid, isCreditFormValid, isFormValid } = useForm(formNuevoCliente, formValidations);

    const { rut, updateRut, isValid } = useRut();

    const [rutValid, setRutValid] = useState('')
    const [montoValid, setMontoValid] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if( isCreditForm === 'SI' ){
            if( montoCreditForm === '' ){
                setMontoValid('MONTO OBLIGATORIO.');
                return;
            }
            if( isNaN(+montoCreditForm) || montoCreditForm <= 0 ){
                setMontoValid('MONTO NUMÉRICO Y MAYOR A CERO.');
                return;
            }
            setMontoValid('');
        }
    }, [formState]);

    useEffect(() => {
        if( !isValid && (rut.raw != '') ){
            setRutValid('RUT NO VÁLIDO');
            return;
        }

        setRutValid('');
        setFormState({
            ...formState,
            rutForm: rut.formatted
        });
    }, [rut.raw])
    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value.toUpperCase()
        });
    }    

    const onInputClick = (e, value) => {
        setFormState({
            ...formState,
            isCreditForm: value
        });
    }    

    const handleClose = () => {
        dispatch(onHiddeClienteInsert());
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        
        if( (montoValid != '') && (isCreditForm === 'SI') ) return;
        if( !isValid && (rut.raw != '') ) return;
        if( !isFormValid ) return;
        
        startClienteInsert(formState);
    }

    return {
        //PROPIEDADES
        isShowMdlClienteInsert,
        formSubmitted,
        rut,
        nombreFormValid,
        nombreForm,
        direccionFormValid,
        direccionForm,
        ciudadFormValid,
        ciudadForm,
        fonoFormValid,
        fonoForm,
        isCreditForm,
        isCreditFormValid,
        montoValid,
        montoCreditForm,

        //MÉTODOS
        handleClose,
        onSubmit,
        rutValid,
        updateRut,
        onInputChange,
        onInputClick,
    }
}
