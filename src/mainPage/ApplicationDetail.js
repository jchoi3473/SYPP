import React, { Component } from 'react';
import './../components/progress/Progress.css'
import './MainPage.scss'

import {connect} from 'react-redux'

const mapStatetoProps = state => {
    return{
        // apps: state.progress.applications,
        filteredProgress: state.filteredProgress.applications
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
        var selectedApplication = {}
        for(var i=0;i<this.props.filteredProgress.length;i++){
            if(this.props.filteredProgress[i].applicationID === this.props.applicationID){
                selectedApplication = this.props.filteredProgress[i]
            }
        }
        this.setState({
            application : selectedApplication
        })
    }
    
    render()
    {
        console.log(this.state.application.Detail)
        return(
            <div>
                <button onClick = {this.props.toApplicationList}>
                    Back
                </button>
                {this.state.application !== ''?
                <div>
                    <div>{this.state.application.Detail.CompanyName}</div>
                    <div>{this.state.application.Detail.PositionName}</div>
                </div>
                
                
                
                
                
                
                
                
                
                
                
                :undefined
                }
            </div>
        )
    }
}
export default connect(mapStatetoProps, null)(ApplicationDetail)