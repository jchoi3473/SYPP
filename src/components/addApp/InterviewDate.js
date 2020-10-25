import React,{useState, Component} from 'react';
import CalendarComponent from './../calendar/CalendarComponent';
import RadioButtons from '../radio/RadioButtons'
import './Modalbox.css';
import './Calendar.css';
import 'react-calendar/dist/Calendar.css';

import {connect} from 'react-redux'
import {setDates} from './../../redux/addApp-reducer/addAppAction'


// Calandar 컴포넌트는 reusable 해서 다른곳에 적용 가능, 
// 다른 기능 구현할때 따로 class로 빼놓을듯. 

export class InterviewDate extends Component{

  onChangeDate = date => {
    const newDates = this.props.dates
    newDates[0].date = date
    this.props.setDates(newDates)
  }

  onChange = (value) => {
    var boolean = true;
    if (value == 1) {
        boolean = true;
    }
    else{
        boolean = false;
    }
    const newDates = this.props.dates
    newDates[0].showDate = boolean
    this.props.setDates(newDates)
}

  render(){        
    const radioValue =    
      [ 
      { name: 'Yes', value: '1' },
      { name: 'No', value: '2' },
      ]
        return(
        <div>
            <div className="modal-text">When did you apply?</div>
                <CalendarComponent
                  calendarChange={this.onChangeDate}
                />
            <div className="modal-text">Display this date on timeline?</div>
            <div className = "button-choice-container">
              <div className = "radio-container">
              <RadioButtons options = {radioValue} onChange = {this.onChange} isDisabled = {false}/>
              </div>
            </div>
          {console.log(this.props.dates)}
        </div>
      )
  }
}

const mapStatetoProps = state => {
  return{
      dates: state.addApp.dates,
  }
}
const mapDispatchToProps= dispatch =>{
  return {
    setDates: (date) => dispatch(setDates(date)),   
  }
}

export default connect(mapStatetoProps,mapDispatchToProps)(InterviewDate);
