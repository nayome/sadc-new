import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import axios from 'axios';
import Notification from "../../components/controls/Notification";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
      },
      header: {
          height: '72px',
          backgroundColor: '#253053',
          color: '#fff',
          fontSize: '18px',
          padding: '20px',
          borderTopLeftRadius:'4px',
          borderTopRightRadius:'4px',
      },
      content: {
        backgroundColor: '#fff',
        padding:'20px',
        display: 'grid',
        gap: '20px',
      },
      buttonStyle: {
        backgroundColor: "#388e3c",
        color: "#fff"
      }
}))

const intialFValues = {
    patientId: '',
    notes: '',
}

export default function PatientNotes(props) {
    const { recordForEdit,  onClose } = props;
    const classes = useStyles();
    const [notify, setNotify] = useState({isOpen: false, message:'',type:''});
    // console.log("in patient notes",recordForEdit);

    const validate = (fieldValues = values) => {
         let temp = { ...errors }
        if ('notes' in fieldValues)
        temp.notes = fieldValues.notes? "": "Please enter some notes before saving."

        setErrors({
            ...temp
        })

        setValues({
            ...values,
            ["patientId"]: recordForEdit
        })
        if (fieldValues == values)
        return Object.values(temp).every(x => x == "")
    }


    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(intialFValues, true, validate);


    useEffect(() => {
        if (recordForEdit != null)
        console.log("record for edit", recordForEdit)
            setValues({
                ...values,
                ["patientId"]: recordForEdit
            })
        console.log(values)
    }, [])


    const handleSubmit = e => {
        e.preventDefault()
        console.log(values)
        if(validate()){
            axios.post(' http://ec2-3-139-74-141.us-east-2.compute.amazonaws.com:9090/ws/rest/IntegrationAPI/patients/upsert',values)
            .then (response => {
                console.log(response);
                setNotify({isOpen:true,message:'Note added successfully',type:'success'})
                resetForm();
            })
            .catch (error => {
                console.log(error);
                setNotify({isOpen:true,message:'Note adding Failed',type:'error'})
            })
        }

    }

    return (
        <Paper className={classes.root}>
            <div className={classes.header}>
               Add Notes 
            </div>
            <Form onSubmit={handleSubmit}>
                <div className={classes.content}>
                    <TextareaAutosize
                        aria-label="maximum height"
                        minRows={15}
                        maxRows={15}
                        placeholder="Add notes here"
                        onChange={handleInputChange}
                        name="notes"
                        value={values.notes}
                        style={{ width: '100%', fontSize:'15px' }}
                    />
                    <div>
                        <Controls.Button className={classes.buttonStyle}
                            type="submit"
                            name="btn"
                            value="test"
                            text="Add Notes"
                        />
                    </div>
                </div>
            </Form>
            <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
        </Paper>
    )
}
