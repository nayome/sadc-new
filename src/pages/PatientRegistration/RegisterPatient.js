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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { useLocation } from "react-router-dom";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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
        marginLeft: '1px',
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
     divTest: {
        display: 'flex',
        gap: '15px',
        justifyContent:'center',
        alignItems:'center',
        width: '100%',
        paddingLeft: '20px',
        paddingBottom: '10px'
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
    },
    subContainer: {
        display: 'flex',
        gap: '25px',
    },
    formContainer: {
        width: '75%',
    },
    medCondtnContainer :{
        width: '25%',
        paddingTop: '15px',
        display: 'block',
        gap: '10px',
        paddingRight:'20px',
        height: '100%',
    },
    tableStyling: {
        border: '1px solid red'
    },
    patientsTable: {
        width: '100%',
        fontSize: '16px',
        borderSpacing: '0',
        borderCollapse: 'collapse',
        display: 'block',
},
    patientsTableTd: {
        border: '1px solid rgb(170, 164, 164)',
        padding: '10px',
    },
    patientsTableTr: {
        '&:hover': {
            backgroundColor: '#ddd',
        }
    },
    patientsTableHead: {
               display: 'block',
    },
    patientsTableBody: {
               display: 'block',
                height: '200px',
                overflowY: 'auto',
                overflowX: 'auto',
    },
    iconStyling: {
         fontSize: '20px !important',
         alignItems: 'bottom',
         marginRight: '8px',       
        verticalAlign: 'bottom',
  }
  }));
  
const intialFValues = {
    patientId:'',
    firstName: '',
    middleName: '',
    lastName:'',
    dob: new Date(),
    ageInYears: '',
    gender: 'Male',
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
    const [medicalConditions, setMedicalConditions] = useState([])
    const [medicalConditionsAll, setMedicalConditionsAll] = useState([])
    const [selectedMC, setSelectedMC] = useState([])
    const [inputValue, setInputValue] = useState([])
    const history = useHistory();
    const location = useLocation();

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
        temp.contactNumber = values.contactNumber.length >= 9 ? "": "Please enter 10 digit phone number"

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
                setNotify({isOpen:true,message:'Patient Added Successfully',type:'success'})
                resetForm();
            })
            .catch (error => {
                console.log(error);
                setNotify({isOpen:true,message:'Patient add Failed',type:'error'})
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

    const filterMedicalConditions = (event) => {
        console.log(event.target.name, event.target.value);
        setInputValue(event.target.value);
        if(event.target.value === "") {
            console.log("in empty input")
            setMedicalConditions(medicalConditionsAll);
        } else {
        axios.get(`http://ec2-3-139-74-141.us-east-2.compute.amazonaws.com:9090/ws/rest/IntegrationAPI/conditions/search/${event.target.value}`)
        .then(response => {
            console.log(response)    
            if (response.data === "")
            {
                setMedicalConditions([{"conditionName": `+ Add ${event.target.value}`, "conditionId":"-1"}]);
            }
            else 
            {
                setMedicalConditions(response.data.MedicalConditions);
                // console.log("iam here in else ",options)
            }
        })
        .catch(error => {
            console.log(error)
            setMedicalConditions([medicalConditionsAll]);
        })
    }

    }
    useEffect(() => {
        console.log(location)
        setInputValue("");
        var test= (location.state && location.state.detail)
        console.log(test);
        if(test === "") {
            setValues({
                ...values,
                ["gender"]:"Male",
            })    
        } else {
            {location.state && 
                setValues({
                ...values,
                ["firstName"]:test,
                ["gender"]:"Male",
            })}    
        }
        console.log(values)
        const fetchData = async () => {
            console.log("in fetch")
            const respGlobal = await axios(`http://ec2-3-139-74-141.us-east-2.compute.amazonaws.com:9090/ws/rest/IntegrationAPI/conditions/all`);
            console.log(respGlobal);
            setMedicalConditions(respGlobal.data.MedicalConditions);
            setMedicalConditionsAll(respGlobal.data.MedicalConditions);
            console.log(medicalConditions);   
            console.log(medicalConditionsAll);   
        };    
        fetchData()
    }, [])



    const openInPopup = () => {
        console.log("open popup submit")
        // e.preventDefault();
        // setRecordForEdit(item)
        if(validate()){
            console.log(values);
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
                setNotify({isOpen:true,message:'Submission Failed',type:'error'})
            })
         }
    }

    const mcEdited=(event)=> {
        console.log(event.target.name, event.target.checked)
        if((event.target.checked === true) && (selectedMC.indexOf(event.target.name) === -1))
        {
            selectedMC.push(event.target.name)
        }
        else if((event.target.checked === false) && (selectedMC.indexOf(event.target.name) > -1))
        {
            var arr = selectedMC.filter(item => (
                item !== event.target.name))
                setSelectedMC(arr)
        }
        console.log(selectedMC)
        setValues({
            ...values,
            ["medicalHistory"]: selectedMC,
        })
    }

    const rowClicked = () => {
        console.log("row clicked",inputValue);
        var reqJson = { "Name": inputValue};
        axios.post('http://ec2-3-139-74-141.us-east-2.compute.amazonaws.com:9090/ws/rest/IntegrationAPI/conditions/create',reqJson)
        .then (response => {
            console.log(response);
            setMedicalConditions(response.data.MedicalConditions);
            setMedicalConditionsAll(response.data.MedicalConditions);
            selectedMC.push(inputValue);
            setInputValue("");
        })
        .catch (error => {
            console.log(error);
        })

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
                    <div className={classes.subContainer}>
                        <div className={classes.formContainer}>
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
                                defaultValue="Male"
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

                        </div>

                        <div className={classes.medCondtnContainer}>
                        <div>
                                <label style={{fontSize:'20px'}}>Medical History</label>
                                <TextField
                                    variant="outlined"
                                    name="medicalCondition"
                                    label="Type to Filter"
                                    onChange={filterMedicalConditions}
                                    style={{width: 278 }}
                                    value={inputValue}
                                />
                        </div>
                            <table className={classes.patientsTable}>
                                        <thead className={classes.patientsTableHead}>
                                        </thead>
                                        <tbody className={classes.patientsTableBody}>
                                            { medicalConditions.map(condition => 
                                                (
                                                    condition.conditionId != "-1" ? (  
                                                    <tr className={classes.patientsTableTr} key={condition.conditionId}>
                                                        <td className={classes.patientsTableTd} style={{width:'40px'}}>
                                                        <input type="checkbox" 
                                                                onChange={mcEdited} 
                                                                name={condition.conditionName}
                                                                checked={(selectedMC.indexOf(condition.conditionName) > -1)} />
                                                        </td>
                                                        <td className={classes.patientsTableTd} style={{width:'235px'}}>{condition.conditionName}</td>
                                                    </tr>
                                                    ) : 
                                                    (
                                                    <tr className={classes.patientsTableTr} key={condition.conditionId}>
                                                        <td className={classes.patientsTableTd} colSpan="2" onClick={rowClicked}>{condition.conditionName}</td>
                                                    </tr>
                                                    )
                                        ))}
                                    </tbody>
                            </table>
                        </div>

                    </div>
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


