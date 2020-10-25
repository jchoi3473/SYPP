import React,{Component} from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import 'react-calendar/dist/Calendar.css';

export class CalendarComponent extends Component{
    state = {
        date: new Date(),
    }
    //need to get props

    onChange = date => {
        this.props.calendarChange(date)
        this.setState({date})
    }

    render(){
        return(
            <div className = 'Calendar-container'>
                <Calendar
                className = "main changeMargin changeSize calendarColor currentDay"
                tileClassName =" customTile background changeFocus "
                onChange={this.onChange}
                value={this.state.date}
                />
            </div>
        );
    }
}
export default CalendarComponent