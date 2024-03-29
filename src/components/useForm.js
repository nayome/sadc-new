import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues, validateOnChange = false, validate) {
    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        // console.log("handle change " + e.target.name + " "+ e.target.value)
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        // console.log("handle change ", values)

        if (validateOnChange)
        validate({ [name]: value })
    }

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            marginTop: theme.spacing(2),
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    const {children,...other} = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

