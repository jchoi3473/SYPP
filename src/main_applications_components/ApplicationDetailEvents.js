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
        for (var i=0;i<this.props.event.contents.length;i++){
            if(this.props.event.contents.length !== 0){
                contentBlocksArray.push(
                    new ContentBlock({
                        key: this.props.event.contents[i].noteContentsID,
                        type: 'unordered-list-item',
                        depth: this.props.event.contents[i].marginType,
                        text: this.props.event.contents[i].content
                      })
                )
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
              <div className = "sypp-applicationDetailTextTitle">{this.props.event.detail.title}</div>
              <div className = "sypp-EventDateTime">{Moment(this.props.event.detail.time).format('MMM DD, YYYY - h:mma')}</div>
              <div className = "sypp-EventDateTime">{this.props.event.detail.location}</div>
            {/* </div> */}
            {
              this.props.event.contents.map((data) => (               
                <div>   
                {
                data.length !== 0 ?  
                  <div>
                  {
                    data.marginType === 0? 
                    <div className = "sypp-note-text-header">{' • ' +data.content}</div> :
                    <div className = "sypp-note-text-subText">{' • ' +data.content}</div>
                  }
                  </div>
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
                    <button className ="sypp-button-close" onClick={() => this.handleClose()}>X</button>
                    <CreateEditEvent _handleChange = {this._handleChange} onSaveEventNote = {this.props.onSaveEventNote} event = {this.props.event} handleClose = {this.handleClose} editorState = {this.state.editorState} applicationID = {this.props.applicationID} type ={this.props.type} companyID = {this.props.companyID}/>
                </div>
            </Modal>
        </div>
        );
      }
}
export default connect(mapStatetoProps, null)(ApplicationDetailEvents)