import React, { useState, useEffect } from "react";
import "./registerPatient.css";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useForm, Form } from '../../components/useForm';
import Controls from "../../components/controls/Controls";
import Popup from "../../components/controls/Popup";
import Appointment from "../Appointment";
import Notification from "../../components/controls/Notification";
import axios from 'axios';
import history from '../../components/history';

// import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory({forceRefresh:true});

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
];

const bloodGroupItems = [
    { id: '0', title: 'A+' },
    { id: '1', title: 'A-' },
    { id: '2', title: 'B+' },
    { id: '3', title: 'B-' },
    { id: '4', title: 'AB+' },
    { id: '5', title: 'AB-' },
    { id: '6', title: 'O+' },
    { id: '7', title: 'O-' },
]
const referredFromItems = [
    { id: '0', title: 'Patient' },
    { id: '1', title: 'Website' },
    { id: '2', title: 'Others' },
    { id: '3', title: 'Justdail' },
    { id: '4', title: 'Google' },
]

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
        divTest: {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        width: '70%'
    },
    header: {
        backgroundColor: '#253053',
        color: '#fff',
        fontSize: '18px',
        // margin: '5px',
        padding: '10px',
        borderRadius: '4px',
    },
    buttonColor: {
        backgroundColor: '#00c853',
        color: '#fff'
    },
    controlsDiv: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(2),
    }

  }));
  
const intialFValues = {
    patientId:'',
    firstName: '',
    middleName: '',
    lastName:'',
    dob: new Date(),
    ageInYears: '',
    gender: '',
    address:'',
    city: '',
    area:'',
    contactNumber: '',
    alternateNumber: '',
    aadhar: '',
    passportNumber: '',
    emailId: '',
    nationality:'',
    referredBy:'',
    referredFrom: '',
    referredFromDetails:'',
    bloodGroup: '',
    occupation: '',
    creationDate:'',
    medicalHistory: [],
    otherHistory:''
}

