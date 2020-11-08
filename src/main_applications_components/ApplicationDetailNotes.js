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
      currentBlockKey = () => this.state.editorState.getSelection().getStartKey()
      
      currentBlockIndex = () => this.state.editorState.getCurrentContent().getBlockMap().keySeq().findIndex(k => k === this.currentBlockKey())
      
      myKeyBindingFn = (e) => {
        // if (e.keyCode === 13) {
        //   console.log(this.currentBlockIndex())
        //     if(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[this.currentBlockIndex()][1].depth == 0 && this.state.editorState._immutable.currentContent.blockMap._list._tail.array[this.currentBlockIndex()][1].text === ""){
        //       console.log(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[this.currentBlockIndex()][1].text)
        //       console.log(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[this.currentBlockIndex()][1].depth)
        //     return console.log(this.currentBlockKey());
        //   }
        //     else{
        //       return getDefaultKeyBinding(e);
        //     }
        //   // return console.log(this.currentBlockKey());
        // }
        // else if(e.keyCode === 9){
        //   return getDefaultKeyBinding(e);
        // }
        return getDefaultKeyBinding(e);
      }
      handleChange = e => {
        this._handleChange(editorState)
      }

      _handleChange = (editorState) => {
        console.log(editorState)
          this.setState({ editorState });
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
              onChange = {e => {
                if (e.keyCode === 13){
                  console.log('triggered')
                }
              }}
              // keyBindingFn={this.myKeyBindingFn}
            />
          </div>
        );
      }
}
export default connect(mapStatetoProps, null)(ApplicationDetailNotes)