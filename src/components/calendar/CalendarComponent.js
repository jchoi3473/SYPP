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
            <div className = 'sypp-Calendar-container'>
                <Calendar
                className = "sypp-main sypp-changeMargin sypp-changeSize sypp-calendarColor sypp-currentDay"
                tileClassName ="sypp-customTile sypp-background sypp-changeFocus "
                onChange={this.onChange}
                value={this.state.date}
                />
            </div>
        );
    }
}
export default CalendarComponent