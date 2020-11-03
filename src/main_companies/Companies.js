import React, {Component} from 'react';

import CompanyDetail from './CompanyDetail';
import CompanyList, { CompanyList } from './CompanyList'

import {connect} from 'react-redux'
import {updateFilteredProgress} from '../redux/filteredProgress-reducer/filteredProgressAction'
import CompanyDetail from './CompanyDetail';

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
        switch(step){
            case 1:
                return(
                    <div>
                        <CompanyList 
                            toCompanyDetail = {this.toCompanyDetail}
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
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