import React from 'react';
import ReactDOM from 'react-dom';
import { CharacterMetadata, RichUtils, ContentBlock, genKey, ContentState, EditorState, convertFromRaw, contentBlocks} from 'draft-js';
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


class ApplicationDetailNotes extends React.Component {
    constructor(props) {
        super(props);
        const contentBlocksArray = []
        for (var i=0;i<this.props.Note.Contents.length;i++){
            if(this.props.Note.Contents.length !== 0){
                contentBlocksArray.push(
                    new ContentBlock({
                        key: this.props.Note.Contents[i].noteContentsID,
                        type: 'unordered-list-item',
                        depth: 0,
                        text: this.props.Note.Contents[i].Header
                      })
                )
                for(var j=0;j<this.props.Note.Contents[i].Contents_Text.length;j++){
                    contentBlocksArray.push(
                        new ContentBlock({
                            key: genKey(),
                            type: 'unordered-list-item',
                            depth: 1,
                            text: this.props.Note.Contents[i].Contents_Text[j]
                          })
                    )
                }

            }
        }
          this.state = {
          editorState: EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocksArray))
        };
      }
    

      _handleChange = (editorState) => {
        this.setState({ editorState });
        console.log(this.state.editorState._immutable.currentContent.blockMap._list._tail.array)

      }
    
      render() {
        return (
          <div className="ApplicationDetailNote-container">
            <div className="ApplicationDetailNote-title-container">
            <FontAwesomeIcon className = "notes" icon={faListAlt}/>  
            <div className = "applicationDetailTextTitle">{this.props.Note.Detail.Title}</div>
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
export default connect(mapStatetoProps, null)(ApplicationDetailNotes)