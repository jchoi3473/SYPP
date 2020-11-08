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

import {List, Repeat} from 'immutable'
import {connect} from 'react-redux'

const mapStatetoProps = state => {
    return{
        apps: state.progress.applications,
        pending: state.progress.isPending,
        categories: state.categories.categories, 
        applicationDetail : state.applicationDetail.application
    }
  }


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
            </div>
            <Editor 
              toolbarHidden
              editorClassName="editor-class"
              editorState={this.state.editorState}
              onEditorStateChange={this._handleChange}
            />
          </div>
        );
      }
}
export default connect(mapStatetoProps, null)(ApplicationDetailFollowUp)