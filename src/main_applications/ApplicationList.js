import React, { Component } from 'react';
import ModalBox from './../add_application/ModalBox'
import './../add_application/Modalbox.css'
import './../components/progress/Progress.css'
import ApplicationListComponents from './ApplicationListComponents'
import ApplicationListProgress from './ApplicationListProgress'
import './ApplicationList.scss'
import {updateFilteredProgress} from '../redux/filteredProgress-reducer/filteredProgressAction'

import {connect} from 'react-redux'



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

export class ApplicationList extends Component{
    constructor(props){
        super(props)
        this.state = {
            value : ""
        }
    }
    onChange = (value) => {
        console.log(value)
        var boolean = true;
        if (value == 1) {
            boolean = true;
        }
        else{
            boolean = false;
        }   
    }

render(){
    const radioValue =    
        [ 
        { name: 'All', value: '0' },
        { name: 'Starred', value: '1' },
        ]
    const filteredProgress = []
    const categoryDivided = () =>{
        var temp = []
        for(var i=0; i<this.props.apps.length; i++){
            for(var j=0; j<this.props.apps[i].Detail.Categories.length;j++){
                if(!temp.includes(this.props.apps[i].Detail.Categories[j].Type) && this.props.apps[i].Detail.Categories[j].SuggestionsOrSeleceted.length>0){
                        temp = temp.concat(this.props.apps[i].Detail.Categories[j].Type)}
                }
        }
        for(var i=0;i<temp.length;i++){
            radioValue.push({
                name : temp[i],
                value: i+2+""
            })
        }
    }


    return(
        <div>
        <div className ="sypp-mainpage-container">
        {categoryDivided()}
        <ApplicationListComponents options = {radioValue} onChange = {this.onChange}/>
        <ApplicationListProgress toApplicationDetail = {this.props.toApplicationDetail}/>
        </div>
        <div className = 'sypp-modalButton'>
            <ModalBox/>
        </div>
        </div>
    )
}
}
export default connect(mapStatetoProps, mapDispatchToProps)(ApplicationList)

