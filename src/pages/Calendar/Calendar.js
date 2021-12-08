import React, { Component } from 'react';
import "./calendar.css";
import { ScheduleComponent, Day, Week, Inject, ViewsDirective, ViewDirective, ActionEventArgs } from '@syncfusion/ej2-react-schedule';
import axios from 'axios';

function formatDate(date) {
    console.log(date);
    date = date.split(" ");
    console.log(date);
    let monthsList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
  
    let year = date[3];
    let month = `0${(monthsList.indexOf(date[1]) + 1)}`.slice(-2);
    let day = date[2];
  
    return `${year}-${month}-${day}`;      
}

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            appointmentsList: [],
            slot: 30,
            dateRange: 'Day',
        }
    }

    makeServiceCall(startDate, endDate ) {
        console.log(startDate);
        console.log(endDate);
        axios.post(`https://ec2-13-232-74-29.ap-south-1.compute.amazonaws.com:443/ws/rest/IntegrationAPI/Appointment/list`,
        {
            "startDate": startDate,
            "endDate": endDate
        })
        .then(response => {
            console.log(response)
            this.setState({appointmentsList: response.data.details})
            // console.log(this.state.appointmentsList)

        })
        .catch(error => {
            console.log(error)
        })

    }

    componentDidMount() {
        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        var firstday = new Date(curr.setDate(first)).toISOString().split('T')[0];
        var lastday = new Date(curr.setDate(last)).toISOString().split('T')[0];

        this.makeServiceCall(firstday, lastday)

    }
    
    handleSlotChange(event) {
        this.setState({slot: event.target.value})
    }


    onActionComplete(args){
        console.log(args);

        if(args.event && ((args.requestType === 'dateNavigate') || (args.requestType === 'viewNavigate'))) {
            console.log("Yes")
            var currentViewDates = this.scheduleObj.getCurrentViewDates(); 
            var convDate = formatDate(currentViewDates[0].toString())
            console.log(convDate)
            var startDate = formatDate(currentViewDates[0].toString()); 
            var endDate = formatDate(currentViewDates[currentViewDates.length - 1].toString()); 
            console.log(startDate); 
            console.log(endDate); 
            this.makeServiceCall(startDate,endDate)
        }
        else {
            console.log("nNo")
        }
      }

    render() {
        return (
            <div className="calendar">
            <div className="rowStyling">
            <div className="row-1-cal">
              <div>
                <label className="lbl-inf">Filters</label>
                    <div>
                        <input type="checkbox"></input><span className="chk-spn">Show Events</span><br></br><br></br>
                    </div>
                </div>
                <div>
                    <label className="lbl-inf">Settings</label><br></br>
                    <div className="settingsStyling">
                        <span>Slot Duration</span>
                        <select className="dur-slt" onChange={this.handleSlotChange.bind(this)} defaultValue={30}>
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
                ref={schedule => this.scheduleObj = schedule}
                // currentView={this.dateRange} 
                // selectedDate={new Date()}
                startHour='10:00' 
                endHour='20:00' 
                actionComplete={this.onActionComplete.bind(this)}
                eventSettings={{ dataSource: this.state.appointmentsList }}
                timeScale={{
                    enable:'true',
                    interval: this.state.slot,
                }}
            >
                <ViewsDirective>
                    <ViewDirective option='Day' interval={3} displayName='3 Days'/>
                    <ViewDirective option='Week' interval={1} displayName='1 Week'/>
                </ViewsDirective>
                <Inject services={[Day, Week]}/>
            </ScheduleComponent>
            </div>   
        </div>
        </div>   
        );
    }

    }
export default Calendar;   
 
