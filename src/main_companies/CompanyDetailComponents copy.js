import React, {Component, useState} from 'react';
import {connect} from 'react-redux'
import {requestProgress} from '../redux/progress-reducer/progressAction'
import {setSelectedCategories} from '../redux/addApp-reducer/addAppAction'
import {setCompany} from './../redux/company-reducer/companyAction'
import {updateFilteredProgress} from '../redux/filteredProgress-reducer/filteredProgressAction'
import './../components/radio/RadioButtons.css'

import ApplicationDetailEvents from './../main_applications_components/ApplicationDetailEvents'
import ApplicationDetailContacts from '../main_applications_components/ApplicationDetailContacts'
import ApplicationDetailNotes from '../main_applications_components/ApplicationDetailNotes'
import ApplicationDetailFollowUp from './../main_applications_components/ApplicationDetailFollowUp'
import ApplicationDetailChecklists from './../main_applications_components/ApplicationDetailChecklists'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'



const mapStatetoProps = state => {
  return{
    companies: state.companies.companies,
    applicationDetail : state.applicationDetail.application
  }
}
const mapDispatchToProps= dispatch =>{
    return {
        setCompany : (companies) => dispatch(setCompany(companies))
    }
  } 


function CompanyDetailComponents(props){
    const [radioValue, setRadioValue] = useState('0');
    const [radioName, setRadioName] = useState('Events');
    const radios =  
    [ 
    { name: 'Events', value: '0' },
    { name: 'Notes', value: '1' },
    { name: 'Contacts', value: '2' },
    { name: 'Conversation History', value: '3' },
    { name: 'Checklists', value: '4' },
    ]
    const [textValue, setTextValue] = useState('');


    const radioChange = (e) => {
    setRadioValue(e.target.value)
    setRadioName(e.target.getAttribute('name'))
    }

    const onChangeTextArea = (e) =>{
        setTextValue(e.target.value)
    }

    const onSaveNote  = (noteContent, noteID) => {
        var companies = props.companies;
        for(var i=0;i<companies.length;i++){
            if(companies[i].companyID === props.companies.companyID){
                for(var j=0; j < props.companyDetail.Notes.length;j++){
                    if(props.companyDetail.Notes[j].noteID === noteID){
                        companies[i].Notes[j].Contents = noteContent
                    }
                }
            }
        }
        props.setCompany(companies)
    }
    const onSaveConvoNote = (noteContent, contactID) => {
        var companies = props.companies;
        for(var i=0;i<companies.length;i++){
            if(companies[i].companyID === props.companies.companyID){
                for(var j=0; j < props.companyDetail.Contacts.length;j++){
                    if(props.companies.Contacts[j].contactID === contactID){
                        companies[i].Contacts[j].Convo = noteContent
                    }
                }
            }
        }
        props.setCompany(companies)
    }
    const onSaveEventNote  = (noteContent, eventID) => {
        var companies = props.companies;
        for(var i=0;i<companies.length;i++){
            if(companies[i].companyID === props.companyDetail.companyID){
                for(var j=0; j < props.companyDetail.Events.length;j++){
                    if(props.companyDetail.Events[j].eventID === eventID){
                        companies[i].Events[j].Contents = noteContent
                    }
                }
            }
        }
        props.setCompany(companies)
    }   

    const display = () =>{
        switch(radioValue){
            case '0':
                return (
                    <div>
                        {
                            props.companyDetail.Events.map((event) =>(
                                <ApplicationDetailEvents Event = {event} onSaveEventNote = {onSaveEventNote}/>
                            ))
                        }
                    </div>
                )
            case '1':
                return (
                    <div>
                        {
                            props.companyDetail.Notes.map((note) =>(
                                <ApplicationDetailNotes Note = {note} onSaveNote = {onSaveNote}/>
                            ))
                        }
                    </div>
                )
            case '2':
                return (
                <div>
                    {props.companyDetail.Contacts.map((data) => (
                        <ApplicationDetailContacts contact = {data} onSaveConvoNote = {onSaveConvoNote}/>
                    ))
                    }
                </div>                
                )
            case '3':
                return (
                    <div>{
                        props.companyDetail.FollowUps.map((FollowUp) =>(
                            <ApplicationDetailFollowUp FollowUp = {FollowUp}/>
                        ))
                    }</div>
                )
            case '4':
                return (
                    <div>
                    {
                        props.companyDetail.Checklists.map((checklist) =>(
                            <ApplicationDetailChecklists Checklist = {checklist}/>
                        ))
                    }
                    </div>
                )
        }
        
        
    }

    return (
      <div>
          <ButtonGroup toggle className = {props.classContainerProps}>
          {radios.map((radio, idx) => (
            <div className="sypp-button-container-applicationDetail">
                <ToggleButton
                className={"sypp-applicationDetialButtonGroups sypp-activeChange sypp-hoverChange sypp-text"}
                key={idx}
                type="radio"
                variant="secondary"
                name={radio.name}
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => radioChange(e, radioValue)}
                >
                  <div className = "sypp-radio-button-container-applicationDetail" name = {radio.name} value = {radio.value}>
                    {radio.name}
                  </div>
                </ToggleButton>
                </div>
          ))}
            </ButtonGroup>

            {display()}
      </div>
    );  
}

export default connect(mapStatetoProps,mapDispatchToProps)(CompanyDetailComponents);
