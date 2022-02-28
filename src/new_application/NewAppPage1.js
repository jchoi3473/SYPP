import React, {Component} from 'react';
import { setCompanyName, setPositionName } from '../redux/addApp-reducer/addAppAction';
import {connect} from 'react-redux'
import './Modalbox.css';
import './Modalbox.scss';


function NewAppPage1(props){
        const onClickNext = () =>{
            props.setPageNum(1);
        }
        return(
            <div className='sypp-NewApp1'>
                 <div className='sypp-pagecircle-container'>
                    <div className='sypp-pagecircle-subContainer'>
                        <div className='Sypp-pagecircle Sypp-pagecircle-active'/>
                        <div className='Sypp-pagecircle'/>
                        <div className='Sypp-pagecircle'/>
                    </div>
                </div>
                <div className='sypp-NewApp1-conatiner'>
                <div className = "sypp-company-position-container">
                    <div className="sypp-modal-text sypp-modal-text-company-margin">What company are you applying for?</div>
                    <input
                        className ="sypp-modal-input company"
                        placeholder="Company Name"
                        onChange={e => props.setCompanyName(e)}
                        value={props.company}
                    />
                    <br/>
                    <div className="sypp-modal-text sypp-modal-text-company-margin">What position are you applying for?</div>
                    <input
                        className ="sypp-modal-input company"
                        placeholder="Position Name"
                        onChange={e => props.setPositionName(e)}
                        value={props.position}
                    />
                    <br/>
                </div>

                    <div className="sypp-next-button-container">
                     <button className ="sypp-button-next" onClick = {() => onClickNext()} disabled ={props.position === "" || props.company === ""?true:false}>
                         Next
                    </button>
                    </div>
            </div>
        </div>
        );
    }
export default NewAppPage1
