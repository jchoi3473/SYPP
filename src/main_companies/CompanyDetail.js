import React, { Component } from 'react';
import './../components/progress/Progress.css'
import './ApplicationList.scss'
import './ApplicationDetail.scss'
import 'font-awesome/css/font-awesome.min.css';

import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import CompanyDetailComponents from './CompanyDetailComponents'
import {connect} from 'react-redux'
import updateApplicationDetail from '../redux/applicationDetail-reducer/ApplicationDetailAction'

const mapStatetoProps = state => {
    return{
        // apps: state.progress.applications,
        companies: state.companies.companies,
    }
}
const mapDispatchToProps= dispatch =>{
    return {
        updateApplicationDetail: (applications) => dispatch(updateApplicationDetail(applications)),
    }
}

export class CompanyDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            company : ''
        }
    }
    componentDidMount(){
        var company = {}
        for(var i=0;i<this.props.companies.length;i++){
            if(this.props.companies[i].companyID === this.props.companyID){
                company = this.props.companies[i]
            console.log("sjfoqwpfjpoqjsop")
            }
        }
        this.setState({
            company 
        })
        // this.props.updateApplicationDetail(application)
    }
    
    render()
    {
        return(
            <div>
                {this.state.application != ''?
                <div>
                    <div className = 'titleContainer'>
                    {/* <button className = "button-back" onClick = {this.props.toApplicationList}> */}
                    <FontAwesomeIcon className = "angleLeft" icon={faAngleLeft} onClick ={e => this.props.toCompanyList()}/>  
                                      {/* </button> */}
                    <div className = "textTitle companyName">{this.state.company.Detail.CompanyName}</div>
                    </div>
                <CompanyDetailComponents companyDetail = {this.state.company}/>
                </div>          
                :undefined
                }
            </div>
        )
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(CompanyDetail)