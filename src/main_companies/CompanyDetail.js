import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import CompanyDetailComponents from './CompanyDetailComponents'
import {connect} from 'react-redux'


const mapStatetoProps = state => {
    return{
        companies: state.companies.companies,
    }
}


export class CompanyDetail extends Component{
    constructor(){
        super();
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
            company: company 
        })
        console.log(this.state.company)
        // this.props.updateApplicationDetail(application)
    }
    
    render()
    {
        console.log(this.props.companyID)
        return(
            <div>
                {this.state.company != ''?
                <div>
                    <div className = 'sypp-titleContainer'>
                    <FontAwesomeIcon className = "sypp-angleLeft" icon={faAngleLeft} onClick ={(e) => this.props.toCompanyList()}/>  
                    <div className = "sypp-textTitle sypp-companyName">{this.state.company.Detail.CompanyName}</div>
                    </div>
                <CompanyDetailComponents companyDetail = {this.state.company}/>
                </div>          
                :undefined
                }
            </div>
        )
    }
}
export default connect(mapStatetoProps, null)(CompanyDetail)