import React, {Component} from 'react';

import { RichUtils, ContentBlock, genKey, ContentState, EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {getDefaultKeyBinding, KeyBindingUtil, keyBindingFn} from 'draft-js';
import 'draft-js/dist/Draft.css';

import { v4 as uuidv4 } from 'uuid';
import {connect} from 'react-redux'
import {setApps} from '../../redux/progress-reducer/progressAction'
import {setCompany} from '../../redux/company-reducer/companyAction'
import {updateApplicationDetail} from '../../redux/applicationDetail-reducer/ApplicationDetailAction'
import './../create_edit_event/CreateEvent.scss'
import './../CreateEditDetail.scss'

const mapStatetoProps = state => {
    return{
        apps: state.progress.applications,
        pending: state.progress.isPending,
        categories: state.categories.categories, 
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
        noteID : '',
        noteDate : new Date(),
        noteName : '',
        editorState : ''
    }

    //componentDidMount will determine if this is a new Event
    //if this is not a new event, will call exisitng features and save them to the state
    componentDidMount(){
        this.setState({
            type : this.props.type
        })
        if(this.props.Note !== ''){
            this.setState({
                noteID: this.props.Note.noteID,
                noteName : this.props.Note.Detail.Title,
                noteDate : this.props.Note.Detail.Time,
                editorState : this.props.editorState
            })
        }
    }

//API CALL HERE
// //Send Post request, close modal(save button)

    onSaveButton = () => {
        // this.props.postNewApp(this.props.addApp)
        console.log(this.state.editorState)
      var newNoteContent = [{
        noteContentsID : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[0][0],
        Header : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[0][1].text,
        Contents_Text : []
      }];
      var tracker = 0;
        for(var i=1;i<this.state.editorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
          if(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][1].depth === 0){
            tracker++;
            newNoteContent.push({
              noteContentsID : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][0],
              Header : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][1].text,
              Contents_Text : []
            })
          }
          else{
            newNoteContent[tracker].Contents_Text.push(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][1].text)
          }
        }
        //Creating a new event
        if(this.state.noteID === '' && this.state.type ==='application'){
            var apps = this.props.apps
            for(var i=0;i<this.props.apps.length;i++){
                if(this.props.apps[i].applicationID === this.props.applicationID){
                    const key = genKey()
                    console.log("this one is triggeredd...")
                    apps[i].Notes.push(  
                        {
                            noteID: key,
                            Detail: {
                                noteID: key,
                                Time: this.state.noteDate,
                                Title: this.state.noteName
                            },
                            Contents: newNoteContent
                        }
                    )
                }
            }
            this.props.setApps(apps)
        }
        //editing an existing event, app
        else if(this.state.noteID !== '' && this.state.type ==='application'){
            var apps = this.props.apps 
            for(var i=0;i<this.props.apps.length;i++){
                console.log("this one is triggeredd?")
                if(this.props.apps[i].applicationID === this.props.applicationID){
                    for(var j=0; j<this.props.apps[i].Notes.length;j++){
                        if(this.props.apps[i].Notes[j].noteID === this.state.noteID){
                            apps[i].Notes[j] = {
                                noteID: this.state.noteID,
                                Detail: {
                                    noteID: this.state.noteID,
                                    Time: this.state.noteDate,
                                    Title: this.state.noteName
                                },
                                Contents: newNoteContent
                            }
                        }
                    }
                }
            }
            this.props.setApps(apps)
            this.props.onSaveNote()
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
                <button className = "sypp-event-bottom-option sypp-option1 sypp-option1-page1">Delete</button>
                <button className = "sypp-event-bottom-option sypp-option2 sypp-option2-page1" onClick = {this.onSaveButton}>Save</button>
                <button className = "sypp-event-bottom-option sypp-option3 sypp-option3-page1" onClick = {this.props.handleClose}>Close</button>
            </div>
        </div>
       );
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CreateEditNote)