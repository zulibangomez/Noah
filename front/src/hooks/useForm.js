import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {}) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState({});
//////para actualizar las validaciones///
    useEffect(() => {
        createValidators();
    }, [ formState ])

    useEffect(() => {
        setFormState( initialForm );///para resetear el formulario 
    }, [ initialForm ])
    
    
    const isFormValid = useMemo( () => {//este valor memoriza el formulario

        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false;///se consideda valido si todos los valores son null
        }

        return true;
    }, [ formValidation ])

///se llama cuando hace click actualiza el estado de formstate
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }
///resetea los valores iniciales 
    const onResetForm = () => {
        setFormState( initialForm );
    }
///funcion para crear y validar los campos del formulario 
    const createValidators = () => {
        
        const formCheckedValues = {};
        
        for (const formField of Object.keys( formValidations )) {
            const [ fn, errorMessage ] = formValidations[formField];
            //fn funcion de validacion  y error se muestra cuando la funcion falla
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
    }



    return {
        ...formState,//devuelve todos los valores del formulario cada campo 
        formState,//el estado completa del formulario 
        onInputChange, //funcion que maneja cambios en el formulario 
        onResetForm,///la funcion para resetear formulario 

        ...formValidation, //devuelve las validaciones de cada campo 
        isFormValid 
    }
}