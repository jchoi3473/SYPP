import React, {Component, useState} from 'react';
import {connect} from 'react-redux'
import {requestProgress} from './../redux/progress-reducer/progressAction'
import {setSelectedCategories} from './../redux/addApp-reducer/addAppAction'
import {updateFilteredProgress} from './../redux/filteredProgress-reducer/filteredProgressAction'
import './../components/radio/RadioButtons.css'
import './ApplicationDetail.scss'

import ApplicationDetailContacts from './../main_applications_components/ApplicationDetailContacts'
import ApplicationDetailNotes from './../main_applications_components/ApplicationDetailNotes'
import ApplicationDetailFollowUp from './../main_applications_components/ApplicationDetailFollowUp'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'



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
      onRequestProgress: () => dispatch(requestProgress()),
      setSelectedCategories: (categories) => dispatch(setSelectedCategories(categories)),
      updateFilteredProgress: (applications) => dispatch(updateFilteredProgress(applications)),
  }
}

function ApplicationDetailComponents(props){
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

    const display = () =>{
        switch(radioValue){
            case '0':
                return (
                    <div>{radioName}</div>
                )
            case '1':
                return (
                    <div>
                        {
                            props.applicationDetail.Notes.map((note) =>(
                                <ApplicationDetailNotes Note = {note}/>
                            ))
                        }
                    </div>
                )
            case '2':
                return (
                <div>
                    {props.applicationDetail.Contacts.map((data) => (
                        <ApplicationDetailContacts contact = {data}/>
                    ))
                    }
                </div>                
                )
            case '3':
                return (
                    <div>
                         {
                            props.applicationDetail.FollowUps.map((FollowUp) =>(
                                <ApplicationDetailFollowUp FollowUp = {FollowUp}/>
                            ))
                        }
                    </div>
                )
            case '4':
                return (
                    <div>{radioName}</div>
                )
        }
        
        
    }

    return (
      <div>
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

            {display()}




        
      </div>
    );  
}

export default connect(mapStatetoProps,mapDispatchToProps)(ApplicationDetailComponents);
