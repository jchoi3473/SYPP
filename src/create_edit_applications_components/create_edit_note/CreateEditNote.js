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
import { createNote, updateNote, deleteNote } from '../../lib/api';


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


export class CreateEditNote extends Component {
    state = {
        type: '',
        noteID : null,
        noteDate : new Date(),
        noteName : '',
        editorState : '',
        creating: true
    }

    //componentDidMount will determine if this is a new Event
    //if this is not a new event, will call exisitng features and save them to the state
    componentDidMount(){
        this.setState({
            type : this.props.type
        })
        if(this.props.note !== ''){
            this.setState({
                noteID: this.props.note.noteID,
                noteName : this.props.note.detail.title,
                noteDate : this.props.note.detail.time,
                editorState : this.props.editorState,
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
        if(editorState !== ''){
            for(var i=0;i<editorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
                newNoteContent.push({
                noteContentsID : editorState._immutable.currentContent.blockMap._list._tail.array[i][0],
                content : editorState._immutable.currentContent.blockMap._list._tail.array[i][1].text,
                belongingID : this.props.note.noteID,
                marginType : editorState._immutable.currentContent.blockMap._list._tail.array[i][1].depth
                })
            }
        }

        //Creating a new event
        if(this.state.type ==='application'){
            for(var i=0;i<this.props.apps.length;i++){
                if(this.props.apps[i].applicationID === this.props.applicationID){
                    const note =   
                    {
                        noteID: this.state.noteID,
                        detail: {
                            noteID: this.state.noteID,
                            time: this.state.noteDate,
                            title: this.state.noteName
                        },
                        contents: newNoteContent,
                        files: []
                    }
                    let result = {}
                    if(this.state.creating){
                        result = await createNote('application', note)
                    }
                    else{
                        result = await updateNote('application', note)
                    }
                    console.log(result)
                    if (this.props.connection){
                        try {
                            await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                            await this.props.connection.invoke('Application_Notes_Update', JSON.parse(localStorage.getItem('user')).uID, this.props.applicationID, result.noteID)  
                        } catch(e) {
                            console.log(e);
                        }
                    }
                }
            }
        }
        //company detail fixing part, when it doesnt exist 
        else if(this.state.type ==='company'){
            for(var i=0;i<this.props.companies.length;i++){
                if(this.props.companies[i].companyID === this.props.companyID){
                    const note =   
                    {
                        noteID: this.state.noteID,
                        detail: {
                            noteID: this.state.noteID,
                            time: this.state.noteDate,
                            title: this.state.noteName
                        },
                        contents: newNoteContent,
                        files:[]
                    }
                    let result = {}
                    if(this.state.creating){
                        result = await createNote('company', note)
                    }
                    else{
                        result = await updateNote('company', note)
                    }
                    if (this.props.connection){
                        try {
                            console.log("Triggered")
                            await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                            await this.props.connection.invoke('Company_Notes_Update', JSON.parse(localStorage.getItem('user')).uID, this.props.companyID, result.noteID)  
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
            noteName : e.currentTarget.value
        })
    }

    handleEditorState = (editorState) =>{
        this.setState({
            editorState: editorState
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
                await deleteNote("application",this.props.applicationID,this.state.noteID)
                if (this.props.connection){
                    try {
                        console.log("Triggered")
                        await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                        await this.props.connection.invoke('Application_Notes_Delete', JSON.parse(localStorage.getItem('user')).uID, this.props.applicationID, this.state.noteID)  
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
                await deleteNote("company",this.props.companyID,this.state.noteID)
                if (this.props.connection){
                    try {
                        console.log("Triggered")
                        await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                        await this.props.connection.invoke('Company_Notes_Delete', JSON.parse(localStorage.getItem('user')).uID, this.props.companyID, this.state.noteID)  
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
                placeholder="Note Title Here"
                onChange={e => this.onChangeName(e)}
                value={this.state.noteName}
                />
             <div className ="sypp-event-seperateLine"></div>
            <div className = "sypp-event-title">Notes</div>
            <Editor 
                placeholder = "      Text Here"
                toolbarHidden
                editorClassName="sypp-editor-class"
                editorState={this.state.editorState}
                onEditorStateChange={this._handleChange}
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

export default connect(mapStatetoProps, mapDispatchToProps)(CreateEditNote)