import React from 'react';
import ReactDOM from 'react-dom';
import { RichUtils, ContentBlock, genKey, ContentState, EditorState, convertFromRaw, contentBlocks} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'draft-js/dist/Draft.css';
import './ApplicationDetailNotes.scss'
import './../main_applications/ApplicationDetail.scss'
import './ApplicationDetailEvents.scss'
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Moment from 'moment';
import Modal from 'react-bootstrap/Modal';

import CreateEditEvent from './../create_edit_applications_components/create_edit_event/CreateEditEvent'

import {getDefaultKeyBinding, KeyBindingUtil, getSelection, getCurrentContent, editorState, changeDepth, keyBindingFn} from 'draft-js';
import {connect} from 'react-redux'

const mapStatetoProps = state => {
    return{
        apps: state.progress.applications,
        pending: state.progress.isPending,
        categories: state.categories.categories, 
        applicationDetail : state.applicationDetail.application
    }
  }
const {hasCommandModifier} = KeyBindingUtil;
  

class ApplicationDetailEvents extends React.Component {
    constructor(props) {
        super(props);
        const contentBlocksArray = []
        for (var i=0;i<this.props.Event.Contents.length;i++){
            if(this.props.Event.Contents.length !== 0){
                contentBlocksArray.push(
                    new ContentBlock({
                        key: this.props.Event.Contents[i].eventContentsID,
                        type: 'unordered-list-item',
                        depth: 0,
                        text: this.props.Event.Contents[i].Header
                      })
                )
                for(var j=0;j<this.props.Event.Contents[i].Contents_Text.length;j++){
                    contentBlocksArray.push(
                        new ContentBlock({
                            key: genKey(),
                            type: 'unordered-list-item',
                            depth: 1,
                            text: this.props.Event.Contents[i].Contents_Text[j]
                          })
                    )
                }
            }
        }
        this.state = {
          editorState: EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocksArray)),
          show : false
        };
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
      if(RichUtils.getCurrentBlockType(editorState) !== 'unordered-list-item'){
        const newEditorState = RichUtils.toggleBlockType(editorState, 'unordered-list-item')
        this.setState({editorState: newEditorState})
      }
      else{
        this.setState({ editorState});
      }
    }
 

    handleClose = () => {
      this.setState({
        show:false
      })
    }
    handleOpen = (e) =>{
      e.preventDefault()
      this.setState({
        show:true
      })
    }
      render() {
        return (
          <div className="sypp-ApplicationDetailNote-container sypp-EventContainer">
            <div className = "sypp-EventDetailContainer"  onClick={e => this.handleOpen(e)}>
            {/* <div className="ApplicationDetailNote-title-container"> */}
              <div className = "sypp-applicationDetailTextTitle">{this.props.Event.Detail.Title}</div>
              <div className = "sypp-EventDateTime">{Moment(this.props.Event.Detail.Time).format('MMM DD, YYYY - h:mma')}</div>
              <div className = "sypp-EventDateTime">{this.props.Event.Detail.Location}</div>
            {/* </div> */}
            {/* <Editor 
              toolbarHidden
              editorClassName="sypp-editor-class"
              editorState={this.state.editorState}
              onEditorStateChange={this._handleChange}
              keyBindingFn={this.myKeyBindingFn}
            /> */}
            {
              this.props.Event.Contents.map((data) => (
                <div>
                <div className = "sypp-note-text-header">{' • ' +data.Header}</div>
                {
                  data.Contents_Text.length != 0 ?  
                    data.Contents_Text.map((subText)=>(
                      <div className = "sypp-note-text-subText">{' • ' +subText}</div>
                    ))
                  : undefined
                }
                </div>
              ))

            }
            </div>

            <Modal 
            show={this.state.show}
            onHide={this.handleClose}
            centered
            dialogClassName = "sypp-create-detail-modal sypp-modal-content"
            className = "sypp-modal-content"
            >
                <div className = 'sypp-create-detail-modal-container'>
                    <button className ="sypp-button-close" onClick={this.handleClose}>X</button>
                    <CreateEditEvent _handleChange = {this._handleChange} onSaveEventNote = {this.props.onSaveEventNote} Event = {this.props.Event} handleClose = {this.handleClose} editorState = {this.state.editorState} applicationID = {this.props.applicationID} type ={this.props.type} companyID = {this.props.companyID}/>
                </div>
            </Modal>
          </div>
        );
      }
}
export default connect(mapStatetoProps, null)(ApplicationDetailEvents)