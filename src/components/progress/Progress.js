import React, { Component } from 'react';
import './../addApp/Modalbox.css'
import './Progress.css'
import './ProgressBar.scss'
import Moment from 'moment';


export class Progress extends Component{
    constructor(props){
        super(props)
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
            isHovering : false, 
        }
    }

    handleMouseHover(){
        this.setState(this.toggleHoverState);
        console.log(this.state.isHovering)
    }
    toggleHoverState(state) {
        return{
            isHovering: !state.isHovering,
        };
    }
    render(){
        return(
            <div
            onMouseEnter = {this.handleMouseHover}
            onMouseLeave = {this.handleMouseHover}
            >
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
                        <div>{this.props.date.Title}</div></div>:
                    undefined                
                }

                {
                this.state.isHovering &&!this.props.completed?
                    <div className = "sypp-task-tooltip-notcompleted">
                        <div>{this.props.date.Title}</div>
                    </div>:
                    undefined
                }
            </div>
        )
    }
}

export default Progress