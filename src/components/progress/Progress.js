import React, { Component } from 'react';
import '../../add_application/Modalbox.css'
import './Progress.css'
import './ProgressBar.scss'
import Moment from 'moment';
import Popup from 'reactjs-popup';
import Modal from 'react-bootstrap/Modal';
import NewTask from '../../add_application_task/NewTask.js'
import {setApps} from './../../redux/progress-reducer/progressAction'
import {connect} from 'react-redux'
import { updateTask } from '../../lib/api';



const mapStatetoProps = state => {
    return{
        apps: state.progress.applications,
        connection: state.connection.connection
    }
}

const mapDispatchToProps= dispatch =>{
    return {
        setApps: (applications) => dispatch(setApps(applications)),
    }
}

export class Progress extends Component{
    constructor(props){
        super(props)
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
            isHovering : false, 
            isHoveringMore: false, 
            show : false,
        }
    }
    handleClose = () => {
        this.setState({show: false});
    }
    handleShow = () => {
        this.setState({show: true});
    }

    handleMouseHover(){
        this.setState(this.toggleHoverState);
    }
    toggleHoverState(state) {
        return{
            isHovering: !state.isHovering,
        };
    }

    onClickEdit = () =>{
        this.handleShow()
    }

    handleClick = () =>{
        this.setState({
            isHoveringMore: !this.state.isHoveringMore
        })
    }
    handleUnClick = () =>{
        this.setState({
            isHoveringMore: false
        })
    }
    onClickMark = () =>{
        console.log(this.props.date)
        this.setState({
            isHovering: false
        })
        this.props.handleCompleted(this.props.date, this.props.date.Title)
    }

    onClickSave = async(title, date, dateShow) =>{
        let midTask = this.props.task;
        midTask.type = title;
        midTask.time = date;
        midTask.isVisible = dateShow;
        console.log(midTask)
        // midTask.sort((a, b) => a.time - b.time)
        const result = await updateTask(midTask)
        if (this.props.connection){
            try {
                console.log("Triggered")
                await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                await this.props.connection.invoke('Application_Task_Update', JSON.parse(localStorage.getItem('user')).uID, this.props.applicationID, midTask.midTaskID)  
            } catch(e) {
                console.log(e);
            }
        }
        this.setState({})
        this.handleClose()
    }

    render(){
        return(
            <div
            // onBlur = {() => {ReactTooltip.hide(this.fooRef)}}
            // onMouseLeave = {this.handleMouseHover}
            >
            <div className = "sypp-progress-general-container" onMouseEnter = {this.handleMouseHover} onMouseLeave = {this.handleMouseHover}>
                {this.props.completed?
                <div>
                <div className="sypp-applicationFirst sypp-completed"  
                onClick = {() => this.props.handleCompleted(this.props.date, this.props.date.title)}
                ></div>
                <div className="sypp-date-font">{Moment(this.props.date.time).format('MMM DD')}</div>
                </div>:
                <div>
                <div className="sypp-applicationFirst sypp-notCompleted" 
                onClick = {() =>  this.props.handleCompleted(this.props.date, this.props.date.title)}
                ></div>
                <div className="sypp-date-font">{Moment(this.props.date.time).format('MMM DD')}</div>

                </div>
                }
                {
                this.state.isHovering &&this.props.completed?
                    <div className = "sypp-task-tooltip-completed">
                        <div>{this.props.date.type}</div>
                        <Popup
                        trigger={
                            <div className ="sypp-task-tooltip-more">
                            ...
                            </div>
                        }
                        position={'bottom right'}
                        closeOnDocumentClick
                        >
                            <div className = "sypp-progress-tooltip-options-container">
                            <button className = "sypp-progress-tooltip-option" onClick = {this.onClickMark}>Mark Incomplete</button>
                            <button className = "sypp-progress-tooltip-option" onClick = {() => {this.onClickEdit()}}>Edit</button>
                            <button className = "sypp-progress-tooltip-option" onClick = {() => {this.onClick()}}>Delete Task</button>
                            </div>
                        </Popup>
                        </div>:
                    undefined                
                }

                {
                this.state.isHovering &&!this.props.completed?
                    <div className = "sypp-task-tooltip-notcompleted">
                        <div>{this.props.date.type}</div>
                        <Popup
                        trigger={
                            <div className ="sypp-task-tooltip-more">
                            ...
                            </div>
                        }
                        position={'bottom right'}
                        closeOnDocumentClick
                        >
                            <div className = "sypp-progress-tooltip-options-container">
                            <button className = "sypp-progress-tooltip-option"  onClick = {this.onClickMark}>Mark Complete</button>
                            <button className = "sypp-progress-tooltip-option"  onClick = {() => {this.onClickEdit()}}>Edit</button>
                            <button className = "sypp-progress-tooltip-option"  onClick = {() => {this.onClick()}}>Delete Task</button>
                            </div>
                        </Popup>
                    </div>:
                    undefined
                }
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

export default connect(mapStatetoProps,mapDispatchToProps)(Progress)