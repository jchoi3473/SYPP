import React, { Component } from 'react';
import ModalBox from '../components/addApp/ModalBox'
import './../components/addApp/Modalbox.css'
import './../components/progress/Progress.css'
import ApplicationListComponents from './CompanyListComponents'
import ApplicationListProgress from './ApplicationListProgress'
import './ApplicationList.scss'
import {updateFilteredProgress} from '../redux/filteredProgress-reducer/filteredProgressAction'

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
        <div className ="company-container">
            
        </div>
        <div className = 'modalButton'>
            <ModalBox/>
        </div>
        </div>
    )
}


}
export default connect(mapStatetoProps, mapDispatchToProps)(CompanyList)