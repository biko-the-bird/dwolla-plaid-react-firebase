import React from "react";
//thisis a react hook
function useFormValidation(INITAL_STATE, validate, authenticate) {
    const [values, setValues] = React.useState(INITAL_STATE);
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setSubmitting] = React.useState(false);

    //listener event triggered by changes
    React.useEffect(() => {
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0;
            if (noErrors) {
                authenticate();
                //console.log("authenticated");
                setSubmitting(false);
            } else {
                setSubmitting(false);

            }
        }

    }, [errors]);

    //function to be onChange
    function handleChange(event) {
        try {
            event.persist();
        } catch(e) {
            console.log(e);
        }
        console.log(event.target.value);
        setValues(previousValues => ({
            ...previousValues,
            [event.target.name]: event.target.value
        }))
    }

    //function to be called onBlur
    function handleBlur() {
        const validationErrors = validate(values);
        setErrors(validationErrors);
      
    }

    //function to be called onSubmit
    function handleSubmit(event) {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitting(true);
        
    }
    return {handleChange, handleBlur, handleSubmit, values, errors, isSubmitting};
}

export default useFormValidation;
