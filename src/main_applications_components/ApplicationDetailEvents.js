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

    onHandleBlurBody = (e) =>{
      var newNoteContent = [{
        eventContentsID : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[0][0],
        Header : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[0][1].text,
        Contents_Text : []
      }];

      var tracker = 0;
        for(var i=1;i<this.state.editorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
          if(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][1].depth === 0){
            tracker++;
            newNoteContent.push({
              eventContentsID : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][0],
              Header : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][1].text,
              Contents_Text : []
            })
          }
          else{
            newNoteContent[tracker].Contents_Text.push(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][1].text)
          }
        }
        console.log(newNoteContent)

        this.props.onSaveEventNote(newNoteContent, this.props.Event.eventID)
    }

      render() {
        return (
          <div className="sypp-ApplicationDetailNote-container sypp-EventContainer" onClick={console.log("triggered")} on>
            <FontAwesomeIcon className = "sypp-notes" icon={faListAlt}/> 
            <div className = "sypp-EventDetailContainer">
            {/* <div className="ApplicationDetailNote-title-container"> */}
              <div className = "sypp-applicationDetailTextTitle">{this.props.Event.Detail.Title}</div>
              <div className = "sypp-EventDateTime">{Moment(this.props.Event.Detail.Time).format('MMM DD, YYYY - h:mma')}</div>
              <div className = "sypp-EventDateTime">{this.props.Event.Detail.Location}</div>
            {/* </div> */}
            <div onBlur = {this.onHandleBlurBody}>
            <Editor 
              toolbarHidden
              editorClassName="sypp-editor-class"
              editorState={this.state.editorState}
              onEditorStateChange={this._handleChange}
              keyBindingFn={this.myKeyBindingFn}
            />
            </div>
            </div>
          </div>
        );
      }
}
export default connect(mapStatetoProps, null)(ApplicationDetailEvents)