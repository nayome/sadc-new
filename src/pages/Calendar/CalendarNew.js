import React, { Component } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

class CalendarNew extends Component {
    constructor() {
        super();
        this.scheduleData = [{
        Id: 1,
        Subject: 'Service',
        StartTime: new Date(2018, 1, 15, 10, 0),
        EndTime: new Date(2018, 1, 15, 12, 30),
        IsBlock: true
    }, {
        Id: 2,
        Subject: 'India',
        StartTime: new Date(2018, 1, 13, 9, 0),
        EndTime: new Date(2018, 1, 13, 10, 30),
    },{
        Id: 3,
        Subject: 'break',
        StartTime: new Date(2018, 1, 11, 13, 0),
        EndTime: new Date(2018, 1, 11, 14, 0),
        IsBlock: true
    }]; 
      }
      onActionComplete(args){
        console.log(args);
            if ((args.requestType === 'dateNavigate') || (args.requestType === 'viewNavigate')){
                // This block is executed after previous and next navigation
                var currentViewDates = this.scheduleObj.getCurrentViewDates(); 
                var startDate = currentViewDates[0]; 
                var endDate = currentViewDates[currentViewDates.length - 1]; 
                console.log(startDate); 
                console.log(endDate); 
          
            }
      }
    render() {
        return (
            <div>
            <ScheduleComponent ref={schedule => this.scheduleObj = schedule} height={"550px"} selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.scheduleData }} actionComplete={this.onActionComplete.bind(this)}> 
              <Inject
                services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
              />
            </ScheduleComponent>
            </div>      
        );
    }
}

export default CalendarNew;