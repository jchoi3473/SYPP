import React, { Component } from 'react';
import './../addApp/Modalbox.css'
import './Progress.css'
import './ProgressBar.scss'
import Moment from 'moment';
import ReactTooltip from 'react-tooltip'
import Popup from 'reactjs-popup';



export class Progress extends Component{
    constructor(props){
        super(props)
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
            isHovering : false, 
            isHoveringMore: false, 
        }
    }

    handleMouseHover(){
        this.setState(this.toggleHoverState);
    }
    toggleHoverState(state) {
        return{
            isHovering: !state.isHovering,
        };
    }
    handleClick = () =>{
        this.setState({
            isHoveringMore: !this.state.isHoveringMore
        })
    }
    handleUnClick = () =>{
        this.setState({
            isHoveringMore: false
        })
    }
    onClickMark = () =>{
        this.setState({
            isHovering: false
        })
        this.props.handleCompleted(this.props.date, this.props.date.Title)
    }

    render(){
        return(
            <div
            // onBlur = {() => {ReactTooltip.hide(this.fooRef)}}
            // onMouseLeave = {this.handleMouseHover}
            >
            <div className = "sypp-progress-general-container" onMouseEnter = {this.handleMouseHover} onMouseLeave = {this.handleMouseHover}>
                {this.props.completed?
                <div>
                <div className="sypp-applicationFirst sypp-completed"  
                onClick = {() => this.props.handleCompleted(this.props.date, this.props.date.Title)}
                ></div>
                <div className="sypp-date-font">{Moment(this.props.date.Time).format('MMM DD')}</div>
                </div>:
                <div>
                <div className="sypp-applicationFirst sypp-notCompleted" 
                onClick = {() =>  this.props.handleCompleted(this.props.date, this.props.date.Title)}
                ></div>
                <div className="sypp-date-font">{Moment(this.props.date.Time).format('MMM DD')}</div>

                </div>
                }
                {
                this.state.isHovering &&this.props.completed?
                    <div className = "sypp-task-tooltip-completed">
                        <div>{this.props.date.Title}</div>
                        <Popup
                        trigger={
                            <div className ="sypp-task-tooltip-more">
                            ...
                            </div>
                        }
                        position={'bottom right'}
                        closeOnDocumentClick
                        >
                            <div className = "sypp-progress-tooltip-options-container">
                            <button className = "sypp-progress-tooltip-option" onClick = {this.onClickMark}>Mark Incomplete</button>
                            <button className = "sypp-progress-tooltip-option" onClick = {() => {this.onClick()}}>Edit</button>
                            <button className = "sypp-progress-tooltip-option" onClick = {() => {this.onClick()}}>Add Note</button>
                            </div>
                        </Popup>
                        </div>:
                    undefined                
                }

                {
                this.state.isHovering &&!this.props.completed?
                    <div className = "sypp-task-tooltip-notcompleted">
                        <div>{this.props.date.Title}</div>
                        <Popup
                        trigger={
                            <div className ="sypp-task-tooltip-more">
                            ...
                            </div>
                        }
                        position={'bottom right'}
                        closeOnDocumentClick
                        >
                            <div className = "sypp-progress-tooltip-options-container">
                            <button className = "sypp-progress-tooltip-option"  onClick = {this.onClickMark}>Mark Complete</button>
                            <button className = "sypp-progress-tooltip-option"  onClick = {() => {this.onClick()}}>Edit</button>
                            <button className = "sypp-progress-tooltip-option"  onClick = {() => {this.onClick()}}>Add Note</button>
                            </div>
                        </Popup>
                    </div>:
                    undefined
                }
               
                </div>
                
            </div>
        )
    }
}

export default Progress