import React, {Component} from 'react';
import CompanyList from './CompanyList'
import CompanyDetail from './CompanyDetail';

import {connect} from 'react-redux'
import {updateFilteredProgress} from '../redux/filteredProgress-reducer/filteredProgressAction'
import './Companies.scss'
const mapStatetoProps = state => {
    return{
        companies: state.companies.companies,
    }
}

// const mapDispatchToProps= dispatch =>{
//     return {
//         updateFilteredProgress: (applications) => dispatch(updateFilteredProgress(applications)),
//     }
// }


export class Companies extends Component {
    state = {
        step: 1,
        companyID: ''
    }

    toCompanyDetail = (companyID) =>{
        const {step}  = this.state;
        this.setState({
            companyID: companyID,
            step: step + 1
        });
    }

    toCompanyList = () =>{
        const {step}  = this.state;
        this.setState({
            step: step - 1
        });
    }


    
    render(){
        const{step} = this.state;
        console.log(step)
        switch(step){
            case 1:
                return(
                    <div className = "sypp-company-general-container">
                        <CompanyList 
                            toCompanyDetail = {this.toCompanyDetail}
                        />
                    </div>
                );
            case 2:
                return (
                    <div className = "sypp-company-general-container">
                        <CompanyDetail
                        toCompanyList = {this.toCompanyList}
                        companyID = {this.state.companyID}
                        />
                    </div>
                )
        }
    }
}

export default connect(mapStatetoProps,null)(Companies)