import React, {Component} from 'react';
import { RichUtils, ContentBlock, genKey, ContentState, EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {getDefaultKeyBinding, KeyBindingUtil, keyBindingFn} from 'draft-js';
import 'draft-js/dist/Draft.css';
import Moment from 'moment';


class EventDetail extends Component {
    constructor(props) {
        super(props);
          this.state = {
          editorState: ''
        };
    }
    componentDidMount(){
        if(this.props.editorState !== ''){
            this.setState({
                editorState : this.props.editorState
            })
        }
    }
    onSave = () =>{
      this.props.handleEditorState(this.state.editorState);
      this.props.onSaveButton(this.state.editorState);
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
        return(
            <div >
                <div className = "sypp-event-detail-container">
                <input
                className = "sypp-event-name"
                placeholder="Event Name Here"
                onChange={e => this.props.onChangeName(e)}
                value={this.props.eventName}
                />
                <div className ="sypp-event-seperateLine"></div>
                <div className = "sypp-event-title">Date and Time</div>
                {this.props.eventDate === ''?                 
                <button className = "sypp-event-datePick-button" onClick = {this.props.nextStep}>
                    Select Date and Time
                </button>:
                <div className = "sypp-event-datepick-resultDate-container">
                <div className = "sypp-event-datepick-resultDate">{Moment(this.props.eventDate).format('MMM DD, YYYY • h:mma')}</div>
                <button className = "sypp-event-datePick-button" onClick = {this.props.nextStep}>
                Edit Date and Time
                </button>
                </div>
                }
                <div className = "sypp-event-title">Location</div>                
                <input
                className = "sypp-event-location"
                placeholder="Location Here"
                onChange={e => this.props.onChangeLocation(e)}
                value={this.props.eventLocation}
                />  
                <div className ="sypp-event-seperateLine"></div>

                <div className = "sypp-event-title">Note</div>    
                <div style={{overflowY: 'scroll', height: '165px'}}>            
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
                    <button className = "sypp-event-bottom-option sypp-option1 sypp-option1-page1">Delete</button>
                    <button className = "sypp-event-bottom-option sypp-option2 sypp-option2-page1" onClick = {this.onSave}>Save</button>
                    <button className = "sypp-event-bottom-option sypp-option3 sypp-option3-page1" onClick = {this.props.handleClose}>Close</button>
                </div>
            </div>
        );
    }
}
export default EventDetail