import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import { useForm, Form } from '../components/useForm';
import Controls from '../components/controls/Controls';
import './appointment.css';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const docCatItems = [
    { id: '0', title: 'Jr. Doctor' },
    { id: '1', title: 'Sr. Doctor' },
    { id: '2', title: 'Specialist' },
]

const durationItems = [
    { id: '0', title: '5 Minutes' },
    { id: '1', title: '10 Minutes' },
    { id: '2', title: '15 Minutes' },
    { id: '3', title: '20 Minutes' },
    { id: '4', title: '30 Minutes' },
    { id: '5', title: '45 Minutes' },
    { id: '6', title: '1 Hour' },
    { id: '7', title: '1 Hour 30 Minutes' },
    { id: '8', title: '2 Hours' },
    { id: '9', title: '2 Hours 30 Minutes' },
    { id: '10', title: '3 Hours' },
    { id: '11', title: '3 Hours 30 Minutes' },
    { id: '12', title: '4 Hours' },
]

const initialAValues = {
    docCategory: '',
    notifyPatientViaSMS: false,
    notifyDoctorViaSMS: false,
    duration: '',
    reason: '',
    apptDate: new Date(),
    slot: '',
    patientId: ''
}

function createSlots(slotConfig){
    // Getting values from slotConfig using destructuring
    const {configSlotHours,configSlotMinutes,configSlotPreparation,timeArr} = slotConfig;

    // This is the default date that we are using to make use of javascript date functions
    // slotsArray will hold final slots
    // _timeArrStartTime is used to store start time date object from the timeArr
    // _timeArrEndTime is used to store end time date object from the timeArr
    // _tempSlotStartTime is used to create slots by adding config values and check that the time is less than the end time and lies withing the duration specified
    // _startSlot holds value of start date time of slot
    // _endSlot holds value of end date time of slot

    let defaultDate = new Date().toDateString().substring(0,10)
    let slotsArray = []
    let _timeArrStartTime;
    let _timeArrEndTime;
    let _tempSlotStartTime;
    let _endSlot;
    let _startSlot;

    console.log(defaultDate)

    // Loop over timeArr
    for (var i = 0; i < timeArr.length; i++) {

       // Creating time stamp using time from timeArr and default date
       _timeArrStartTime = (new Date(defaultDate + " " + timeArr[i].startTime)).getTime();
       _timeArrEndTime = (new Date(defaultDate + " " + timeArr[i].endTime)).getTime();
       _tempSlotStartTime = _timeArrStartTime;
      //   console.log(new Date(defaultDate + " " + timeArr[i].startTime).getTime());
      //  console.log(defaultDate + " " + timeArr[i].startTime)
       // Loop around till _tempSlotStartTime is less end time from timeArr
       while ((new Date(_tempSlotStartTime)).getTime() < (new Date(_timeArrEndTime)).getTime()) {
         _endSlot = new Date(_tempSlotStartTime);
         _startSlot = new Date(_tempSlotStartTime);

         //Adding minutes and hours from config to create slot and overiding the value of _tempSlotStartTime
         _tempSlotStartTime = _endSlot.setHours(parseInt(_endSlot.getHours()) + parseInt(configSlotHours));
         _tempSlotStartTime = _endSlot.setMinutes(parseInt(_endSlot.getMinutes()) + parseInt(configSlotMinutes));

         // Check _tempSlotStartTime is less than end time after adding minutes and hours, if true push into slotsArr
         if (((new Date(_tempSlotStartTime)).getTime() <= (new Date(_timeArrEndTime)).getTime())) {

           // DateTime object is converted to time with the help of javascript functions
           // If you want 24 hour format you can pass hour12 false
           slotsArray.push({
             "timeSlotStart": new Date(_startSlot).toLocaleTimeString('en-US', {
               hour: 'numeric',
               minute: 'numeric',
               hour12: true
             }),
             "timeSlotEnd": _endSlot.toLocaleTimeString('en-US', {
               hour: 'numeric',
               minute: 'numeric',
               hour12: true
             })
          });
        }
          //preparation time is added in last to maintain the break period
          _tempSlotStartTime = _endSlot.setMinutes(_endSlot.getMinutes() + parseInt(configSlotPreparation));
        }
     }
   return slotsArray; 
 }


 const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      gridStyle: {
        margin: theme.spacing(2.5),
        marginTop: theme.spacing(1),
        border: '1px solid gainsboro',
        borderRadius: '4px',
    },
    newStyle: {
        marginTop: theme.spacing(2),

    },
    labelStyle: {
        marginLeft: theme.spacing(2.5),
        marginBotton: theme.spacing(0.5),
        fontSize: '15px'
    },
    buttonDiv: {
        textAlign: 'right',
        position: 'relative',
        marginRight: '20px',
        padding:'20px',
        }
  }));


