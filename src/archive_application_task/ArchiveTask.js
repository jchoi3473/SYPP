import React, {Component} from 'react';
import RadioButtons from '../components/radio/RadioButtons'

import {connect} from 'react-redux'
import {setDates} from './../redux/addApp-reducer/addAppAction'
import './ArchiveTask.scss'

//{key : 1, date: new Date('2020-01-16'), showDate: true, completed: true},


export class ArchiveTask extends Component{
    state = {
        option: '1',
        result : true, 
        }

    onChange = (value) => {
        var boolean = true;
        if (value === 1) {
            boolean = true;
        }
        else{
            boolean = false;
        }
        this.setState({result: boolean})
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
                <div className = "sypp-archive-text-container">
                    <div className = "sypp-archive-text">Save and </div>
                    <div className ="sypp-archive-text sypp-archive-text-save">
                        move to archive
                    </div>
                </div>
                <div className = "sypp-archive-subtext">(Archived apps are accessible via desktop app)</div>
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