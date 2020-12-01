import React, {Component} from 'react';
import Calendar from 'react-calendar';
import CalendarComponent from '../../components/calendar/CalendarComponent';
import { Dropdown } from 'semantic-ui-react'

import 'font-awesome/css/font-awesome.min.css';
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import './CreateEditConversation.scss'
import { min } from 'moment';

class ConversationDate extends Component {

    onClickRemoveSelection = () => {
        this.setState({})
        this.props.onChangeDate(new Date())
    }

    render(){
        return(
            <div>
                <div className = "sypp-event-date-title">Date</div>
                <div className = "sypp-event-calendar">
                <CalendarComponent calendarChange = {this.props.onChangeDate}/> 
                </div>
                <div className = "sypp-event-bottom-options-container">
                    <button className = "sypp-event-bottom-option sypp-option1 sypp-option1-page2" onClick = {this.onClickRemoveSelection}>
                        Remove Date
                    </button>
                    <button className = "sypp-event-bottom-option sypp-option2 sypp-option2-page2" onClick = {this.props.prevStep}>
                        {"Select Date"}
                    </button>
                    <button className = "sypp-event-bottom-option sypp-option3 sypp-option3-page2" onClick = {this.props.handleClose}>
                        Close
                    </button>
                </div>
            </div>
        );
    }
}
export default ConversationDate