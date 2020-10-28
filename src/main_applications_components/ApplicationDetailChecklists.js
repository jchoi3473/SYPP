import React, {Component, useState} from 'react';
import {connect} from 'react-redux'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import './../main_applications/ApplicationDetail.scss'

const mapStatetoProps = state => {
    return{
        applicationDetail : state.applicationDetail.application
    }
  }

function ApplicationDetailChecklists(props){
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
    const display = () =>{
        switch(radioValue) {
            case '0' :
                return(
                    <div className = "applicationDetailTextBody">
                        {props.contact.Email.Email}
                    </div>
                )
            case '1' :
                return(
                    <div className = "applicationDetailTextBody">
                        {props.contact.Phone.PhoneNumber}
                    </div>
                )
            case '2' :
                return(
                    <div className = "applicationDetailTextBody">
                    more to decide</div>
                )
        }
    }
    return(
        <div>
            <div className = "applicationDetailContactsContainer">
                <div>
                    <div className = "applicationDetailContactsTitle">
                        <div className = "applicationDetailTextTitle">{props.contact.PersonalDetail.Firstname}</div>
                        <div className = "applicationDetailTextTitle">{props.contact.PersonalDetail.Lastname}</div>
                        <div className = "applicationDetailTextTitle">{props.contact.PersonalDetail.Title}</div>
                        <div className = "applicationDetailTextTitle">{props.contact.PersonalDetail.Company}</div>
                    </div>
                    <ButtonGroup toggle className = {props.classContainerProps}>
                    {radios.map((radio, idx) => (
                        <div className="button-container-applicationDetail">
                            <ToggleButton
                            className={"applicationDetialButtonGroups activeChange hoverChange text"}
                            key={idx}
                            type="radio"
                            variant="secondary"
                            name={radio.name}
                            value={radio.value}
                            checked={radioValue === radio.value}
                            onChange={(e) => radioChange(e, radioValue)}
                            >
                            <div className = "radio-button-container-applicationDetail" name = {radio.name} value = {radio.value}>
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
export default connect(mapStatetoProps,null)(ApplicationDetailChecklists)