// import React from 'react';
// import ReactDOM from 'react-dom';
// import { CharacterMetadata, RichUtils, ContentBlock, genKey, ContentState, EditorState, convertFromRaw, contentBlocks} from 'draft-js';
// import {getDefaultKeyBinding, KeyBindingUtil, getSelection, getCurrentContent, editorState, changeDepth, keyBindingFn} from 'draft-js';

// import { Editor } from 'react-draft-wysiwyg';
// import 'draft-js/dist/Draft.css';
// import './ApplicationDetailNotes.scss'
// import './../main_applications/ApplicationDetail.scss'

// import { faListAlt } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import Moment from 'moment';
// import {connect} from 'react-redux'




// class ApplicationDetailFollowUp extends React.Component {
//     constructor(props) {
//         super(props);
//         const contentBlocksArray = []
//         for (var i=0;i<this.props.FollowUp.Description.length;i++){
//             if(this.props.FollowUp.Description.length !== 0){
//                 contentBlocksArray.push(
//                     new ContentBlock({
//                         key: genKey(),
//                         type: 'unordered-list-item',
//                         depth: 0,
//                         text: this.props.FollowUp.Description[i]
//                       })
//                 )
//             }
//         }
//           this.state = {
//           editorState: EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocksArray))
//         };
//       }
//       currentBlockKey = () => this.state.editorState.getSelection().getStartKey()
//       currentBlockIndex = () => this.state.editorState.getCurrentContent().getBlockMap().keySeq().findIndex(k => k === this.currentBlockKey())

//       myKeyBindingFn = (e) => {
//         switch (e.keyCode) {
//           case 9: // TAB
//             if(this.currentBlockIndex() == 0){
//               return undefined
//             }
//             else {
//             const newEditorState = RichUtils.onTab(
//               e,
//               this.state.editorState,
//               1 /* maxDepth */,
//             );
//             if (newEditorState !== this.state.editorState) {
//               this.setState({
//                 editorState: newEditorState
//               })
//               return null;
//               } 
//            }
//           default: 
//             return getDefaultKeyBinding(e);      
//       }
//     }

//       _handleChange = (editorState) => {
//         console.log(RichUtils.getCurrentBlockType(
//           editorState
//         ))
//         if(RichUtils.getCurrentBlockType(editorState) !== 'unordered-list-item'){
//           const newEditorState = RichUtils.toggleBlockType(editorState, 'unordered-list-item')
//           this.setState({editorState: newEditorState})
//         }
//         else{
//           this.setState({ editorState});
//         }
//       }
//       onHandleBlurBody = (e) =>{
//         console.log("blurred?")
//         var newNoteContent = [{
//           noteContentsID : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[0][0],
//           Header : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[0][1].text,
//           Contents_Text : []
//         }];
  
//         var tracker = 0;
//           for(var i=1;i<this.state.editorState._immutable.currentContent.blockMap._list._tail.array.length;i++){
//             if(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][1].depth === 0){
//               tracker++;
//               newNoteContent.push({
//                 noteContentsID : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][0],
//                 Header : this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][1].text,
//                 Contents_Text : []
//               })
//             }
//             else{
//               newNoteContent[tracker].Contents_Text.push(this.state.editorState._immutable.currentContent.blockMap._list._tail.array[i][1].text)
//             }
//           }
//           console.log(newNoteContent)
//           // this.props.onSaveNote(newNoteContent, this.props.Note.noteID)
//       }
    
//       render() {
//         return (
//           <div className="sypp-ApplicationDetailNote-container">
//             <div className="sypp-ApplicationDetailFollowup-title-container">
//             {/* <FontAwesomeIcon className = "notes" icon={faListAlt}/>   */}
//               <div className = "sypp-applicationDetailTextTitle">{this.props.FollowUp.Personnel.Firstname +" "+this.props.FollowUp.Personnel.Lastname}</div>
//               <div className = "sypp-applicationDetailTextSubTitle">{this.props.FollowUp.Personnel.Title}</div>
//               <div className = "sypp-EventDateTime">{Moment(this.props.FollowUp.Time).format('MMM DD, YYYY') + Moment(this.props.FollowUp.Time).fromNow()}</div>
//             </div>
//             {
//               this.props.Foll.Contents.map((data) => (
//                 <div>
//                 <div className = "sypp-note-text-header">{' • ' +data.Header}</div>
//                 {
//                   data.Contents_Text.length != 0 ?  
//                     data.Contents_Text.map((subText)=>(
//                       <div className = "sypp-note-text-subText">{' • ' +subText}</div>
//                     ))
//                   : undefined
//                 }
//                 </div>
//               ))
//             }
//             {/* <div onBlur = {this.onHandleBlurBody}>
//             <Editor 
//               toolbarHidden
//               editorClassName="sypp-editor-class"
//               editorState={this.state.editorState}
//               onEditorStateChange={this._handleChange}
//               keyBindingFn={this.myKeyBindingFn}
//             />
//             </div> */}

//             <Modal 
//             show={this.state.show}
//             onHide={this.handleClose}
//             centered
//             dialogClassName = "sypp-create-detail-modal sypp-modal-content"
//             className = "sypp-modal-content"
//             >
//                 <div className = 'sypp-create-detail-modal-container'>
//                     <button className ="sypp-button-close" onClick={this.handleClose}>X</button>
//                     <CreateEditNote  onSaveNote = {this.props.onSaveNote} Note = {this.props.Note} handleClose = {this.handleClose} editorState = {this.state.editorState} type ={'application'} applicationID = {this.props.applicationID}/>
//                 </div>
//             </Modal>
//           </div>
//         );
//       }
// }
// export default connect(null, null)(ApplicationDetailFollowUp)