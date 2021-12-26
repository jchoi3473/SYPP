import React, {useState} from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import CalendarComponent from './../components/calendar/CalendarComponent';

import './Modalbox.css';
import './Modalbox.scss';
//Make independent server call here. Need to save these properties globally
const appliedRadioValue =    
    [ 
    { name: 'Yes', value: 0 },
    { name: 'No', value: 1 },
    ]
const displayRadioValue =    
    [ 
    { name: 'Yes', value: 0 },
    { name: 'No', value: 1 },
]
function NewAppPage3(props){
    const [applied, setApplied] = useState(1);
    const [display, setDisplay] = useState(1);
    const [date, setDate] = useState('');

    const onChangeAppliedRadio = (e) =>{
        setApplied(e.target.value)
    }
    const onChangeDisplayRadio = (e) =>{
        setDisplay(e.target.value)
    }
    const onChangeDate = (date) =>{
        console.log(date)
        setDate(date)
    }
    return(
        <div className='sypp-NewApp3'>
             <div className='sypp-pagecircle-container'>
                <div className='sypp-pagecircle-subContainer'>
                    <div className='Sypp-pagecircle'/>
                    <div className='Sypp-pagecircle'/>
                    <div className='Sypp-pagecircle Sypp-pagecircle-active'/>
                </div>
            </div>
            <div className='sypp-NewApp3-subcontainer'>
                <div className='sypp-newapp-button-container'>
                    <div className ="sypp-modal-text">
                        Have you applied yet?
                    </div>
                    <ButtonGroup toggle className='sypp-radiobutton-container'>
                        {appliedRadioValue.map((radio, idx) => (
                            <ToggleButton
                            className="sypp-radiobutton"
                            key = {idx}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={radio.value}
                            checked={applied.toString() === radio.value.toString()}
                            onChange={(e) => onChangeAppliedRadio(e)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </div>
                <div>
                {applied.toString()==='0'?
                <>
                <div style={{width:"250px", paddingTop:"30px", paddingBottom:"10px"}}>
                    <div className ="sypp-modal-text" style={{marginBottom:"10px"}}>
                       When is the deadline? 
                    </div>
                    <CalendarComponent
                    calendarChange={onChangeDate}
                    />
                </div>
                {date!==''?
                <div className='sypp-newapp-button-container'>
                    <div className ="sypp-modal-text">
                        Display this date on timeline?
                    </div>
                    <ButtonGroup toggle className='sypp-radiobutton-container'>
                        {displayRadioValue.map((radio, idx) => (
                            <ToggleButton
                            className="sypp-radiobutton"
                            key = {idx}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={radio.value}
                            checked={display.toString() === radio.value.toString()}
                            onChange={(e) => onChangeDisplayRadio(e)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </div>:<></>
                }
                </>
                :<></>
                }
                </div>
            </div>
            <div className='sypp-save-container'>
                <div className='sypp-button-next'>
                    Save
                </div>
            </div>
        </div>
    );
}
export default NewAppPage3;

