import React from 'react';
import ReactDOM from 'react-dom';
import { CharacterMetadata, RichUtils, ContentBlock, genKey, ContentState, EditorState, convertFromRaw, contentBlocks} from 'draft-js';
import {getDefaultKeyBinding, KeyBindingUtil, getSelection, getCurrentContent, editorState, changeDepth, keyBindingFn} from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';
import 'draft-js/dist/Draft.css';
import './ApplicationDetailNotes.scss'
import './../main_applications/ApplicationDetail.scss'

import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Moment from 'moment';
import {connect} from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import CreateEditConversation from '../create_edit_applications_components/create_edit_conversation/CreateEditConversation'

class ApplicationDetailFollowUp extends React.Component {
    constructor(props) {
        super(props);
          this.state = {
            show: false,
            editorState : ''
        };
    }
    componentDidMount(){
        const contentBlocksArray = []
        for (var i=0;i<this.props.followUp.description.length;i++){
            if(this.props.followUp.description.length !== 0){
                console.log("Was it ever triggerd?")
                contentBlocksArray.push(
                    new ContentBlock({
                        key: this.props.followUp.description[i].noteContentsID,
                        type: 'unordered-list-item',
                        depth: this.props.followUp.description[i].marginType,
                        text: this.props.followUp.description[i].content
                    })
                )
            }
        }
        this.setState({
            editorState : EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocksArray))
        })
    }
    _handleChange = (editorState) =>{
        this.setState({
            editorState: editorState
        })
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
            <div className="sypp-ApplicationDetailNote-container">
            <div onClick = {this.handleOpen}>
                <div className="sypp-ApplicationDetailFollowup-title-container">
                    <div className = "sypp-applicationDetailTextTitle">{this.props.followUp.detail.personnel.firstname}</div>
                    <div className = "sypp-applicationDetailTextSubTitle">{this.props.followUp.detail.personnel.lastname}</div>
                    <div className = "sypp-EventDateTime">{Moment(this.props.followUp.time).format('MMM DD, YYYY') + Moment(this.props.followUp.time).fromNow()}</div>
                </div>
                    {
                        this.props.followUp.description.map((data) => (
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
                    <button className ="sypp-button-close" onClick={this.handleClose}>X</button>
                    <CreateEditConversation _handleChange = {this._handleChange} editorState = {this.state.editorState} onSaveConversation = {this.props.onSaveConversation} followUp = {this.props.followUp} handleClose = {this.handleClose} type ={this.props.type} applicationID = {this.props.applicationID} companyID = {this.props.companyID}/>
                </div>
            </Modal>
        </div>
        );
    }
}
export default connect(null, null)(ApplicationDetailFollowUp)