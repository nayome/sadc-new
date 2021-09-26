import React,{useEffect,useState} from 'react';
import "./calendar.css";
import { Inject, ScheduleComponent, Day, Week,WorkWeek, Month, EventSettingsModel} from '@syncfusion/ej2-react-schedule';
import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-react-schedule';
import axios from 'axios';

const AppointmentData = [
    {
        Id: 1, //appointment Id
        Subject: 'David', //patient Name
        StartTime: new Date(2021, 9, 22, 10, 15),
        EndTime: new Date(2021, 9, 22, 10, 30),
        IsAllDay: false,
    },
    {
    Id: 2, //appointment Id
    Subject: 'Jesse', //patient Name
    StartTime: new Date(2021, 9, 22, 11, 0),
    EndTime: new Date(2021, 9, 22, 11, 30),
    IsAllDay: false,
},
{
    Id: 3, //appointment Id
    Subject: 'Nayome', //patient Name
    StartTime: new Date(2021, 9, 23, 11, 0),
    EndTime: new Date(2021, 9, 23, 11, 30),
    IsAllDay: false,
}
];

export default function Calendar() {
    const [apptsList, setApptsList] = useState([]);
    const [apptsListModified, setApptsListModified] = useState([]);


    useEffect(() => {
        console.log("in usefect")
        const fetchData = async () => {
            console.log("in fetch")
            const respGlobal = await axios(`http://ec2-3-139-74-141.us-east-2.compute.amazonaws.com:9090/ws/rest/IntegrationAPI/Appointment/patientId/32`);
            console.log(respGlobal);

            setApptsList(respGlobal.data);
            console.log(apptsList);   
        };    
        fetchData()
      }, []);

    return (
        <div className="calendar">
            <div className="rowStyling">
            <div className="row-1-cal">
              <div>
                <label className="lbl-inf">Filters</label>
                    <div>
                        <input type="checkbox"></input><span className="chk-spn">Show Events</span><br></br><br></br>
                        <input type="checkbox"></input><span className="chk-spn">Canceled Appointments</span><br></br><br></br>
                        <input type="checkbox"></input><span className="chk-spn">Missed Appointments</span><br></br><br></br>
                        <input type="checkbox"></input><span className="chk-spn">Normal Appointments</span><br></br><br></br>
                    </div>
                </div>
                <div>
                    <label className="lbl-inf">Settings</label><br></br>
                    <div>
                        <span>Slot Duration</span>
                        <select className="dur-slt">
                            <option>5 min</option>
                            <option>10 min</option>
                            <option>15 min</option>
                            <option>20 min</option>
                            <option>30 min</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row-2-cal">
            <ScheduleComponent 
                currentView='Week' 
                selectedDate={new Date((new Date().getFullYear()), (new Date().getMonth()+1), (new Date().getDate()))}
                startHour='10:00' 
                endHour='20:00' 
                eventSettings={{ dataSource: AppointmentData }}
                timeScale={{
                    enable:'true',
                    interval:15,
                }}
            >
                <Inject services={[Day, Week, WorkWeek, Month]}/>
            </ScheduleComponent>;
            </div>
            {/* <div className="row-3-cal">
                <div>
                    <label className="lbl-inf">Today's Schedule</label>
                </div>
                <div className="appointment-state-wrapper"> 
                    <div className="appointment-state state-schedule"> 
                        <div className="appointment-state-number-wrapper">
                            <span>0</span>
                        </div>
                        <div className="appointment-state-detail-wrapper">
                            <span>Schedule</span>
                        </div>
                    </div>
                    <div className="appointment-state state-waiting"> 
                        <div className="appointment-state-number-wrapper">
                            <span>0</span>
                        </div>
                        <div className="appointment-state-detail-wrapper">
                            <span>Waiting</span>
                        </div>
                    </div>
                    <div className="appointment-state state-engage"> 
                        <div className="appointment-state-number-wrapper">
                            <span>0</span>
                        </div>
                        <div className="appointment-state-detail-wrapper">
                            <span>Enagage</span>
                        </div>
                    </div>
                    <div className="appointment-state state-checkout"> 
                        <div className="appointment-state-number-wrapper">
                            <span>0</span>
                        </div>
                        <div className="appointment-state-detail-wrapper">
                            <span>Done</span>
                        </div>
                    </div>
                </div>
                <div className="appointment-list">
                    <span>No Appointments</span>
                </div>
            </div>*/}
 
            </div> 
       </div>
    )
}
