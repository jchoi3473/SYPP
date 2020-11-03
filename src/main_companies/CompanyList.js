import React, { Component } from 'react';
import './../components/progress/Progress.css'
import CompanyListComponents from './CompanyListComponents'
import './ApplicationList.scss'

import {connect} from 'react-redux'



const mapStatetoProps = state => {
    return{
        companies: state.companies.companies,
    }
}
const mapDispatchToProps= dispatch =>{
    return {
        updateFilteredProgress: (applications) => dispatch(updateFilteredProgress(applications)),
    }
}

export class CompanyList extends Component{

   

render(){

    return(
        <div>
        <div className ="company-container" onClick = {e => this.props.toApplicationDetail(data.Detail.applicationID)}>

        </div>
        </div>
    )
}


}
export default connect(mapStatetoProps, mapDispatchToProps)(CompanyList)