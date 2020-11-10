import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import ReactTooltip from "react-tooltip";
import './../components/radio/RadioButtons.css';
import './CategoryButtons.scss';

import {connect} from 'react-redux'
import {updateFilteredProgress, updateFilteredProgressTitle, updateFilteredProgressButtonValue} from '../redux/filteredProgress-reducer/filteredProgressAction'



const mapStatetoProps = state => {
  return{
      apps: state.progress.applications,
      filteredProgress: state.filteredProgress
  }
}
const mapDispatchToProps= dispatch =>{
  return {
    updateFilteredProgress: (applications) => dispatch(updateFilteredProgress(applications)),
    updateFilteredProgressTitle: (title) => dispatch(updateFilteredProgressTitle(title)),
    updateButtonValue: (value) => dispatch(updateFilteredProgressButtonValue(value))
  }
}

function CategoryButtons(props) {

    const [radioValue, setRadioValue] = useState(props.filteredProgress.selectedButtonValue);
    const radios = props.options;
    const [targetName, setTargetName] = useState('');
    const [targetValue, setTargetValue] = useState('0')
    const [toolTip, setToolTip] = useState(false);

    const [targetTitle, setTargetTitle] = useState(props.filteredProgress.selectedTitle)   

    const radioChange = (e) => {
      if(e.currentTarget.value==='0'||e.currentTarget.value==='1'){
      e.preventDefault();
      var name = ''
      for(var i=0;i<radios.length;i++){
        if(radios[i].value ===  e.currentTarget.value)
          name = radios[i].name
      }
      props.onChange(name);

      // setRadioValue(e.currentTarget.value)

      var filtered = [] 
      if(e.currentTarget.value === '0'){
        filtered = props.apps
        props.updateFilteredProgressTitle("All")
        setRadioValue('0')
        props.updateButtonValue('0')

      }
      //isFavorite = true인 case들
      else if(e.currentTarget.value === '1'){
        setRadioValue('1')
        props.updateButtonValue('1')
        props.updateFilteredProgressTitle("Starred")
        for(var i=0;i<props.apps.length;i++){
          if(props.apps[i].Detail.IsFavorite) 
            filtered = filtered.concat(props.apps[i])
        }
      }

      props.updateFilteredProgress(filtered)
    }
    }


    const handleChange = (e) =>{
      setTargetName(e.target.getAttribute('name'))
      setTargetValue(e.target.getAttribute('value'))
      if(e.target.getAttribute('name')!=='All'&&e.target.getAttribute('name')!=='Starred'){
        setToolTip(false)
      }
      else{
        setToolTip(true)
      }
    }

    const categoryDivided = () =>{
      var temp = []
      for(var i=0; i<props.apps.length; i++){
          for(var j=0; j<props.apps[i].Detail.Categories.length;j++){
              if(props.apps[i].Detail.Categories[j].Type === targetName){
                for(var k=0; k<props.apps[i].Detail.Categories[j].SuggestionsOrSeleceted.length;k++){
                  if(!temp.includes(props.apps[i].Detail.Categories[j].SuggestionsOrSeleceted[k])){
                    temp = temp.concat(props.apps[i].Detail.Categories[j].SuggestionsOrSeleceted[k])
                  }
                }    
              }
          }
      }

    return(
      <div className = "tooltip-container">
      { 
        temp.map((entity) => (
        <button className = "subCategory-button" name = {entity} onClick ={e => onClickButton(e)}>{entity}</button>
        ))
      }
      </div>

    )
  }

    const onClickButton = (e) =>{
      setRadioValue(targetValue)
      props.updateButtonValue(targetValue)
      props.updateFilteredProgressTitle(e.target.getAttribute('name'))
      setTargetTitle(e.target.getAttribute('name'))
      filterProgress(e)
    }

    const filterProgress = (e) =>{
      var filtered = [] 
      for(var i=0; i<props.apps.length ;i++){
        //save i as an index
        for(var j=0;j<props.apps[i].Detail.Categories.length;j++){
          if(props.apps[i].Detail.Categories[j].Type === targetName){
            for(var k=0; k<props.apps[i].Detail.Categories[j].SuggestionsOrSeleceted.length;k++){
              if(e.target.getAttribute('name') === props.apps[i].Detail.Categories[j].SuggestionsOrSeleceted[k]){
                filtered = filtered.concat(props.apps[i])
              }
            }
          }
       }
    }
      props.updateFilteredProgress(filtered)
    }

    return (
        <ButtonGroup toggle className = {props.classContainerProps}>
          {radios.map((radio, idx) => (
              <div className="button-container">
                <ToggleButton
                className={"colorChange activeChange hoverChange text " + props.buttonContainerProps}
                key={idx}
                type="radio"
                variant="secondary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => radioChange(e, radioValue)}
                data-for="radioTip"
                data-tip = ''
                onMouseEnter = {e => handleChange(e)}
                >
                  <div className = "radio-button-container" name = {radio.name} value = {radio.value}>
                    {radio.name}
                  </div>
                </ToggleButton>
                <ReactTooltip
                  id={(radioValue !== 0&&radioValue.value !== 1)?"radioTip":""}
                  className = "extraClass colorFix colorFixBottom colorFixBottomBefore colorFixBottomAfter"
                  effect='solid'
                  delayHide={100}
                  place={'bottom'}
                  disable	={toolTip}
                  >
                    {categoryDivided()}
                </ReactTooltip>
            </div>
          ))}
        </ButtonGroup>

       
    );
  }
  export default connect(mapStatetoProps, mapDispatchToProps)(CategoryButtons);

