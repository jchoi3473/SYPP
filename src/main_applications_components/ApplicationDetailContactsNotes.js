import React from 'react';
import ReactDOM from 'react-dom';
import { RichUtils, ContentBlock, genKey, ContentState, EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'draft-js/dist/Draft.css';
import './ApplicationDetailNotes.scss'
import './../main_applications/ApplicationDetail.scss'

import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {getDefaultKeyBinding, KeyBindingUtil, keyBindingFn} from 'draft-js';
import {setApps} from './../redux/progress-reducer/progressAction'
import {connect} from 'react-redux'
import { setCompany } from '../redux/company-reducer/companyAction';

const {hasCommandModifier} = KeyBindingUtil;
const mapStatetoProps = state => {
  return{
      apps: state.progress.applications,
      pending: state.progress.isPending,
      categories: state.categories.categories, 
      applicationDetail : state.applicationDetail.application
  }
}
const mapDispatchToProps= dispatch =>{
  return {
      setApps: (applications) => dispatch(setApps(applications)),
      setCompany : (companies) => dispatch(setCompany(companies))
  }
}


class ApplicationDetailContactsNotes extends React.Component {
    constructor(props) {
        super(props);
        const contentBlocksArray = []
        for (var i=0;i<this.props.Convo.length;i++){
            if(this.props.Convo.length !== 0){
                contentBlocksArray.push(
                    new ContentBlock({
                        key: this.props.Convo[i].noteContentsID,
                        type: 'unordered-list-item',
                        depth: 0,
                        text: this.props.Convo[i].Header
                      })
                )
                for(var j=0;j<this.props.Convo[i].Contents_Text.length;j++){
                    contentBlocksArray.push(
                        new ContentBlock({
                            key: genKey(),
                            type: 'unordered-list-item',
                            depth: 1,
                            text: this.props.Convo[i].Contents_Text[j]
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
    //Make a server call here, use currentstate and convert back to the original note property
    //after editting the note, will need to save this to the server. 
    onHandleBlurBody = (e) =>{
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
        this.props.onSaveNote(newNoteContent)
    }

      render() {
        return (
            <div onBlur = {this.onHandleBlurBody}>
            <Editor 
              toolbarHidden
              editorClassName="sypp-editor-class"
              editorState={this.state.editorState}
              onEditorStateChange={this._handleChange}
              keyBindingFn={this.myKeyBindingFn}
            />
            </div>
        );
      }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ApplicationDetailContactsNotes)