import React, {Component} from 'react';

import ApplicationDetail from './ApplicationDetail';
import ApplicationList from './ApplicationList'

import {connect} from 'react-redux'
import {updateFilteredProgress} from '../redux/filteredProgress-reducer/filteredProgressAction'

const mapStatetoProps = state => {
    return{
        apps: state.progress.applications,
        filteredProgress: state.filteredProgress.applications
    }
}
const mapDispatchToProps= dispatch =>{
    return {
        updateFilteredProgress: (applications) => dispatch(updateFilteredProgress(applications)),
    }
}


export class Applications extends Component {
    state = {
        step: 1,
        applicationID: ''
    }

    componentDidMount(){
        this.props.updateFilteredProgress(this.props.apps)
    }

    toApplicationDetail = (applicationID) =>{
        const {step}  = this.state;
        this.setState({
            applicationID: applicationID,
            step: step + 1
        });
    }

    toApplicationList = () =>{
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
                        <ApplicationList 
                            toApplicationDetail = {this.toApplicationDetail}
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <ApplicationDetail
                        toApplicationList = {this.toApplicationList}
                        applicationID = {this.state.applicationID}
                        />
                    </div>
                )
        }
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(Applications)