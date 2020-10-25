import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import './RadioButtons.css';



function RadioButtons(props) {
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    const radios = props.options;

    const radioChange = (e) => {
      e.preventDefault();
      props.onChange(e.currentTarget.value);
      setRadioValue(e.currentTarget.value)
    }

    return (
        <ButtonGroup toggle className = {props.classContainerProps}>
          {radios.map((radio, idx) => (
              <div className="button-container button-towButtons-container">
                {props.isDisabled?
                <ToggleButton
                className={"colorChange activeChange hoverChange text1 twoButtons " + props.buttonContainerProps}
                key={idx}
                type="radio"
                variant="secondary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => radioChange(e, radioValue)}
                disabled
                >
                {radio.name}
                </ToggleButton>:
                <ToggleButton
                className={"colorChange activeChange hoverChange text1 twoButtons " + props.buttonContainerProps}
                key={idx}
                type="radio"
                variant="secondary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => radioChange(e, radioValue)}
                >
                {radio.name}
                </ToggleButton>
                }
            </div>
          ))}
        </ButtonGroup>
    );
  }
  export default RadioButtons;

