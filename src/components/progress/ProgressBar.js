import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../add_application/Modalbox.css'
import './Progress.css'
import './ProgressBar.scss'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Moment from 'moment';
import NewTask from '../../add_application_task/NewTask.js'
import ArchiveTask from './../../archive_application_task/ArchiveTask'
import {setApps} from './../../redux/progress-reducer/progressAction'
import {connect} from 'react-redux'
import { updateTask } from '../../lib/api';
import Progress from './Progress'


const mapStatetoProps = state => {
    return{
        apps: state.progress.applications,
        filteredProgress: state.filteredProgress.applications,
        connection: state.connection.connection
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
            archiveShow: false, 
        }
    }

    handleTitleCompleted = (title) =>{
        this.setState({
            completed: true,
            Title : title
        })
    }
    handleTitleNotCompleted = (title) =>{
        this.setState({
            completed: false,
            Title : title
        })
    }

    //Task click function to handle completed
    handleCompleted = async(date, title) => {
        const apps = this.props.apps
        for(var i=0;i<apps.length;i++){
            if(apps[i].applicationID === this.props.applicationID){
                for(var j=0;j<apps[i].tasks.length;j++){
                    if(apps[i].tasks[j].midTaskID === date.midTaskID){
                        apps[i].tasks[j].status = !apps[i].tasks[j].status
                        const result = await updateTask(apps[i].tasks[j])
                        console.log(result)
                        if (this.props.connection){
                            try {
                                console.log("Triggered")
                                await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                                await this.props.connection.invoke('Application_Task_Update', JSON.parse(localStorage.getItem('user')).uID, this.props.applicationID, date.midTaskID)  
                            } catch(e) {
                                console.log(e);
                            }
                        }
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

    //Task click function for applied task
    //Make sure to call the api call here, and activate the socket
    handleCompletedApplied = () => {
        console.log("Clicked")
        const apps = this.props.filteredProgress
        for(var i=0;i<apps.length;i++){
            if(apps[i].applicationID === this.props.applicationID){
                apps[i].detail.status[0].status = !apps[i].detail.status[0].status
            }
        }
        this.props.setApps(apps)
        this.setState({})
    }

    //Tasks Modal Show/Close
    handleClose = () => {
        this.setState({show: false});
    }
    handleShow = () => {
        this.setState({show: true});
    }

    //Archive Modal Show/Close
    handleArchiveShow = () =>{
        this.setState({archiveShow : true})
    }
    handleArchiveClose = () =>{
        this.setState({archiveShow : false})
    }

    //Tasks Modal Stepper
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

    //Save function for task
    onClickSave = (title, date, dateShow) =>{
        this.props.onClickAdd(this.props.applicationID, title, date, dateShow)
        this.handleClose()
    }


    //use if clause to determine what color to use.
    render(){
        const dates = this.props.dates
        const detailStatus = this.props.details
        const sortedDates = dates.sort((a, b) => a.time - b.time)
        return(
                <div className = "sypp-progressbar-container">
                    <div className = "sypp-progressLine"/>
                        <div className = "sypp-progress-outer-container">
                        {
                        // sortedDates.map((date) => (
                        //     (date != null)?
                                (detailStatus.status)?
                                    <div className = "sypp-application-status-container">
                                        <div className="sypp-applicationFirst sypp-completed" onClick = {()=>this.handleCompletedApplied()}></div>
                                        <div className="sypp-date-font">{Moment(detailStatus.time).format('MMM DD')}</div>
                                    </div>:
                                    <div className = "sypp-application-status-container">
                                        <div className="sypp-applicationFirst sypp-notCompleted" onClick = {()=>this.handleCompletedApplied()}></div>
                                        <div className="sypp-date-font">{Moment(detailStatus.time).format('MMM DD')}</div>
                                    </div>
                            // :undefined
                        // ))
                        }
                            <div className ="sypp-progress-inner-container">
                            {
                            sortedDates.map((date) => (
                                <div>
                                {(date.title!=="Applied")?
                                    ((date.isVisible)?
                                        ((date.status)?
                                            <div className = "sypp-application-status-container">
                                                <Progress applicationID = {this.props.applicationID} task = {date} completed = {true} handleCompleted = {this.handleCompleted} date = {date}/>
                                            </div>: 

                                            <div className = "sypp-application-status-container">
                                                <Progress applicationID = {this.props.applicationID} task = {date} completed = {false} handleCompleted = {this.handleCompleted} date = {date}/>
                                            </div>)
                                    : undefined):undefined}
                                   
                            </div>))
                            }
                            <div className = "sypp-application-status-container">
                                <Fab variant="round" className = "sypp-addTask" onClick={this.handleShow}>
                                    <AddIcon className = "sypp-sizeChange"/>
                                </Fab>
                            </div>
                            </div>
                            <div className = "sypp-application-result-container">
                            <Fab variant="round" className = "sypp-addTask" onClick={this.handleArchiveShow}>
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
                    <Modal 
                    show={this.state.archiveShow}
                    onHide={this.handleArchiveClose}
                    centered
                    dialogClassName = "sypp-ModalMain"
                    >    
                        <div className = 'sypp-Modal-container'>
                            <button className ="sypp-button-close" onClick={this.handleArchiveClose}>X</button>
                            <ArchiveTask applicationID = {this.props.applicationID}/>
                        </div>
                    </Modal>

                </div>
        )
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(ProgressBar);