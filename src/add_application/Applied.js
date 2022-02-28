import React, {Component} from 'react';
import './Modalbox.css';
import './Modalbox.scss';
import MuiButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import RadioButtons from '../components/radio/RadioButtons'

import {connect} from 'react-redux'
import {setDates} from './../redux/addApp-reducer/addAppAction'


//{key : 1, date: new Date('2020-01-16'), showDate: true, completed: true},


export class Applied extends Component{
    state = {
        option: '2'
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
            { name: 'Yes', value: '1' },
            { name: 'No', value: '2' },
            ]
        return(
            <div>
                <div className ="sypp-applied-container">
                    <div className="sypp-modal-text sypp-modal-newapp-applied">Have you applied yet?</div>
                    <div className = "sypp-radio-container">
                    <RadioButtons options = {radioValue} onChange = {this.onChange} isDisabled = {false}/>
                    </div>
                </div>
            <br/>
            <div className ="sypp-next-button-container">
                <button className = "sypp-button-prev" onClick = {this.back}>
                    Prev
                </button>
                <button className ="sypp-button-next" onClick = {this.continue}>
                    Next
                </button>
            </div>
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

export default connect(mapStatetoProps,mapDispatchToProps)(Applied)