function RegisterPatient() {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({isOpen: false, message:'',type:''});
    const [recordForEdit, setRecordForEdit] = useState(null)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
        temp.firstName = fieldValues.firstName? "": "This field is required."
        if ('lastName' in fieldValues)
        temp.lastName = fieldValues.lastName? "": "This field is required."
        if ('gender' in fieldValues)
        temp.gender = fieldValues.gender ? "": "This field is required."
        if ('emailId' in fieldValues)
        temp.emailId = (/$^|.+@.+..+/).test(values.emailId) ? "" : "Email is not valid."
        if('contactNumber' in fieldValues)
        temp.contactNumber = values.contactNumber.length>9? "": "This field is required."

        setErrors({
            ...temp
        })
        if (fieldValues === values)
        return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(intialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
         if(validate()){
             console.log(values);
            axios.post('http://ec2-3-139-74-141.us-east-2.compute.amazonaws.com:9090/ws/rest/IntegrationAPI/patients/upsert',values)
            .then (response => {
                console.log("in submit",response);
                setNotify({isOpen:true,message:'Submitted Successfully',type:'success'})
                resetForm();
            })
            .catch (error => {
                console.log(error);
                setNotify({isOpen:true,message:'Submission Failed',type:'error'})
            })
        }
    }

    const handleClose = (value) => {
        console.log("in handle close")
        console.log(value)
        setOpenPopup(false);
        setNotify({isOpen:true,message:'Apointment added successfully',type:'success'})
        history.push({
            pathname: '/patientDetails',
            state: {detail: value},
          });
    };

    useEffect(() => {
        setValues({
            ...values,
            ["gender"]: "Male"
        })
    }, [])



    const openInPopup = () => {
        console.log("open popup submit")
        // e.preventDefault();
        // setRecordForEdit(item)
        if(validate()){
            axios.post('http://ec2-3-139-74-141.us-east-2.compute.amazonaws.com:9090/ws/rest/IntegrationAPI/patients/upsert',values)
            .then (response => {
                console.log("in popup",response);
                 setNotify({isOpen:true,message:'Submitted Successfully',type:'success'})
                setRecordForEdit(response.data.patientId)
            // setRecordForEdit("98")
                 setOpenPopup(true);
                 resetForm();
            })
            .catch (error => {
                console.log(error);
                setNotify({isOpen:true,message:'Submission Failed',type:'failure'})
            })
         }
    }

    return (
        <div className="registerPatient">
            <div className={classes.root}>
                <div className={classes.header}>
                    Patient Registration 
                </div>
                <div>
                <Paper>
                <Form onSubmit={handleSubmit}>
                    <div className={classes.divTest}>
                        <Controls.Input
                            name="firstName"
                            label="First Name"
                            value={values.firstName}
                            onChange={handleInputChange}
                            error={errors.firstName}
                        />
                        <Controls.Input
                            name="middleName"
                            label="Middle Name"
                            value={values.middleName}
                            onChange={handleInputChange}
                        />
                        <Controls.Input
                            name="lastName"
                            label="Last Name"
                            value={values.lastName}
                            onChange={handleInputChange}
                            error={errors.lastName}
                        />
                    </div>
                    <div className={classes.divTest}>
                        <Controls.RadioGroup
                            name="gender"
                            label="Gender"
                            items={genderItems}
                            value={values.gender}
                            onChange={handleInputChange}
                        />
                        <Controls.DatePicker
                            name="dob"
                            label="Date Of Birth"
                            value={values.dob}
                            onChange={handleInputChange}
                        />
                        <Controls.Input
                            name="ageInYears"
                            label="Age In Years"
                            value={values.ageInYears}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={classes.divTest}>
                    <Controls.Input
                            name="address"
                            label="Address"
                            value={values.address}
                            onChange={handleInputChange}
                        />
                        <Controls.Input
                            name="city"
                            label="City"
                            value={values.city}
                            onChange={handleInputChange}
                        />
                        <Controls.Input
                            name="area"
                            label="Area"
                            value={values.area}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={classes.divTest}>
                        <Controls.Input
                            name="emailId"
                            label="Email ID"
                            value={values.emailId}
                            onChange={handleInputChange}
                            error={errors.emailId}
                        />
                        <Controls.Input
                            name="contactNumber"
                            label="Contact No."
                            value={values.contactNumber}
                            onChange={handleInputChange}
                            error={errors.contactNumber}
                        />
                        <Controls.Input
                            name="alternateNumber"
                            label="Alternate No."
                            value={values.alternateNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={classes.divTest}>
                        <Controls.Input
                            name="aadhar"
                            label="Aadhar No."
                            value={values.aadhar}
                            onChange={handleInputChange}
                        />
                        <Controls.Input
                            name="passportNumber"
                            label="Passport No."
                            value={values.passportNumber}
                            onChange={handleInputChange}
                        />
                        <Controls.Input
                            name="nationality"
                            label="Nationality"
                            value={values.nationality}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={classes.divTest}>
                    <Controls.Select
                            name="bloodGroup"
                            label="Blood Group"
                            options={bloodGroupItems}
                            value={values.bloodGroup}
                            onChange={handleInputChange}
                            error={errors.bloodGroup}
                        /> 
                        <Controls.Input
                            name="occupation"
                            label="Occupation"
                            value={values.occupation}
                            onChange={handleInputChange}
                        />
                        <Controls.Input
                            name="otherHistory"
                            label="Other History"
                            value={values.otherHistory}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={classes.divTest}>

                        <Controls.Input
                            name="referredBy"
                            label="Referred By"
                            value={values.referredBy}
                            onChange={handleInputChange}
                        />
                        <Controls.Select
                            name="referredFrom"
                            label="Referred From"
                            options={referredFromItems}
                            value={values.referredFrom}
                            onChange={handleInputChange}
                        />
                    </div> 

                                {/* <Controls.Checkbox
                                    name="chkbox"
                                    label="Check Box"
                                    value={values.chkBox}
                                    onChange={handleInputChange}
                                />  */}
                    <div className={classes.controlsDiv}>
                        <Controls.Button
                            color="primary"
                            type="submit"
                            name="btn"
                            value="test"
                            text="Add Patient" 
                        />
                        <Controls.Button className={classes.buttonColor}
                            text="Add Patient & Book Apointment"
                            onClick={() => { openInPopup() }}
                            // onClick={()=>setOpenPopup(true)} 
                        />
                    </div>
                </Form>
                </Paper>
                <Popup 
                    openPopup={openPopup} 
                    setOpenPopup={setOpenPopup}
                    title="Add Apointment"
                    handleClose={handleClose}
                >
                    <Appointment 
                        recordForEdit={recordForEdit}
                        onClose={handleClose}
                    />
                </Popup>
                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
                </div>
            </div>
        </div>
      
    )
}

export default RegisterPatient