export default function Appointment(props) {
    const { recordForEdit,  onClose } = props;
    const history = useHistory();
    const [timeSlots,setTimeSlots] = useState([]);
    const classes = useStyles();

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('slot' in fieldValues)
        temp.firstName = fieldValues.slot? "": "This field is required."
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
    } = useForm(initialAValues, true, validate);
    
    const handleSubmit = e => {
        e.preventDefault()
        console.log(values);
        if(validate()){
          axios.post('http://ec2-3-139-74-141.us-east-2.compute.amazonaws.com:9090/ws/rest/IntegrationAPI/Appointment/create',values)
          .then (response => {
              console.log(response);
              history.push({
                pathname: '/',
              });
              onClose(response.data.Id);
          })
          .catch (error => {
              console.log(error);
              onClose('error');
          })
      }

  }

    const handleSlotSelection = e => {
        e.preventDefault()
        console.log(e.target.name);
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })

    }
    useEffect(() => {
        if (recordForEdit != null)
        console.log("record for edit")
        console.log(recordForEdit)
            setValues({
                ...values,
                ["patientId"]: recordForEdit
            })
    }, [recordForEdit])

    const handleDurationChange = event => {
        console.log("handle dur change" + event.target.value)
        const { name, value } = event.target
        setValues({
            ...values,
            [name]: value
        })

        var slotConfig = {
            "configSlotHours":"0",
            "configSlotMinutes":"0",
            "configSlotPreparation":"0",
            "timeArr": [
              {"startTime":"10:00", "endTime":"13:00"},
              {"startTime":"14:00", "endTime":"18:00"},
            ]
          }
    
          if (event.target.value === "5 Minutes")
          {
            slotConfig.configSlotMinutes ="5";
          }
          else if (event.target.value === "10 Minutes")
          {
            slotConfig.configSlotMinutes ="10";
          }
          else if (event.target.value === "15 Minutes")
          {
            slotConfig.configSlotMinutes ="15";
          }
          else if (event.target.value === "20 Minutes")
          {
            slotConfig.configSlotMinutes ="20";
          }
          else if (event.target.value === "30 Minutes")
          {
            slotConfig.configSlotMinutes ="30";
          }
          else if (event.target.value === "45 Minutes")
          {
            slotConfig.configSlotMinutes ="45";
          }
          else if (event.target.value === "1 Hour")
          {
            slotConfig.configSlotHours ="1";
            slotConfig.configSlotMinutes ="0";
          }
          else if (event.target.value === "1 Hour 30 Minutes")
          {
            slotConfig.configSlotHours ="1";
            slotConfig.configSlotMinutes ="30";
          }
          else if (event.target.value === "2 Hours")
          {
            slotConfig.configSlotHours ="2";
            slotConfig.configSlotMinutes ="0";
          }
          else if (event.target.value === "2 Hours 30 Minutes")
          {
            slotConfig.configSlotHours ="2";
            slotConfig.configSlotMinutes ="30";
          }
          else if (event.target.value === "3 Hours")
          {
            slotConfig.configSlotHours ="3";
            slotConfig.configSlotMinutes ="0";
          }
          else if (event.target.value === "3 Hours 30 Minutes")
          {
            slotConfig.configSlotHours ="3";
            slotConfig.configSlotMinutes ="30";
          }
          else if (event.target.value === "4 Hours")
          {
            slotConfig.configSlotHours ="4";
            slotConfig.configSlotMinutes ="0";
          }
          else if (event.target.value === "")
          {
            slotConfig.configSlotHours ="0";
            slotConfig.configSlotMinutes ="0";
          }
          console.log(slotConfig)

        setTimeSlots(createSlots(slotConfig))
          console.log(timeSlots)
    }

   
    return (
        <div>
          <Form onSubmit={handleSubmit}>
        <Grid container spacing={12}>

            <Grid item xs={5}>
                <Controls.Select
                    name="docCategory"
                    label="Doc. Category"
                    options={docCatItems}
                    value={values.docCategory}
                    onChange={handleInputChange}
                />
                <Controls.Select
                    name="duration"
                    label="Duration"
                    default={"30 Minutes"}
                    options={durationItems}
                    value={values.duration}
                    onChange={handleDurationChange}
                />
                <Controls.Input
                    name="reason"
                    label="Reason"
                    value={values.reason}
                    onChange={handleInputChange}
                />
                <Controls.DatePicker
                    name="apptDate"
                    label="Date"
                    value={values.apptDate}
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={6}>
            <Controls.Checkbox
                    name="notifyPatientViaSMS"
                    label="Notify Patient Via SMS"
                    value={values.notifyPatientViaSMS}
                    onChange={handleInputChange}
                /> 
                <Controls.Checkbox
                    name="notifyDoctorViaSMS"
                    label="Notify Doctor Via SMS"
                    value={values.notifyDoctorViaSMS}
                    onChange={handleInputChange}
                /> 
                <Grid item className={classes.newStyle}>
                    <label className={classes.labelStyle}>Pick Slot</label>
                <Grid container className={classes.gridStyle}>
                    { timeSlots.map((item, index) => {
                        return (
                            <input 
                            type="button" 
                            className="btn-slot" 
                            name="slot"
                            value={item.timeSlotStart} 
                            onClick={handleSlotSelection} 
                            disabled={values.slot === item.timeSlotStart? true:false}>
                            </input>       
                        )})}
                </Grid>
                </Grid>

            </Grid>
            </Grid>
            <div className={classes.buttonDiv}>
                <Controls.Button
                    type="submit"
                    color="primary"
                    text="Add Appointment" 
                />
            </div>
        </Form>
        </div>
    )
}
