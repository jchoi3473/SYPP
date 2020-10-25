import React, {Component} from 'react';
import RadioButtons from './../radio/RadioButtons'
import './NewTask.css'


export class NextStep extends Component{
    constructor(){
        super()
        this.state ={
            userInput : "",
            disabled: false, 
        }
    }
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    onUserInput = (e) => {
    if(e.currentTarget.value !== ""){
        this.setState({
            userInput:e.currentTarget.value,
            disabled:true
        })
    }
    else{
        this.setState({
            userInput:"",
            disabled: false
        })
    }    
    this.props.onChangeOption(this.state.userInput)    
    }
    onChange = (value) => {
        this.props.onChangeOption(value)
    }
  
    render(){
        const radioValue =    
        [ 
            { name: 'Interview', value: '1' },
            { name: 'Challenge', value: '2' },
            { name: 'Test',     value: '3' },
        ]
        return(
            <div>
                <div className="modal-text">What is the next step?</div>
                <div  className = "radio">
                    <RadioButtons options = {radioValue} onChange = {this.onChange} classContainerProps = "button-group-container" buttonContainerProps = "button-props" 
                    isDisabled = {this.state.disabled}/>
                </div>
                <input
                        className ="customizeInputField"
                        placeholder="Customize Step Name"
                        onChange = {e => this.onUserInput(e)}
                        value={this.state.userInput}
                    />

                <div className ="next-button-container">
                    <button className ="button-next" onClick = {this.continue}>
                        Next
                    </button>
                </div>
            </div>
           
        );
    }
}

export default NextStep
