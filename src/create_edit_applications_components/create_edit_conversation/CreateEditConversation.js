import React, {Component} from 'react';
import ConversationDetail from './ConversationDetail'
import ConversationDate from './ConversationDate'

import { RichUtils, ContentBlock, genKey, ContentState, EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {getDefaultKeyBinding, KeyBindingUtil, keyBindingFn} from 'draft-js';
import 'draft-js/dist/Draft.css';

import {connect} from 'react-redux'
import {setApps} from '../../redux/progress-reducer/progressAction'
import {setCompany} from '../../redux/company-reducer/companyAction'
import {updateApplicationDetail} from '../../redux/applicationDetail-reducer/ApplicationDetailAction'

const mapStatetoProps = state => {
    return{
        apps: state.progress.applications,
        pending: state.progress.isPending,
        categories: state.categories.categories, 
        companies: state.companies.companies,
    }
  }
  
  const mapDispatchToProps= dispatch =>{
    return {
        setApps : (applications) => dispatch(setApps(applications)),
        setCompany : (companies) => dispatch(setCompany(companies)),
        updateApplicationDetail: (applications) => dispatch(updateApplicationDetail(applications)),
    }
  }
export class CreateEditConversation extends Component {
    constructor(props){
        super(props)
        
        this.state = 
        {
            step : 1,
            type: '',
            followUpID : '',
            time : '',
            name : '',
            position : '',
            editorState : ''
        }
    }

    //componentDidMount will determine if this is a new Event
    //if this is not a new event, will call exisitng features and save them to the state
    componentDidMount(){
        this.setState({
            type : this.props.type
        })
        if(this.props.FollowUp !== ''){
            this.setState({
                followUpID : this.props.FollowUp.followUpID,
                name : this.props.FollowUp.Personnel.Name,
                time : this.props.FollowUp.Time,
                position : this.props.FollowUp.Personnel.Position,
                editorState : this.props.editorState
            })
        }
}

//API CALL HERE
// //Send Post request, close modal(save button)

    onSaveButton = () => {
        // this.props.postNewApp(this.props.addApp)
    var newNoteContent = []
    if(this.state.editorState !== ''){
        newNoteContent = [{
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
    }
        //Creating a new event
        if(this.state.followUpID === '' && this.state.type ==='application'){
            var apps = this.props.apps
            for(var i=0;i<this.props.apps.length;i++){
                if(this.props.apps[i].applicationID === this.props.applicationID){
                    const key = genKey()
                    apps[i].FollowUps.push(  
                        {
                            followUpID : key,
                            Time : this.state.time,
                            Personnel: {
                                followUpID : key,
                                Name: this.state.name,
                                Position: this.state.position,
                            },
                            Description: newNoteContent
                        }
                    )
                }
            }
            this.props.setApps(apps)
        }
        //editing an existing event, app
        else if(this.state.followUpID !== '' && this.state.type ==='application'){
            var apps = this.props.apps 
            for(var i=0;i<this.props.apps.length;i++){
                if(this.props.apps[i].applicationID === this.props.applicationID){
                    for(var j=0; j<this.props.apps[i].FollowUps.length;j++){
                        if(this.props.apps[i].FollowUps[j].followUpID === this.state.followUpID){
                            console.log("this one is triggeredd?")
                            apps[i].FollowUps[j] = {
                                followUpID: this.state.followUpID,
                                Time : this.state.time,
                                    Personnel: {
                                        followUpID : this.state.followUpID,
                                        Name: this.state.name,
                                        Position: this.state.position,
                                    },
                                Description: newNoteContent
                                }
                        }
                    }
                }
            }
            this.props.setApps(apps)
            this.props.onSaveConversation()
            this.setState({})
        }
        else if(this.state.followUpID === '' && this.state.type ==='company'){
            var companies = this.props.companies
            for(var i=0;i<this.props.companies.length;i++){
                if(this.props.companies[i].companyID === this.props.companyID){
                    const key = genKey()
                    companies[i].FollowUps.push(  
                        {
                            followUpID : key,
                            Time : this.state.time,
                            Personnel: {
                                followUpID : key,
                                Name: this.state.name,
                                Position: this.state.position,
                            },
                            Description: newNoteContent
                        }
                    )
                }
            }
            this.props.setCompany(companies)
            this.setState({})
        }
        else if(this.state.followUpID !== '' && this.state.type ==='company'){
            console.log(this.state.eventID)
            var companies = this.props.companies 
            for(var i=0;i<this.props.companies.length;i++){
                if(this.props.companies[i].companyID === this.props.companyID){
                    for(var j=0; j<this.props.companies[i].FollowUps.length;j++){
                        if(this.props.companies[i].FollowUps[j].followUpID === this.state.followUpID){
                            console.log("this one is triggeredd?")
                            companies[i].FollowUps[j] = {
                                followUpID : this.state.followUpID,
                                Time : this.state.time,
                                Personnel: {
                                    followUpID : this.state.followUpID,
                                    Name: this.state.name,
                                    Position: this.state.position,
                                },
                                Description: newNoteContent
                                }
                        }
                    }
                }
            }
            this.props.setCompany(companies)
            this.props.onSaveConversation()
            this.setState({})
        }
        this.props.handleClose()
    }

    onChangeName = (e) =>{
        this.setState({
            name : e.currentTarget.value
        })
        console.log(this.state.eventName)
    }
    onChangePosition = (e) =>{
        this.setState({
            position : e.currentTarget.value
        })
    }
    onChangeDate = (date) =>{
        this.setState({
            time : date
        })
    }
    nextStep = () =>{
        const {step}  = this.state;
        this.setState({
            step: step + 1
        });
    }
    prevStep = () =>{
        const {step}  = this.state;
        this.setState({
            step: step - 1
        });
    }

    handleEditorState = (editorState) =>{
        this.setState({
            editorState: editorState
        })
    }
    
    render(){
        const{step} = this.state;
        switch(step){
            case 1:
                return(
                    <div>
                        <ConversationDetail 
                            nextStep = {this.nextStep}
                            name = {this.state.name}
                            onChangeName = {this.onChangeName}
                            position = {this.state.position}
                            onChangePosition = {this.onChangePosition}
                            handleClose = {this.props.handleClose}
                            time = {this.state.time}
                            editorState = {this.props.editorState}
                            handleEditorState = {this.handleEditorState}
                            onSaveButton = {this.onSaveButton}
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <ConversationDate
                        prevStep = {this.prevStep}
                        onChangeDate = {this.onChangeDate}
                        handleClose = {this.props.handleClose}
                        time = {this.state.time}
                        />
                    </div>
                )
        }
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CreateEditConversation)