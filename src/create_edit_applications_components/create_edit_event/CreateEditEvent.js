import React, {Component} from 'react';
import EventDetail from './EventDetail'
import EventSelectDate from './EventSelectDate'

import 'draft-js/dist/Draft.css';

import {connect} from 'react-redux'
import {setApps} from './../../redux/progress-reducer/progressAction'
import {setCompany} from './../../redux/company-reducer/companyAction'
import {updateApplicationDetail} from './../../redux/applicationDetail-reducer/ApplicationDetailAction'
import { createEvent, updateEvent, deleteEvent } from '../../lib/api';

const mapStatetoProps = state => {
    return{
        apps: state.progress.applications,
        pending: state.progress.isPending,
        categories: state.categories.categories, 
        companies: state.companies.companies,
        connection: state.connection.connection
    }
  }
  
  const mapDispatchToProps= dispatch =>{
    return {
        setApps : (applications) => dispatch(setApps(applications)),
        setCompany : (companies) => dispatch(setCompany(companies)),
        updateApplicationDetail: (applications) => dispatch(updateApplicationDetail(applications)),

    }
  }


export class CreateEditEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            step: 1,
            eventID : null,
            eventName : '',
            eventLocation :'',
            eventNote : '',
            eventDate : new Date(),
            eventHour : 0,
            eventMinute : 0,
            eventTimeConvert : '',
            editorState : '',
            companyID: null,
            creating: true
        }
    }

    //componentDidMount will determine if this is a new Event
    //if this is not a new event, will call exisitng features and save them to the state
    componentDidMount(){
        this.setState({
            type : this.props.type
        })
        if(this.props.event !== ''){     
            this.setState({
                eventID: this.props.event.eventID,
                eventName : this.props.event.detail.title,
                eventLocation :this.props.event.detail.location,
                eventNote : '',
                eventDate : this.props.event.detail.time,
                eventHour : 0,
                eventMinute : 0,
                eventTimeConvert : '',
                editorState : this.props.editorState,
                creating: false
            })
            console.log(this.props.event.eventID)      
        }
    }

//API CALL HERE
// //Send Post request, close modal(save button)

    onSaveButton = async(editorState) => {
        // this.props.postNewApp(this.props.addApp)
        var newNoteContent = []

        if(editorState !== ''){
            for(var i=0;i<editorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
                newNoteContent.push({
                noteContentsID : editorState._immutable.currentContent.blockMap._list._tail.array[i][0],
                content : editorState._immutable.currentContent.blockMap._list._tail.array[i][1].text,
                belongingID : this.props.event.eventID,
                marginType : editorState._immutable.currentContent.blockMap._list._tail.array[i][1].depth
                })
            }
        }

        if(this.state.type ==='application'){
            for(var i=0;i<this.props.apps.length;i++){
                if(this.props.apps[i].applicationID === this.props.applicationID){
                    const event =   
                        {
                            eventID: this.state.eventID,
                            detail: {
                                applicationID: this.props.applicationID,
                                eventID: this.state.eventID,
                                time: this.state.eventDate,
                                location: this.state.eventLocation,
                                title: this.state.eventName,
                                companyID: this.state.companyID
                            },
                            contents: newNoteContent,
                            files: []
                        }
                    let result = {}
                    if(this.state.creating){
                        result = await createEvent('application', event)
                    }
                    else{
                        result = await updateEvent('application', event)
                    }
                    if (this.props.connection){
                        try {
                            await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                            await this.props.connection.invoke('Application_Events_Update', JSON.parse(localStorage.getItem('user')).uID, this.props.applicationID, result.eventID) 
                            break; 
                        } catch(e) {
                            console.log(e);
                        }
                    }
                }
            }
        }
        else if(this.state.type ==='company'){
            for(var i=0;i<this.props.companies.length;i++){
                if(this.props.companies[i].companyID === this.props.companyID){
                    const event =   
                        {
                            eventID: this.state.eventID,
                            detail: {
                                applicationID: this.props.applicationID,
                                eventID: this.state.eventID,
                                time: this.state.eventDate,
                                location: this.state.eventLocation,
                                title: this.state.eventName,
                                companyID: this.state.companyID
                            },
                            contents: newNoteContent,
                            files: []
                        }
                    let result = {}
                    if(this.state.creating){
                        result = await createEvent('company', event)
                    }
                    else{
                        result = await updateEvent('company', event)
                    }
                    if (this.props.connection){
                        try {
                            console.log("Triggered")
                            await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                            await this.props.connection.invoke('Company_Events_Update', JSON.parse(localStorage.getItem('user')).uID, this.props.companyID, result.eventID)  
                        } catch(e) {
                            console.log(e);
                        }
                    }
                }
            }
        }
        this.props.handleClose()
    }

    onChangeName = (e) =>{
        this.setState({
            eventName : e.currentTarget.value
        })
        console.log(this.state.eventName)
    }
    onChangeLocation = (e) =>{
        this.setState({
            eventLocation : e.currentTarget.value
        })
    }
    onChangeDate = (date) =>{
        this.setState({
            eventDate : date
        })
        console.log(date)
    }
    onChangeHour = (hour) =>{
        this.setState({
            eventHour : hour
        })
    }
    onChangeMinute = (minute) =>{
        this.setState({
            eventMinute : minute
        })
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

    handleEditorState = (editorState) =>{
        this.setState({
            editorState: editorState
        })
    }
    onDelete = async() =>{
        if(this.state.type ==='application'){
            if(this.state.creating){
                this.props.handleClose()
            }else{
                await deleteEvent("application",this.props.applicationID,this.state.eventID)
                if (this.props.connection){
                    try {
                        console.log("Triggered")
                        await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                        await this.props.connection.invoke('Application_Events_Delete', JSON.parse(localStorage.getItem('user')).uID, this.props.applicationID, this.state.eventID)  
                    } catch(e) {
                        console.log(e);
                    }
                }
            }
        }
        else if(this.state.type ==='company'){
            if(this.state.creating){
                this.props.handleClose()
            }else{
                await deleteEvent("company",this.props.companyID,this.state.eventID)
                if (this.props.connection){
                    try {
                        console.log("Triggered")
                        await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                        await this.props.connection.invoke('Company_Event_Delete', JSON.parse(localStorage.getItem('user')).uID, this.props.companyID, this.state.eventID)  
                    } catch(e) {
                        console.log(e);
                    }
                }
            }
        }
        this.props.handleClose()
    }

    
    render(){
        const{step} = this.state;
        switch(step){
            case 1:
                return(
                    <div>
                        <EventDetail 
                            nextStep = {this.nextStep}
                            eventName = {this.state.eventName}
                            onChangeName = {this.onChangeName}
                            eventLocation = {this.state.eventLocation}
                            onChangeLocation = {this.onChangeLocation}
                            handleClose = {this.props.handleClose}
                            eventDate = {this.state.eventDate}
                            editorState = {this.props.editorState}
                            handleEditorState = {this.handleEditorState}
                            onSaveButton = {this.onSaveButton}
                            onDelete = {this.onDelete}
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <EventSelectDate
                        prevStep = {this.prevStep}
                        onChangeDate = {this.onChangeDate}
                        onChangeHour = {this.onChangeHour}
                        onChangeMinute = {this.onChangeMinute}
                        handleClose = {this.props.handleClose}
                        eventDate = {this.state.eventDate}
                        eventHour = {this.state.eventHour}
                        eventMinute = {this.state.eventMinute}
                        />
                    </div>
                )
        }
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CreateEditEvent)