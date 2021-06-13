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
        apps: state.progress.applications,
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
        for(var i=0;i<this.props.apps.length;i++){
            if(this.props.apps[i].applicationID=== this.props.applicationID){
                application = this.props.apps[i]
            }
        }
        this.setState({
            application : application
        })
        console.log(this.props.applicationID)
        console.log(application)
        // this.props.updateApplicationDetail(application)
    }
    reRender = () =>{
        console.log("please babe")
        this.setState({
            application: this.props.applicationDetail
        })
    }
    render()
    {
        return(
            <div className = "sypp-application-detail-container">
                {this.state.application != ''?
                <div>
                    <div className = 'sypp-titleContainer'>
                    {/* <button className = "button-back" onClick = {this.props.toApplicationList}> */}
                    <FontAwesomeIcon className = "sypp-angleLeft" icon={faAngleLeft} onClick ={e => this.props.toApplicationList()}/>  
                                      {/* </button> */}
                    <div className = "sypp-textTitle sypp-companyName">{this.state.application.detail.companyName}</div>
                    <div className = "sypp-textTitle sypp-positionName">{this.state.application.detail.positionName}</div>
                    </div>
                <ApplicationDetailComponents  applicationDetail = {this.state.application}/>
                </div>          
                :undefined
                }
            </div>
        )
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ApplicationDetail)