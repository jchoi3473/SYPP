import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import './../addApp/Modalbox.css'
import './Progress.css'
import './ProgressBar.scss'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Moment from 'moment';
import NewTask from '../newTask/NewTask.js'
import ReactTooltip from "react-tooltip";

import {setApps} from './../../redux/progress-reducer/progressAction'
import {connect} from 'react-redux'

const mapStatetoProps = state => {
    return{
        apps: state.progress.applications,
        filteredProgress: state.filteredProgress.applications
    }
}

const mapDispatchToProps= dispatch =>{
    return {
        setApps: (applications) => dispatch(setApps(applications)),
    }
}

export class ProgressBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            step: 1,
            show: false,
            toolTip: false,
            Title : "",
            completed : false,
        }
    }

    handleTitleCompleted = (title) =>{
        console.log("Completeed triggered")
        this.setState({
            completed: true,
            Title : title
        })
    }
    handleTitleNotCompleted = (title) =>{
        console.log("not Completeed triggered")
        this.setState({
            completed: false,
            Title : title
        })
    }

    handleCompleted = (date, title) => {
        const apps = this.props.filteredProgress
        for(var i=0;i<apps.length;i++){
            if(apps[i].applicationID === this.props.applicationID){

                for(var j=0;j<apps[i].Tasks.length;j++){
                    
                    if(apps[i].Tasks[j].midTaskID === date.midTaskID){
                        apps[i].Tasks[j].Status = !apps[i].Tasks[j].Status
                        break;
                    }
                }
            }
        }
        this.props.setApps(apps)
        this.setState({
            completed: !this.state.completed,
        })
    }

    handleCompletedApplied = () => {
        console.log("Clicked")
        const apps = this.props.filteredProgress
        for(var i=0;i<apps.length;i++){
            if(apps[i].applicationID === this.props.applicationID){
                // for(var j=0;j<apps[i].Tasks.length;j++){
                    
                //     if(apps[i].Tasks[j].midTaskID === date.midTaskID){
                        apps[i].Detail.Status[0].Status = !apps[i].Detail.Status[0].Status
                        // break;
                //     }
                // }
            }
        }
        this.props.setApps(apps)
        this.setState({})
    }


    handleClose = () => {
        this.setState({show: false});
    }
    handleShow = () => {
        this.setState({show: true});
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
    onClickSave = (title, date, dateShow) =>{

        this.props.onClickAdd(this.props.applicationID, title, date, dateShow)
        this.handleClose()

    }
    //use if clause to determine what color to use.
    render(){
        const dates = this.props.dates
        const detailStatus = this.props.details
        const sortedDates = dates.sort((a, b) => a.Time - b.Time)
        return(
                <div className = "sypp-progressbar-container">
                    <div className = "sypp-progressLine"/>
                        <div className = "sypp-progress-outer-container">
                        {
                        // sortedDates.map((date) => (
                        //     (date != null)?
                                (detailStatus.Status)?
                                    <div className = "sypp-application-status-container">
                                        <div className="sypp-applicationFirst sypp-completed" onClick = {()=>this.handleCompletedApplied()}></div>
                                        <div className="sypp-date-font">{Moment(detailStatus.Time).format('MMM DD')}</div>
                                    </div>:
                                    <div className = "sypp-application-status-container">
                                        <div className="sypp-applicationFirst sypp-notCompleted" onClick = {()=>this.handleCompletedApplied()}></div>
                                        <div className="sypp-date-font">{Moment(detailStatus.Time).format('MMM DD')}</div>
                                    </div>
                            // :undefined
                        // ))
                        }
                            <div className ="sypp-progress-inner-container">
                            {
                            sortedDates.map((date) => (
                                <div>
                                {(date.Title!=="Applied")?
                                    ((date.showDate)?
                                        ((date.Status)?
                                            <div className = "sypp-application-status-container">
                                                <div className="sypp-applicationFirst sypp-completed"  
                                                data-for="progressTip"
                                                data-tip = ''
                                                onClick = {()=>this.handleCompleted(date, date.Title)}
                                                onMouseEnter = {() => this.handleTitleCompleted(date.Title)}></div>
                                                <div className="sypp-date-font">{Moment(date.Time).format('MMM DD')}</div>
                                            </div>: 
                                            <div className = "sypp-application-status-container">
                                                <div className="sypp-applicationFirst sypp-notCompleted" 
                                                data-for="progressTip"
                                                data-tip = ''
                                                onClick = {()=>this.handleCompleted(date, date.Title)}
                                                onMouseEnter = {() => this.handleTitleNotCompleted(date.Title)}></div>
                                                <div className="sypp-date-font">{Moment(date.Time).format('MMM DD')}</div>
                                            </div>)
                                    : undefined):undefined}
                                    <ReactTooltip
                                    id= "progressTip"
                                    className = {"sypp-extraClass"}
                                    effect='solid'
                                    delayHide={250}
                                    place={'bottom'}
                                    disable	={false}
                                    >
                                        <div className = {this.state.completed? "sypp-Completed":"sypp-NotCompleted"}>{this.state.Title}</div>
                                    </ReactTooltip>
                            </div>))
                            }
                            <div className = "sypp-application-status-container">
                                <Fab variant="round" className = "sypp-addTask" onClick={this.handleShow}>
                                    <AddIcon className = "sypp-sizeChange"/>
                                </Fab>
                            </div>
                            </div>
                            <div className = "sypp-application-result-container">
                            <Fab variant="round" className = "sypp-addTask" onClick={this.props.onClickAdd}>
                                    <AddIcon className = "sypp-sizeChange"/>
                            </Fab>
                            </div>
                    </div>
                    <Modal 
                    show={this.state.show}
                    onHide={this.handleClose}
                    centered
                    dialogClassName = "sypp-ModalMain"
                    >    
                        <div className = 'sypp-Modal-container'>
                            <button className ="sypp-button-close" onClick={this.handleClose}>X</button>
                            <NewTask onClickSave = {this.onClickSave} applicationID = {this.props.applicationID}/>
                        </div>
                    </Modal>

                </div>
        )
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(ProgressBar);