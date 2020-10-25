import React, { Component } from 'react';
import ProgressBar from '../components/progress/ProgressBar'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './../components/progress/Progress.css'
import MainPageComponents from './MainPageComponents'
import Progress from './Progress'
import './MainPage.scss'
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

export class MainPage extends Component{

    onChange = (value) => {
        console.log(value)
        var boolean = true;
        if (value == 1) {
            boolean = true;
        }
        else{
            boolean = false;
        }   // this.props.setDates(newDates)
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
        <div className ="mainpage-container">
        {categoryDivided()}
        <MainPageComponents options = {radioValue} onChange = {this.onChange}/>
        <Progress toApplicationDetail = {this.props.toApplicationDetail}/>
        </div>
    )
}


}
export default connect(mapStatetoProps, mapDispatchToProps)(MainPage)