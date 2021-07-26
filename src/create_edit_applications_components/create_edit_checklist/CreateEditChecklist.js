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
        checkListsID : '',
        title : '',
        checkboxEditorState : '',
        noteEditorState : '',
        checkboxState : []
    }

    //componentDidMount will determine if this is a new Event
    //if this is not a new event, will call exisitng features and save them to the state
    componentDidMount(){
        this.setState({
            type : this.props.type
        })
        if(this.props.Checklist !== ''){
            this.setState({
                checkListsID : this.props.checklist.checkListsID,
                title : this.props.checklist.type,
                checkboxEditorState : this.props.checkboxEditorState,
                noteEditorState : this.props.noteEditorState,
                checkboxState : this.props.checkboxState
            })
        }
    }

//API CALL HERE
// //Send Post request, close modal(save button)

    onSaveButton = () => {
        // this.props.postNewApp(this.props.addApp)
        var newNoteContent = []
        if(this.state.editorState !== ''){
            for(var i=0;i<this.state.editorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
                newNoteContent.push({
                    checklistID : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][0],
                    Type : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][1].text,
                    Submission : this.state.checkboxState[i].checkboxBoolean,
                    Files : 'null'
                })
            }
        }
        //Creating a new event
        if(this.state.checkListsID === '' && this.state.type ==='application'){
            var apps = this.props.apps
            for(var i=0;i<this.props.apps.length;i++){
                if(this.props.apps[i].applicationID === this.props.applicationID){
                    const key = genKey()
                    apps[i].Checklists.push(  
                        {
                            checkListsID: key,
                            Detail: {
                                checkListsID: key,
                                Time: new Date(),
                                Title: this.state.Title
                            },
                            Contents: newNoteContent
                        }
                    )
                }
            }
            this.props.setApps(apps)
        }
        //editing an existing event, app
        else if(this.state.checkListsID !== '' && this.state.type ==='application'){
            this.props.handleCheckbox(this.state.checkboxState)
            var apps = this.props.apps 
            for(var i=0;i<this.props.apps.length;i++){
                console.log("this one is triggeredd?")
                if(this.props.apps[i].applicationID === this.props.applicationID){
                    for(var j=0; j<this.props.apps[i].Checklists.length;j++){
                        if(this.props.apps[i].Checklists[j].checkListsID === this.state.checkListsID){
                            apps[i].Checklists[j] = {
                                checkListsID: this.state.noteID,
                                Detail: {
                                    checkListsID: this.state.noteID,
                                    Time: new Date(),
                                    Title: this.state.Title 
                                },
                                Contents: newNoteContent
                            }
                        }
                    }
                }
            }
            this.props.setApps(apps)
            this.props._handleChange(this.state.editorState)
            this.props.onSaveChecklist()
        }
        //company detail fixing part, when it doesnt exist 
        else if(this.state.checkListsID === '' && this.state.type ==='company'){
            var companies = this.props.companies
            for(var i=0;i<this.props.companies.length;i++){
                if(this.props.companies[i].companyID === this.props.companyID){
                    const key = genKey()
                    console.log("this one is triggeredd...")
                    companies[i].Checklists.push(  
                        {
                            checkListsID: key,
                            Detail: {
                                checkListsID: key,
                                Time: new Date(),
                                Title: this.state.Title
                            },
                            Contents: newNoteContent
                        }
                    )
                }
            }
            this.props.setCompany(companies)
        }
        else if(this.state.checkListsID !== '' && this.state.type ==='company'){
            this.props.handleCheckbox(this.state.checkboxState)
            var companies = this.props.companies 
            for(var i=0;i<this.props.companies.length;i++){
                console.log("this one is triggeredd?")
                if(this.props.companies[i].companyID === this.props.companyID){
                    for(var j=0; j<this.props.companies[i].Checklists.length;j++){
                        if(this.props.companies[i].Checklists[j].checkListsID === this.state.checkListsID){
                            companies[i].Checklists[j] = {
                                checkListsID: this.state.checkListsID,
                                Detail: {
                                    checkListsID: this.state.checkListsID,
                                    Time: new Date(),
                                    Title: this.state.Title
                                },
                                Contents: newNoteContent
                            }
                        }
                    }
                }
            }
            this.props.setCompany(companies)
            this.props._handleChange(this.state.editorState)
            this.props.onSaveChecklist()
        }
        this.props.handleClose()
    }

    onChangeTitle = (e) =>{
        this.setState({
            type : e.currentTarget.value
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
        if(RichUtils.getCurrentBlockType(this.state.noteEditorState) !== 'unordered-list-item'){
            const newEditorState = RichUtils.toggleBlockType(this.state.noteEditorState, 'unordered-list-item')
            this.setState({noteEditorState: newEditorState})
        }
        else{
            this.setState({noteEditorState:editorState});
        }
    }
    _handleChange = (editorState) => {      
            this.setState({checkboxEditorState:editorState});
            console.log("editor state = ")
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

    
    render(){
       return (
        <div>
            <div className = "sypp-create-edit-detail-container">
            <input
                className = "sypp-event-name"
                placeholder="Checklist Name"
                onChange={e => this.onChangeTitle(e)}
                value={this.state.type}
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
                <button className = "sypp-event-bottom-option sypp-option1 sypp-option1-page1">Delete</button>
                <button className = "sypp-event-bottom-option sypp-option2 sypp-option2-page1" onClick = {this.onSaveButton}>Save</button>
                <button className = "sypp-event-bottom-option sypp-option3 sypp-option3-page1" onClick = {this.props.handleClose}>Close</button>
            </div>
        </div>
       );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CreateEditChecklist)