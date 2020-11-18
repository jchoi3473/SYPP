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




class ApplicationDetailFollowUp extends React.Component {
    constructor(props) {
        super(props);
        const contentBlocksArray = []
        for (var i=0;i<this.props.FollowUp.Description.length;i++){
            if(this.props.FollowUp.Description.length !== 0){
                contentBlocksArray.push(
                    new ContentBlock({
                        key: genKey(),
                        type: 'unordered-list-item',
                        depth: 0,
                        text: this.props.FollowUp.Description[i]
                      })
                )
            }
        }
          this.state = {
          editorState: EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocksArray))
        };
      }
      myKeyBindingFn = (e) => {
        switch (e.keyCode) {
          case 9: // TAB

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
          default: 
            return getDefaultKeyBinding(e);      
      }
    }

      _handleChange = (editorState) => {
        console.log(RichUtils.getCurrentBlockType(
          editorState
        ))
        if(RichUtils.getCurrentBlockType(editorState) !== 'unordered-list-item'){
          const newEditorState = RichUtils.toggleBlockType(editorState, 'unordered-list-item')
          this.setState({editorState: newEditorState})
        }
        else{
          this.setState({ editorState});
        }
      }
    
      render() {
        return (
          <div className="ApplicationDetailNote-container">
            <div className="ApplicationDetailNote-title-container">
            {/* <FontAwesomeIcon className = "notes" icon={faListAlt}/>   */}
            <div className = "applicationDetailTextTitle">{this.props.FollowUp.Personnel.Title}</div>
            <div className = "EventDateTime">{Moment(this.props.FollowUp.Time).format('MMM DD, YYYY') + Moment(this.props.FollowUp.Time).fromNow()}</div>
            </div>
            <Editor 
              toolbarHidden
              editorClassName="editor-class"
              editorState={this.state.editorState}
              onEditorStateChange={this._handleChange}
              keyBindingFn={this.myKeyBindingFn}
            />
          </div>
        );
      }
}
export default connect(null, null)(ApplicationDetailFollowUp)