import React, {Component} from 'react';
import CalendarComponent from './../calendar/CalendarComponent'
import RadioButtons from './../radio/RadioButtons'


export class NewDate extends Component{


    onChange = (value) => {
        this.props.onInterviewOptionChange(value)
    }
  
    render(){
        const radioValue =    
        [ 
        { name: 'Yes', value: '1' },
        { name: 'No', value: '2' },
        ]
        return(
            <div>
                <CalendarComponent
                  calendarChange={this.props.calendarChange}
                />
                <div className="sypp-modal-text">Display this date on timeline?</div>
                <div className = "sypp-button-choice-container">
                    <div className = "sypp-radio-container">
                    <RadioButtons options = {radioValue} onChange = {this.onChange}/>
                </div>
                </div>
            </div>
           
        );
    }
}

export default NewDate
//Add x button bootstrap or material-ui x 