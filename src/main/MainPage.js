import React, {Component, useState} from 'react';
import ModalBox from './../components/addApp/ModalBox.js';
import Applications from './../main_applications/Applications'
import {connect} from 'react-redux'
import {requestProgress} from './../redux/progress-reducer/progressAction'
import {setSelectedCategories} from './../redux/addApp-reducer/addAppAction'
import {updateFilteredProgress} from './../redux/filteredProgress-reducer/filteredProgressAction'
import './MainPage.scss';
import './../components/radio/RadioButtons.css'
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'



const mapStatetoProps = state => {
  return{
      apps: state.progress.applications,
      pending: state.progress.isPending,
      categories: state.categories.categories
  }
}

const mapDispatchToProps= dispatch =>{
  return {
      onRequestProgress: () => dispatch(requestProgress()),
      setSelectedCategories: (categories) => dispatch(setSelectedCategories(categories)),
      updateFilteredProgress: (applications) => dispatch(updateFilteredProgress(applications)),
  }
}

function MainPage(props){
    const [radioValue, setRadioValue] = useState('0');
    const radios =  
    [ 
    { name: 'Applications', value: '0' },
    { name: 'Companies', value: '1' },
    { name: 'Templates', value: '2' },
    ]
    const radioChange = (e) => {
    setRadioValue(e.target.value)
    }

    const display = () =>{
        console.log(radioValue)
        if(radioValue === '0'){
            return (
                <div>
                    <Applications/>
                </div>
            )
        }else {
            return(
                <div>more to go</div>
            )
        }
        
    }

    return (
      <div>
          <ButtonGroup toggle className = {props.classContainerProps}>
          {radios.map((radio, idx) => (
            <div className="button-container">
                <ToggleButton
                className={"mainButtonGroups activeChange hoverChange text"}
                key={idx}
                type="radio"
                variant="secondary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => radioChange(e, radioValue)}
                >
                  <div className = "radio-button-container" name = {radio.name} value = {radio.value}>
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

export default connect(mapStatetoProps,mapDispatchToProps)(MainPage);
