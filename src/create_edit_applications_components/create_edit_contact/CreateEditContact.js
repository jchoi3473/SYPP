import React, {Component} from 'react';

import { RichUtils, ContentBlock, ContentState, EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {getDefaultKeyBinding} from 'draft-js';
import 'draft-js/dist/Draft.css';

import {connect} from 'react-redux'
import {setApps} from './../../redux/progress-reducer/progressAction'
import {setCompany} from './../../redux/company-reducer/companyAction'
import {updateApplicationDetail} from './../../redux/applicationDetail-reducer/ApplicationDetailAction'
import { editContent, deleteContent } from '../../lib/api';
import './../create_edit_event/CreateEvent.scss'
import './../CreateEditDetail.scss'

const mapStatetoProps = state => {
    return{
        apps: state.progress.applications,
        pending: state.progress.isPending,
        categories: state.categories.categories, 
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


export class CreateEditContact extends Component {
    state = {
        type: null,
        contactID : null,
        firstname : "",
        lastname: "", 
        title : "",
        email : "",
        emailID : null,
        phoneNumber : "",
        phoneID: null,
        editorState : "",
        creating: true,
        companyID:null, 
        company: "", 
    }

    //componentDidMount will determine if this is a new Event
    //if this is not a new event, will call exisitng features and save them to the state
    componentDidMount(){
        this.setState({
            type : this.props.type
        })
        if(this.props.contact !== ''){
            const contentBlocksArray = []
            for (var i=0;i<this.props.contact.convo.length;i++){
            if(this.props.contact.convo.length !== 0){
                contentBlocksArray.push(
                    new ContentBlock({
                        key: this.props.contact.convo[i].noteContentsID,
                        type: 'unordered-list-item',
                        depth: this.props.contact.convo[i].marginType,
                        text: this.props.contact.convo[i].content
                      })
                )
            }
        }
            console.log(this.props.Contact)

            this.setState({
                contactID : this.props.contact.contactID,
                firstname : this.props.contact.detail.firstname,
                title : this.props.contact.detail.title,
                email : this.props.contact.email.email,
                emailID : this.props.contact.email.emailID,
                phoneNumber : this.props.contact.phone.phoneNumber,
                phoneID: this.props.contact.phone.phoneID,
                editorState : EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocksArray)),
                creating: false
            })
        }
    }

//API CALL HERE
// //Send Post request, close modal(save button)


    onSaveButton = async() => {
        // this.props.postNewApp(this.props.addApp)
        const editorState = this.state.editorState
        var newNoteContent = []
        if(editorState){
            for(var i=0;i<editorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
                newNoteContent.push({
                noteContentsID : editorState._immutable.currentContent.blockMap._list._tail.array[i][0],
                content : editorState._immutable.currentContent.blockMap._list._tail.array[i][1].text,
                belongingID : this.state.contactID,
                marginType : editorState._immutable.currentContent.blockMap._list._tail.array[i][1].depth
                })
            }
        }

        //Creating a new event
        if(this.state.type ==='application'){
            var apps = this.props.apps
            for(var i=0;i<this.props.apps.length;i++){
                if(this.props.apps[i].applicationID === this.props.applicationID){
                    const contact = 
                    {
                        contactID: this.state.contactID,
                        detail: {
                            applicationID: this.props.applicationID,
                            company: this.state.company,
                            companyID: this.state.companyID,
                            contactID: this.state.contactID,
                            title: this.state.title,
                            firstname : this.state.firstname,
                            lastname: this.state.lastname, 
                        },
                        email: {
                            contactID: this.state.contactID,
                            email: this.state.email,
                            emailID : this.state.emailID
                        },
                        phone: {
                            contactID: this.state.contactID,
                            phoneNumber : this.state.PhoneNumber,
                            phoneID : this.state.phoneID
                        },
                        convo: newNoteContent,
                        files: []
                    }
                    let result = {}
                    if(this.state.creating){
                        result = await editContent('applications','Create','Contact',contact)
                    }
                    else{
                        result = await editContent('applications','Update','Contact',contact)
                    }
                    if (this.props.connection){
                        try {
                            await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                            await this.props.connection.invoke('Application_Contacts_Update', JSON.parse(localStorage.getItem('user')).uID, this.props.applicationID, result.contactID) 
                        } catch(e) {
                            console.log(e);
                        }
                    }
                    console.log(result)
                }
            }
        }
        //editing an existing event, app
        else if(this.state.type ==='company'){
            for(var i=0;i<this.props.companies.length;i++){
                console.log("this one is triggeredd?")
                if(this.props.companies[i].companyID === this.props.companyID){
                    const contact = 
                    {
                        contactID: this.state.contactID,
                        detail: {
                            applicationID: this.state.applicationID,
                            company: this.state.company,
                            companyID: this.state.companyID,
                            contactID: this.state.contactID,
                            title: this.state.title,
                            firstname : this.state.firstname,
                            lastname: this.state.lastname, 
                        },
                        email: {
                            contactID: this.state.contactID,
                            email: this.state.email,
                            emailID : this.state.emailID
                        },
                        phone: {
                            contactID: this.state.contactID,
                            phoneNumber : this.state.PhoneNumber,
                            phoneID : this.state.phoneID
                        },
                        convo: newNoteContent,
                        files: []
                    }
                    let result = {}
                    if(this.state.creating){
                        result = await editContent('company','Create','Contact',contact)
                    }
                    else{
                        result = await editContent('company','Update','Contact',contact)
                    }
                    if (this.props.connection){
                        try {
                            await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                            await this.props.connection.invoke('Company_Contacts_Update', JSON.parse(localStorage.getItem('user')).uID, this.props.companyID, result.contactID) 
                            break; 
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
            firstname : e.currentTarget.value
        })
    }
    onChangePosition = (e) =>{
        this.setState({
            title : e.currentTarget.value
        })
    }
    onChangeEmail = (e) =>{
        this.setState({
            email : e.currentTarget.value
        })
    }
    onChangePhoneNumber = (e) =>{
        this.setState({
            phoneNumber : e.currentTarget.value
        })
    }
    currentBlockKey = () => this.state.editorState.getSelection().getStartKey()
      
    currentBlockIndex = () => this.state.editorState.getCurrentContent().getBlockMap().keySeq().findIndex(k => k === this.currentBlockKey())
      
    myKeyBindingFn = (e) => {
        switch (e.keyCode) {
          case 9: // TAB
            if(this.currentBlockIndex() == 0){
              return undefined
            }
            else {
            const newEditorState = RichUtils.onTab(
              e,
              this.state.editorState,
              1 /* maxDepth */,
            );
            if (newEditorState !== this.state.editorState) {
              this.setState({
                editorState: newEditorState
              })
              return null;
            }
          }
          default: 
            return getDefaultKeyBinding(e);      
      }
    }
        //       console.log(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[this.currentBlockIndex()][1].depth)
    _handleChange = (editorState) => {
      console.log(this.state.editorState)
      if(RichUtils.getCurrentBlockType(editorState) !== 'unordered-list-item'){
        const newEditorState = RichUtils.toggleBlockType(editorState, 'unordered-list-item')
        this.setState({editorState: newEditorState})
      }
      else{
        this.setState({editorState});
      }
    }
    onDelete = async() =>{
        if(this.state.type ==='application'){
            if(this.state.creating){
                this.props.handleClose()
            }else{
                // await deleteEvent("application",this.props.applicationID,this.state.eventID)
                await deleteContent("applications",this.props.applicationID,'Contact',this.state.contactID)
                if (this.props.connection){
                    try {
                        console.log("Triggered")
                        await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                        await this.props.connection.invoke('Application_Contacts_Delete', JSON.parse(localStorage.getItem('user')).uID, this.props.applicationID, this.state.contactID)  
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
                await deleteContent("company",this.props.applicationID,'Contact',this.state.contactID)

                if (this.props.connection){
                    try {
                        console.log("Triggered")
                        await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                        await this.props.connection.invoke('Company_Contacts_Delete', JSON.parse(localStorage.getItem('user')).uID, this.props.companyID, this.state.contactID)  
                    } catch(e) {
                        console.log(e);
                    }
                }
            }
        }
        this.props.handleClose()
    }

    
    render(){
       return (
        <div>
            <div className = "sypp-create-edit-detail-container">
            <input
                className = "sypp-event-name"
                placeholder="Contact Name Here"
                onChange={e => this.onChangeName(e)}
                value={this.state.firstname}
                />
                <input
                className = "sypp-contact-name-subtitle"
                placeholder="Contact Name Here"
                onChange={e => this.onChangePosition(e)}
                value={this.state.title}
                />
             <div className ="sypp-event-seperateLine"></div>
            <div className = "sypp-event-title">Email</div>
            <input
                className = "sypp-contact-name-body"
                placeholder="Contact Name Here"
                onChange={e => this.onChangeEmail(e)}
                value={this.state.email}
            />
            <div className = "sypp-event-title">PhoneNumber</div>
            <input
                className = "sypp-contact-name-body"
                placeholder="Contact Name Here"
                onChange={e => this.onChangePhoneNumber(e)}
                value={this.state.phoneNumber}
            />
            <div className = "sypp-event-title">Notes</div>

            <div style={{overflowY: 'scroll', height: '170px'}}>
                <Editor 
                    placeholder = "      Text Here"
                    toolbarHidden
                    editorClassName="sypp-editor-class"
                    editorState={this.state.editorState}
                    onEditorStateChange={this._handleChange}
                    keyBindingFn={this.myKeyBindingFn}
                />
            </div>
            </div>
            <div className = "sypp-event-bottom-options-container">
                <button className = "sypp-event-bottom-option sypp-option1 sypp-option1-page1" onClick = {this.onDelete}>Delete</button>
                <button className = "sypp-event-bottom-option sypp-option2 sypp-option2-page1" onClick = {this.onSaveButton}>Save</button>
                <button className = "sypp-event-bottom-option sypp-option3 sypp-option3-page1" onClick = {this.props.handleClose}>Close</button>
            </div>
        </div>
       );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CreateEditContact)