import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Appointment from "../Appointment";
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
      },
      main: {
        height: '100%'
      }
}))

export default function PatientAppointment(props) {
    const { recordForEdit } = props;
    const classes = useStyles();
    const [notify, setNotify] = useState({isOpen: false, message:'',type:''});


    console.log("in appts",recordForEdit);
    
    const handleClose = (value) => {
        console.log("in handle close")
        console.log(value)
        setNotify({isOpen:true,message:'Apointment added successfully',type:'success'})
    };

    return (
        <Paper className={classes.root}>
            <div className={classes.header}>
                Add Apointment
            </div>
                <Appointment 
                        recordForEdit={recordForEdit}
                        onClose={handleClose}
                />
                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
            </Paper>
    )
}
