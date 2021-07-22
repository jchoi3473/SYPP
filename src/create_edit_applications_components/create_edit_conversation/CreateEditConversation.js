import React, {Component} from 'react';
import ConversationDetail from './ConversationDetail'
import ConversationDate from './ConversationDate'

import { RichUtils, ContentBlock, genKey, ContentState, EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {getDefaultKeyBinding, KeyBindingUtil, keyBindingFn} from 'draft-js';
import 'draft-js/dist/Draft.css';

import {connect} from 'react-redux'
import {setApps} from '../../redux/progress-reducer/progressAction'
import {setCompany} from '../../redux/company-reducer/companyAction'
import {updateApplicationDetail} from '../../redux/applicationDetail-reducer/ApplicationDetailAction'
import { editContent, deleteContent } from '../../lib/api';

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
export class CreateEditConversation extends Component {
    constructor(props){
        super(props)
        
        this.state = 
        {
            step : 1,
            type: '',
            followUpID : null,
            time : '',
            name : '',
            position : '',
            editorState : '',
            creating: true
        }
    }

    //componentDidMount will determine if this is a new Event
    //if this is not a new event, will call exisitng features and save them to the state
    componentDidMount(){
        this.setState({
            type : this.props.type
        })
        if(this.props.followUp !== ''){
            this.setState({
                followUpID : this.props.followUp.followUpID,
                name : this.props.followUp.detail.personnel.firstname,
                time : this.props.followUp.detail.time,
                position : this.props.followUp.detail.personnel.title,
                editorState : this.props.editorState,
                creating: false
            })
        }
    }

//API CALL HERE
// //Send Post request, close modal(save button)

    onSaveButton = async() => {
        // this.props.postNewApp(this.props.addApp)
        var newNoteContent = []
        const editorState = this.state.editorState
        if(editorState){
            for(var i=0;i<editorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
                newNoteContent.push({
                    noteContentsID : editorState._immutable.currentContent.blockMap._list._tail.array[i][0],
                    content : editorState._immutable.currentContent.blockMap._list._tail.array[i][1].text,
                    belongingID : this.state.followUpID,
                    marginType : editorState._immutable.currentContent.blockMap._list._tail.array[i][1].depth
                })
            }
        }
        //Creating a new event
        if(this.state.type ==='application'){
            for(var i=0;i<this.props.apps.length;i++){
                if(this.props.apps[i].applicationID === this.props.applicationID){
                    const followUp = 
                    {
                        followUpID : this.state.followUpID,
                        detail:{
                            followUpID : this.state.followUpID,
                            companyID: null,
                            applicationID: this.props.applicationID,
                            personnel: {
                                applicationID: this.props.applicationID,
                                company: null, 
                                companyID: null,
                                firstname: this.state.name,
                                lastname: null,
                                title: this.state.position,
                            },
                            time : this.state.time,
                        },
                        description: newNoteContent,
                        files:[]
                    }
                    let result = {}
                    if(this.state.creating){
                        result = await editContent('applications','Create','FollowUp',followUp)
                    }
                    else{
                        result = await editContent('applications','Update','FollowUp',followUp)
                    }
                    if (this.props.connection){
                        try {
                            await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                            await this.props.connection.invoke('Application_FollowUps_Update', JSON.parse(localStorage.getItem('user')).uID, this.props.applicationID, result.followUpID) 
                        } catch(e) {
                            console.log(e);
                        }
                    }
                    console.log(result)
                }
            }
        }
        else if(this.state.type ==='company'){
            for(var i=0;i<this.props.companies.length;i++){
                if(this.props.companies[i].companyID === this.props.companyID){
                    const followUp = 
                    {
                        followUpID : this.state.followUpID,
                        detail:{
                            followUpID : this.state.followUpID,
                            companyID: this.props.companyID,
                            applicationID: null,
                            personnel: {
                                applicationID: null,
                                company: null, 
                                companyID: this.props.companyID,
                                firstname: this.state.name,
                                lastname: null,
                                title: this.state.position,
                            },
                            time : this.state.time,
                        },
                        description: newNoteContent,
                        files:[]
                    }
                    let result = {}
                    if(this.state.creating){
                        result = await editContent('company','Create','FollowUp',followUp)
                    }
                    else{
                        result = await editContent('company','Update','FollowUp',followUp)
                    }
                    if (this.props.connection){
                        try {
                            await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                            await this.props.connection.invoke('Company_FollowUps_Update', JSON.parse(localStorage.getItem('user')).uID, this.props.companyID, result.followUpID) 
                        } catch(e) {
                            console.log(e);
                        }
                    }
                    console.log(result)
                }
            }
        }
        this.props.handleClose()
    }

    onChangeName = (e) =>{
        this.setState({
            name : e.currentTarget.value
        })
        console.log(this.state.eventName)
    }
    onChangePosition = (e) =>{
        this.setState({
            position : e.currentTarget.value
        })
    }
    onChangeDate = (date) =>{
        this.setState({
            time : date
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
                // await deleteEvent("application",this.props.applicationID,this.state.eventID)
                await deleteContent("applications",this.props.applicationID,'FollowUp',this.state.followUpID)
                if (this.props.connection){
                    try {
                        console.log("Triggered")
                        await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                        await this.props.connection.invoke('Application_FollowUps_Delete', JSON.parse(localStorage.getItem('user')).uID, this.props.applicationID, this.state.followUpID)  
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
                // await deleteEvent("company",this.props.companyID,this.state.eventID)
                await deleteContent("company",this.props.applicationID,'FollowUp',this.state.followUpID)

                if (this.props.connection){
                    try {
                        console.log("Triggered")
                        await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                        await this.props.connection.invoke('Company_FollowUps_Delete', JSON.parse(localStorage.getItem('user')).uID, this.props.companyID, this.state.followUpID)  
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
                        <ConversationDetail 
                            nextStep = {this.nextStep}
                            name = {this.state.name}
                            onChangeName = {this.onChangeName}
                            position = {this.state.position}
                            onChangePosition = {this.onChangePosition}
                            handleClose = {this.props.handleClose}
                            time = {this.state.time}
                            editorState = {this.props.editorState}
                            handleEditorState = {this.handleEditorState}
                            onDelete = {this.onDelete}
                            onSaveButton = {this.onSaveButton}
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <ConversationDate
                        prevStep = {this.prevStep}
                        onChangeDate = {this.onChangeDate}
                        handleClose = {this.props.handleClose}
                        time = {this.state.time}
                        />
                    </div>
                )
            default:
                return <></>
        }
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CreateEditConversation)