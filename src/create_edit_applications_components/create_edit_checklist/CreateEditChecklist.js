import React, {Component} from 'react';

import { RichUtils, ContentBlock, genKey, ContentState, EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {getDefaultKeyBinding, KeyBindingUtil, keyBindingFn} from 'draft-js';
import 'draft-js/dist/Draft.css';

import { v4 as uuidv4 } from 'uuid';
import {connect} from 'react-redux'
import {setApps} from './../../redux/progress-reducer/progressAction'
import {setCompany} from './../../redux/company-reducer/companyAction'
import {updateApplicationDetail} from './../../redux/applicationDetail-reducer/ApplicationDetailAction'
import './../create_edit_event/CreateEvent.scss'
import './../CreateEditDetail.scss'
import { editContent, deleteContent } from '../../lib/api';


import { faListAlt} from "@fortawesome/free-solid-svg-icons";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import Checkbox from '@material-ui/core/Checkbox';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormControlLabel from '@material-ui/core/FormControlLabel';

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


export class CreateEditChecklist extends Component {
    state = {
        type: '',
        checklistID : null,
        title : '',
        checkboxEditorState : '',
        noteEditorState : '',
        checkboxState : [],
        creating: true
    }

    //componentDidMount will determine if this is a new Event
    //if this is not a new event, will call exisitng features and save them to the state
    componentDidMount(){
        this.setState({
            type : this.props.type
        })
        if(this.props.checklist !== ''){
            this.setState({
                checklistID : this.props.checklist.checklistID,
                title : this.props.checklist.type,
                checkboxEditorState : this.props.checkboxEditorState,
                noteEditorState : this.props.noteEditorState,
                checkboxState : this.props.checkboxState,
                creating: false
            })
        }
    }

//API CALL HERE
// //Send Post request, close modal(save button)

    onSaveButton = async() => {
        // this.props.postNewApp(this.props.addApp)
        var newCheckListContent = []
        var newNoteContent = []
        if(this.state.checkboxEditorState !== ''){
            for(var i=0;i<this.state.checkboxEditorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
                newCheckListContent.push({
                    checkOptionID : this.state.checkboxEditorState._immutable.currentContent.blockMap._list._tail.array[i][0],
                    content : this.state.checkboxEditorState._immutable.currentContent.blockMap._list._tail.array[i][1].text,
                    isChecked : this.state.checkboxState[i].checkboxBoolean,
                    checklistID : this.state.checklistID
                })
            }    
        
        }
        if(this.state.noteEditorState !== ''){
            for(var i=0;i<this.state.noteEditorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
                newNoteContent.push({
                    noteContentsID : this.state.noteEditorState._immutable.currentContent.blockMap._list._tail.array[i][0],
                    content : this.state.noteEditorState._immutable.currentContent.blockMap._list._tail.array[i][1].text,
                    belongingID : this.state.checklistID,
                    marginType : this.state.noteEditorState._immutable.currentContent.blockMap._list._tail.array[i][1].depth
                })
            }
        }
        //Creating a new event
        if(this.state.type ==='application'){
            var apps = this.props.apps
            for(var i=0;i<this.props.apps.length;i++){
                if(this.props.apps[i].applicationID === this.props.applicationID){
                    const checklist = 
                        {
                            checklistID: this.state.checklistID,
                            applicationID: this.props.applicationID, 
                            companyID: null, 
                            files: [],
                            notes: newNoteContent,
                            options: newCheckListContent,
                            submission: false, 
                            type: this.state.title
                        }
                    let result = {}
                    if(this.state.creating){
                        result = await editContent('applications','Create','Checklist',checklist)
                    }
                    else{
                        result = await editContent('applications','Update','Checklist',checklist)
                    }
                    if (this.props.connection){
                        try {
                            await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                            await this.props.connection.invoke('Application_Checklists_Update', JSON.parse(localStorage.getItem('user')).uID, this.props.applicationID, result.checklistID) 
                            break;
                        } catch(e) {
                            console.log(e);
                        }
                    }
                    console.log(result)
                }
            }
        }
        //company detail fixing part, when it doesnt exist 
        else if(this.state.type ==='company'){
            for(var i=0;i<this.props.companies.length;i++){
                if(this.props.companies[i].companyID === this.props.companyID){
                    const checklist = 
                    {
                        checklistID: this.state.checklistID,
                        applicationID: null, 
                        companyID: this.props.companyID, 
                        files: [],
                        notes: newNoteContent,
                        options: newCheckListContent,
                        submission: false, 
                        type: this.state.title
                    }
                    let result = {}
                    if(this.state.creating){
                        result = await editContent('company','Create','Checklist',checklist)
                    }
                    else{
                        result = await editContent('company','Update','Checklist',checklist)
                    }
                    if (this.props.connection){
                        try {
                            await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                            await this.props.connection.invoke('Application_Checklists_Update', JSON.parse(localStorage.getItem('user')).uID, this.props.companyID, result.checklistID) 
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

    onChangeTitle = (e) =>{
        this.setState({
            title : e.currentTarget.value
        })
    }

    handleEditorState = (editorState) =>{
        this.setState({
            editorState: editorState
        })
    }

    myKeyBindingFn = (e) => {
        switch (e.keyCode) {
          case 9: // TAB
            if(this.currentBlockIndexNote() == 0){
              return undefined
            }
            else {
            const newEditorState = RichUtils.onTab(
              e,
              this.state.noteEditorState,
              1 /* maxDepth */,
            );
            if (newEditorState !== this.state.noteEditorState) {
              this.setState({
                noteEditorState: newEditorState
              })
              return null;
            }
          }
          default: 
            return getDefaultKeyBinding(e);      
      }
    }

    currentBlockKey = () => this.state.checkboxEditorState.getSelection().getStartKey()
    currentBlockIndex = () => this.state.checkboxEditorState.getCurrentContent().getBlockMap().keySeq().findIndex(k => k === this.currentBlockKey())

    currentBlockKeyNote = () => this.state.noteEditorState.getSelection().getStartKey()
    currentBlockIndexNote = () => this.state.noteEditorState.getCurrentContent().getBlockMap().keySeq().findIndex(k => k === this.currentBlockKey())

    _handleChangeNote = (editorState) => {
        console.log(this.state.noteEditorState)
        if(RichUtils.getCurrentBlockType(editorState) !== 'unordered-list-item'){
            const newEditorState = RichUtils.toggleBlockType(editorState, 'unordered-list-item')
            this.setState({noteEditorState: newEditorState})
        }
        else{
            this.setState({noteEditorState:editorState});
        }
    }
    _handleChange = (editorState) => {      
            this.setState({checkboxEditorState:editorState});
            if(this.state.checkboxEditorState!==''){
            if(this.state.checkboxEditorState._immutable.currentContent.blockMap._list._tail.array.length > this.state.checkboxState.length){
                var tempCheckbox = 
                [
                    ...this.state.checkboxState.slice(0, this.currentBlockIndex()),
                    {
                        checklistID: this.state.checkboxEditorState._immutable.currentContent.blockMap._list._tail.array[this.currentBlockIndex()][0],
                        checkboxBoolean: false
                    },
                    ...this.state.checkboxState.slice(this.currentBlockIndex())
                ]
               this.setState({
                checkboxState : tempCheckbox
               })
               console.log(this.state.checkboxState)
            }
            else if(this.state.checkboxEditorState._immutable.currentContent.blockMap._list._tail.array.length < this.state.checkboxState.length){
                var tempCheckbox = []
                for(var i = 0; i<this.state.checkboxEditorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
                    for(var j=0;j< this.state.checkboxState.length;j++){
                        if(this.state.checkboxEditorState._immutable.currentContent.blockMap._list._tail.array[i][0]===this.state.checkboxState[j].checklistID){
                            tempCheckbox.push(this.state.checkboxState[j])
                        }
                    }
                }
               this.setState({
                checkboxState : tempCheckbox
               })
            }
        }
            this.setState({})
        }

    onCheckBoxClick = (checkboxID) => {
        var tempCheckbox = this.state.checkboxState
        for(var i=0;i<this.state.checkboxState.length;i++){
            if(checkboxID === this.state.checkboxState[i].checklistID){
                tempCheckbox[i].checkboxBoolean = !tempCheckbox[i].checkboxBoolean
            }
            this.setState({
                checkboxState : tempCheckbox 
            })
        }
    }
    onDelete = async() =>{
        if(this.state.type ==='application'){
            if(this.state.creating){
                this.props.handleClose()
            }else{
                // await deleteEvent("application",this.props.applicationID,this.state.eventID)
                await deleteContent("applications",this.props.applicationID,'Checklist',this.state.checklistID)
                if (this.props.connection){
                    try {
                        console.log("Triggered")
                        await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                        await this.props.connection.invoke('Application_Checklists_Delete', JSON.parse(localStorage.getItem('user')).uID, this.props.applicationID, this.state.checklistID)  
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
                await deleteContent("company",this.props.applicationID,'Checklist',this.state.checklistID)

                if (this.props.connection){
                    try {
                        console.log("Triggered")
                        await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                        await this.props.connection.invoke('Company_Checklists_Delete', JSON.parse(localStorage.getItem('user')).uID, this.props.companyID, this.state.checklistID)  
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
                placeholder="Checklist Name"
                onChange={e => this.onChangeTitle(e)}
                value={this.state.title}
                />
             <div className ="sypp-event-seperateLine"></div>
            <div className = "sypp-ApplicationDetailChecklists-container" style={{overflowY: 'scroll', height: '100px'}}>
            <div className = "sypp-CheckList-Container" style = {{"height":""+this.state.checkboxState.length*16.35}}>
            {
                this.state.checkboxState.length === 0 ? 
                <div className = "sypp-emptybody-checkbox-container">
                    <FormControlLabel 
                    className = "sypp-FormRoot"
                    control = {
                    <Checkbox 
                    icon=  {<FontAwesomeIcon className = "sypp-CheckBox-icon" icon={faSquare}/> }
                    checkedIcon= {<FontAwesomeIcon className = " sypp-checked sypp-emptybody-checkbox" icon={faCheckSquare}/> }
                    className = "sypp-Checkbox-padding sypp-Checkbox-padding2"
                    checked = {true} 
                    />}
                    />
                </div>
                :this.state.checkboxState.map((checkbox) => (
                    // <FormGroup row>
                    <FormControlLabel 
                    className = "sypp-FormRoot"
                    control = {
                    <Checkbox 
                    icon=  {<FontAwesomeIcon className = "sypp-CheckBox-icon" icon={faSquare}/> }
                    checkedIcon= {<FontAwesomeIcon className = "sypp-CheckBox-icon sypp-checked" icon={faCheckSquare}/> }
                    className = "sypp-Checkbox-padding sypp-Checkbox-padding2"
                    checked = {checkbox.checkboxBoolean} 
                    onChange = {() => this.onCheckBoxClick(checkbox.checklistID)}/>}
                    />
                    // </FormGroup>
                ))
            }
            </div>
            <div className = "sypp-Editor-Container">
                <Editor 
                toolbarHidden
                editorClassName="sypp-editor-class"
                placeholder = "Checklist Items"
                editorState={this.state.checkboxEditorState}
                onEditorStateChange={this._handleChange}
                //   keyBindingFn={this.myKeyBindingFn}
                />
            </div>
            </div>
            </div>
            <div>
            <div className ="sypp-event-seperateLine"></div>
            <Editor 
                placeholder = "      Text Here"
                toolbarHidden
                editorClassName="sypp-editor-class"
                editorState={this.state.noteEditorState}
                onEditorStateChange={this._handleChangeNote}
                keyBindingFn={this.myKeyBindingFn}
            />
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

export default connect(mapStatetoProps, mapDispatchToProps)(CreateEditChecklist)