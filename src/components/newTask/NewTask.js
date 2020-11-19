import React, {Component} from 'react';
import NextStep from './NextStep';
import NewDate from './NewDate';
import Page from '../page/Page'
import './NewTask.css'


export class NewTask extends Component {
    state = {
        step: 1,
        title: "",
        date: new Date(),
        showDate: true
    }

    nextStep = () =>{
        const {step}  = this.state;
        this.setState({
            step: step + 1
        });
    }

    prevStep = () =>{
        const {step}  = this.state;
        this.setState({
            step: step - 1
        });
    }

    calendarChange = date => {
        this.setState({
            date: date
        });
    }

    onChangeOptions = (value) => {
        if(value === '1'){
            this.setState({
                title: "Interview"
            })
        }
        else if(value === '2'){
            this.setState({
                title: "Challenge"
            })
        }
        else if(value === '3'){
            this.setState({
                title:"Test"
            })
        }
        else{
            this.setState({
                title: value
            })
        }
    }

    onChangeOption = (value) => {
        var boolean = true;
        if (value == 1) {
            boolean = true;
        }
        else{
            boolean = false;
        }
        return boolean;
    }
    onInterviewOptionChange = (value) => {
        this.setState({
            showDate: this.onChangeOption(value)
        })
    }
    onClick = e => {
        e.preventDefault();
        this.props.onClickSave(this.state.title, this.state.date, this.state.showDate)
    }

    render(){
        const{step} = this.state;
        
        switch(step){
            case 1:
                return(
                    <div>
                        <Page pageNumber ={this.state.step} pageCount = {[1,2]}/>
                        <NextStep 
                            nextStep = {this.nextStep}
                            onChangeOption = {this.onChangeOptions}
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <Page pageNumber ={this.state.step} pageCount = {[1,2]}/>
                        <NewDate
                        onSaveButton = {this.onSaveButton}
                        calendarChange = {this.calendarChange}
                        date = {this.state.date}
                        onInterviewOptionChange = {this.onInterviewOptionChange}
                        />
                        <div className="sypp-next-button-container">
                            <button className = "sypp-button-next" 
                            onClick={this.onClick} >
                                Save
                            </button>
                        </div>
                    </div>
                )
        }
    }
}
export default NewTask