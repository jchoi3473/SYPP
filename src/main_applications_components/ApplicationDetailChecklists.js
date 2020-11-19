import React from 'react';
import ReactDOM from 'react-dom';
import { CharacterMetadata, RichUtils, ContentBlock, genKey, ContentState, EditorState, convertFromRaw, contentBlocks} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Checkbox from '@material-ui/core/Checkbox';
import 'draft-js/dist/Draft.css';
import './ApplicationDetailNotes.scss'
import './../main_applications/ApplicationDetail.scss'
import './ApplicationDetailChecklists.scss'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

import { faListAlt} from "@fortawesome/free-solid-svg-icons";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { Checkbox } from 'semantic-ui-react'


import {getDefaultKeyBinding, KeyBindingUtil, getSelection, getCurrentContent, editorState, changeDepth, keyBindingFn} from 'draft-js';
import {connect} from 'react-redux'


  const {hasCommandModifier} = KeyBindingUtil;
  

class ApplicationDetailChecklists extends React.Component {
    constructor(props) {
        super(props);
        const contentBlocksArray = []
        const checkboxArray =[]
        for (var i=0;i<this.props.Checklist.Contents.length;i++){
            if(this.props.Checklist.Contents.length !== 0){
                contentBlocksArray.push(
                    new ContentBlock({
                        key: this.props.Checklist.Contents[i].checklistID,
                        type: 'unstyled',
                        depth: 0,
                        text: this.props.Checklist.Contents[i].Type
                      })
                )
            }
            checkboxArray.push({
                checklistID : this.props.Checklist.Contents[i].checklistID,
                checkboxBoolean: this.props.Checklist.Contents[i].Submission
            })
        }
          this.state = {
          editorState: EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocksArray)),
          checkboxState : checkboxArray
        };
      }

      currentBlockKey = () => this.state.editorState.getSelection().getStartKey()
      
      currentBlockIndex = () => this.state.editorState.getCurrentContent().getBlockMap().keySeq().findIndex(k => k === this.currentBlockKey())
      myKeyBindingFn = (e) => {
        if (e.keyCode === 13) {
          console.log(this.currentBlockIndex())
            if(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[this.currentBlockIndex()][1].depth == 0 && this.state.editorState._immutable.currentContent.blockMap._list._tail.array[this.currentBlockIndex()][1].text === ""){
              console.log(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[this.currentBlockIndex()][1].text)
              console.log(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[this.currentBlockIndex()][1].depth)
            return console.log(this.currentBlockKey());
          }
            else{
              return getDefaultKeyBinding(e);
            }
        }
      }
    //   myKeyBindingFn = (e) => {
    //     if (e.keyCode === 13) {
    //       console.log(this.currentBlockIndex())
    //         var tempCheckbox = 
    //         [
    //             ...this.state.checkboxState.slice(0, this.currentBlockIndex()),
    //             {
    //                 checklistID: this.state.editorState._immutable.currentContent.blockMap._list._tail.array[this.currentBlockIndex()][0],
    //                 checkboxBoolean: false
    //             },
    //             ...this.state.checkboxState.slice(this.currentBlockIndex())
    //         ]
    //         this.setState({
    //         checkboxState : tempCheckbox
    //         })
    //         return getDefaultKeyBinding(e);
    //     }
    //     else if (e.keyCode === 8) {
    //         if(this.state.editorState._immutable.currentContent.blockMap._list._tail.array.length < this.state.checkboxState.length){
    //             console.log("triggered")
    //             var tempCheckbox = []
    //             for(var i = 0; i<this.state.editorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
    //                 for(var j=0;j< this.state.checkboxState.length;j++){
    //                     if(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][0]===this.state.checkboxState[j].checklistID){
    //                         tempCheckbox.push(this.state.checkboxState[j])
    //                     }
    //                 }
    //             }
    //            this.setState({
    //             checkboxState : tempCheckbox
    //            })
    //         }
    //         return getDefaultKeyBinding(e);

    //       }
    //       else{
    //           return getDefaultKeyBinding(e);
    //       }
    // }
    

    onCheckBoxClick = (checkboxID) => {
        var tempCheckbox = this.state.checkboxState
        for(var i=0;i<this.state.checkboxState.length;i++){
            if(checkboxID === this.state.checkboxState[i].checklistID){
                tempCheckbox[i].checkboxBoolean = !tempCheckbox[i].checkboxBoolean
            }
            this.setState({
                checkboxState : tempCheckbox 
            })
        }
    }

    _handleChange = (editorState) => {
        console.log(this.state.editorState._immutable.currentContent.blockMap._list._tail.array)
      
        this.setState({editorState});

    //   if(this.state.editorState._immutable.currentContent.blockMap._list._tail.array.length !== this.state.checkboxState.length){
        //   var tempCheckbox = this.state.checkboxState;

        //   for(var i=0;i<this.state.editorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
        //     if(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][0] !== tempCheckbox[i].checklistID){
        //         console.log("triggered")
        //     }
        //   }
        
        if(this.state.editorState._immutable.currentContent.blockMap._list._tail.array.length > this.state.checkboxState.length){
            var tempCheckbox = 
            [
                ...this.state.checkboxState.slice(0, this.currentBlockIndex()),
                {
                    checklistID: this.state.editorState._immutable.currentContent.blockMap._list._tail.array[this.currentBlockIndex()][0],
                    checkboxBoolean: false
                },
                ...this.state.checkboxState.slice(this.currentBlockIndex())
            ]
           this.setState({
            checkboxState : tempCheckbox
           })
           console.log(this.state.checkboxState)
        }
        else if(this.state.editorState._immutable.currentContent.blockMap._list._tail.array.length < this.state.checkboxState.length){
            var tempCheckbox = []
            for(var i = 0; i<this.state.editorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
                for(var j=0;j< this.state.checkboxState.length;j++){
                    if(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][0]===this.state.checkboxState[j].checklistID){
                        tempCheckbox.push(this.state.checkboxState[j])
                    }
                }
            }
           this.setState({
            checkboxState : tempCheckbox
           })
        }
        this.setState({})
        console.log("checkbox" + this.state.checkboxState)        
    }

     
    
      render() {
        return (
          <div className="sypp-ApplicationDetailNote-container ">
            <div className="sypp-ApplicationDetailNote-title-container">
            <FontAwesomeIcon className = "sypp-notes" icon={faListAlt}/>  
            <div className = "sypp-applicationDetailTextTitle">{this.props.Checklist.Detail.Title}</div>
            </div>
            <div className = "sypp-ApplicationDetailChecklists-container">
            <div className = "sypp-CheckList-Container">
            {
                // className = "Checkbox-padding checkbox-root checkboxIcomButton-root Icon-root Checkbox-Checked" 
                this.state.checkboxState.map((checkbox) => (
                    // <FormGroup row>
                    <FormControlLabel 
                    className = "sypp-FormRoot"
                    control = {
                    <Checkbox 
                    icon=  {<FontAwesomeIcon className = "sypp-CheckBox-icon" icon={faSquare}/> }
                    checkedIcon= {<FontAwesomeIcon className = "sypp-CheckBox-icon sypp-checked" icon={faCheckSquare}/> }
                    className = "sypp-Checkbox-padding sypp-Checkbox-padding2"
                    checked = {checkbox.checkboxBoolean} 
                    onChange = {() => this.onCheckBoxClick(checkbox.checklistID)}/>}
                    />
                    // </FormGroup>
                ))
            }
            </div>
            <div className = "sypp-Editor-Container">
            <Editor 
              toolbarHidden
              editorClassName="sypp-editor-class"
              editorState={this.state.editorState}
              onEditorStateChange={this._handleChange}
            //   keyBindingFn={this.myKeyBindingFn}
            />
            </div>
            </div>
          </div>
        );
      }
}
export default connect(null, null)(ApplicationDetailChecklists)