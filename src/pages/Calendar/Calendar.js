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
    const [slot, setSlot] = useState();
    const [dateRange, setDateRange] = useState('Day');

    useEffect(() => {
        console.log("in usefect")
        const fetchData = async () => {
            console.log("in fetch")
            const respGlobal = await axios.post(`http://ec2-3-139-74-141.us-east-2.compute.amazonaws.com:9090/ws/rest/IntegrationAPI/Appointment/list`, {"startDate":"2021-10-13",
            "endDate": "2021-10-13"});
            console.log(respGlobal);
            var tempList = []
            { respGlobal.data.map(item => {
                var list = (item.StartTime.split(','))
                item.StartTime = new Date(list[0], list[1],list[2],list[3],list[4]);
                var endList = (item.EndTime.split(','))
                item.EndTime = new Date(endList[0], endList[1],endList[2],endList[3],endList[4]);
                tempList.push(item)
            })}
            console.log(tempList);   
            setApptsList(tempList);
            console.log(apptsList)
        };    
        fetchData()
      }, []);

    const handleSlotChange = (event) => {
        console.log(event.target.value)
        setSlot(event.target.value)
    }
    return (
        <div className="calendar">
            <div className="rowStyling">
            <div className="row-1-cal">
              <div>
                <label className="lbl-inf">Filters</label>
                    <div>
                        <input type="checkbox"></input><span className="chk-spn">Show Events</span><br></br><br></br>
                        {/* <input type="checkbox"></input><span className="chk-spn">Canceled Appointments</span><br></br><br></br>
                        <input type="checkbox"></input><span className="chk-spn">Missed Appointments</span><br></br><br></br>
                        <input type="checkbox"></input><span className="chk-spn">Normal Appointments</span><br></br><br></br> */}
                    </div>
                </div>
                <div>
                    <label className="lbl-inf">Settings</label><br></br>
                    <div className="settingsStyling">
                        <span>Slot Duration</span>
                        <select className="dur-slt" onChange={handleSlotChange} defaultValue={30}>
                            <option value={5}>5 min</option>
                            <option value={10}>10 min</option>
                            <option value={15}>15 min</option>
                            <option value={20}>20 min</option>
                            <option value={30}>30 min</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row-2-cal">
            <ScheduleComponent 
                currentView={dateRange} 
                selectedDate={new Date((new Date().getFullYear()), (new Date().getMonth()+1), (new Date().getDate()))}
                startHour='10:00' 
                endHour='20:00' 
                eventSettings={{ dataSource: apptsList }}
                timeScale={{
                    enable:'true',
                    interval: slot,
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
