import React, { Component } from 'react';
import './../components/progress/Progress.css'
import './ApplicationList.scss'
import './ApplicationDetail.scss'
import 'font-awesome/css/font-awesome.min.css';

import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import ApplicationDetailComponents from './ApplicationDetailComponents'
import {connect} from 'react-redux'
import updateApplicationDetail from './../redux/applicationDetail-reducer/ApplicationDetailAction'

const mapStatetoProps = state => {
    return{
        // apps: state.progress.applications,
        filteredProgress: state.filteredProgress.applications,
        applicationDetail : state.applicationDetail.application
    }
}
const mapDispatchToProps= dispatch =>{
    return {
        updateApplicationDetail: (applications) => dispatch(updateApplicationDetail(applications)),
    }
}

export class ApplicationDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            application : ''
        }
    }
    componentDidMount(){
        var application = {}
        for(var i=0;i<this.props.filteredProgress.length;i++){
            if(this.props.filteredProgress[i].applicationID === this.props.applicationID){
                application = this.props.filteredProgress[i]
            }
        }
        this.setState({
            application 
        })
        console.log(this.props.applicationID)
        this.props.updateApplicationDetail(application)
    }
    
    render()
    {
        return(
            <div>
                {this.state.application != ''?
                <div>
                    <div className = 'titleContainer'>
                    {/* <button className = "button-back" onClick = {this.props.toApplicationList}> */}
                    <FontAwesomeIcon className = "angleLeft" icon={faAngleLeft} onClick ={e => this.props.toApplicationList()}/>  
                                      {/* </button> */}
                    <div className = "textTitle companyName">{this.state.application.Detail.CompanyName}</div>
                    <div className = "textTitle positionName">{this.state.application.Detail.PositionName}</div>
                    </div>
                <ApplicationDetailComponents/>
                </div>          
                :undefined
                }
            </div>
        )
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ApplicationDetail)