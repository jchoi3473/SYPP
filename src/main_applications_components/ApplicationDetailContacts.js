import React, {Component, useState} from 'react';
import {connect} from 'react-redux'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import './../main_applications/ApplicationDetail.scss'
import ApplicationDetailContactsNotes from './ApplicationDetailContactsNotes'


function ApplicationDetailContacts(props){
    const [radioValue, setRadioValue] = useState('0');
    const radios = 
        [
            { name: 'Email', value: '0' },
            { name: 'Phone', value: '1' },
            { name: 'Convo', value: '2' },
        ]
    const radioChange = (e) =>{
        setRadioValue(e.target.value)
    }
    const onSaveNote = (noteContent) =>{
        props.onSaveConvoNote(noteContent, props.contact.contactID)
    }
    const display = () =>{
        switch(radioValue) {
            case '0' :
                return(
                    <div className = "sypp-applicationDetailTextBody">
                        {props.contact.Email.Email}
                    </div>
                )
            case '1' :
                return(
                    <div className = "sypp-applicationDetailTextBody">
                        {props.contact.Phone.PhoneNumber}
                    </div>
                )
            case '2' :
                return(
                    <div className = "sypp-applicationDetailTextBody">
                        <ApplicationDetailContactsNotes Convo = {props.contact.Convo} onSaveNote = {onSaveNote}/>
                    </div>
                )
        }
    }
    return(
        <div>
            <div className = "sypp-applicationDetailContactsContainer">
                <div>
                    <div className = "sypp-applicationDetailContactsTitle">
                        <div className = "sypp-applicationDetailTextTitle">{props.contact.PersonalDetail.Firstname}</div>
                        <div className = "sypp-applicationDetailTextTitle">{props.contact.PersonalDetail.Lastname}</div>
                        <div className = "sypp-applicationDetailTextTitle">{props.contact.PersonalDetail.Title}</div>
                    </div>
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
                    </div>
                    <div>
                        {display()}
                    </div>
            </div>
        </div>
    )
}
export default connect(null,null)(ApplicationDetailContacts)