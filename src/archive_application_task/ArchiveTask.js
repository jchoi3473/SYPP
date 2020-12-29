import React, {Component} from 'react';
import RadioButtons from '../components/radio/RadioButtons'

import {connect} from 'react-redux'
import {setDates} from './../redux/addApp-reducer/addAppAction'


//{key : 1, date: new Date('2020-01-16'), showDate: true, completed: true},


export class ArchiveTask extends Component{
    state = {
        option: '1'
        }

    onChange = (value) => {
        var boolean = true;
        if (value === 1) {
            boolean = true;
        }
        else{
            boolean = false;
        }
        const newDates = this.props.dates
        newDates[0].completed = boolean
        this.props.setDates(newDates)
    }
    
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render(){
        const radioValue =    
            [ 
            { name: 'Offer', value: '1' },
            { name: 'Rejection', value: '2' },
            ]
        return(
            <div>
                <div className ="sypp-applied-container">
                    <div className="sypp-modal-text sypp-modal-newapp-applied">What is the result?</div>
                    <div className = "sypp-radio-container">
                    <RadioButtons options = {radioValue} onChange = {this.onChange} isDisabled = {false}/>
                    </div>
                </div>
            <br/>

        </div>
        );
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

export default connect(mapStatetoProps,mapDispatchToProps)(ArchiveTask)
//Add x button bootstrap or material-ui x 