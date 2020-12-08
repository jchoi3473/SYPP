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
        for (var i=0;i<this.props.FollowUp.Description.length;i++){
            if(this.props.FollowUp.Description.length !== 0){
                console.log("Was it ever triggerd?")
                contentBlocksArray.push(
                    new ContentBlock({
                        key: this.props.FollowUp.Description[i].noteContentsID,
                        type: 'unordered-list-item',
                        depth: 0,
                        text: this.props.FollowUp.Description[i].Header
                    })
                )
                for(var j=0;j<this.props.FollowUp.Description[i].Contents_Text.length;j++){
                    contentBlocksArray.push(
                        new ContentBlock({
                            key: genKey(),
                            type: 'unordered-list-item',
                            depth: 1,
                            text: this.props.FollowUp.Description[i].Contents_Text[j]
                        })
                    )
                }
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
                {/* <FontAwesomeIcon className = "notes" icon={faListAlt}/>   */}
                    <div className = "sypp-applicationDetailTextTitle">{this.props.FollowUp.Personnel.Name}</div>
                    <div className = "sypp-applicationDetailTextSubTitle">{this.props.FollowUp.Personnel.Position}</div>
                    <div className = "sypp-EventDateTime">{Moment(this.props.FollowUp.Time).format('MMM DD, YYYY') + Moment(this.props.FollowUp.Time).fromNow()}</div>
                </div>
                    {
                        this.props.FollowUp.Description.map((data) => (
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
                    <CreateEditConversation _handleChange = {this._handleChange} editorState = {this.state.editorState} onSaveConversation = {this.props.onSaveConversation} FollowUp = {this.props.FollowUp} handleClose = {this.handleClose} type ={this.props.type} applicationID = {this.props.applicationID} companyID = {this.props.companyID}/>
                </div>
            </Modal>
        </div>
        );
    }
}
export default connect(null, null)(ApplicationDetailFollowUp)