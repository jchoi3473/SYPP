import React, { Component } from 'react';
import ProgressBar from '../components/progress/ProgressBar'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './../components/progress/Progress.css'
import './ApplicationList.scss'
// import Rating from "@material-ui/lab/Rating";
 import Rating from 'react-rating';
import {setApps, requestProgress, postProgress} from '../redux/progress-reducer/progressAction'
import {connect} from 'react-redux'
import 'font-awesome/css/font-awesome.min.css';


const mapStatetoProps = state => {
    return{
        apps: state.progress.applications,
        filteredProgress: state.filteredProgress.applications,
        selectedTitle: state.filteredProgress.selectedTitle
    }
}
const mapDispatchToProps= dispatch =>{
    return {
        setApps: (applications) => dispatch(setApps(applications)),
        onRequestProgress: () => dispatch(requestProgress()),        
        postProgress: (body) => dispatch(postProgress(body))
    }
}


export class Progress extends Component{
    constructor(){
        super();
        this.state =  {
            searchField:''
        }
    }
    //UID, APP ID, TASK use post call
    //return task with id
    onClickIsFavorite = (applicationID) =>{
        var apps = this.props.apps

        for(var i=0; i<apps.length;i++){
            if(apps[i].applicationID+"" === applicationID+""){
                apps[i].Detail.IsFavorite = !apps[i].Detail.IsFavorite
                break;
            }
        }
        this.props.setApps(apps)
        this.setState({})
    }

    onClickAdd = (applicationID, title, date, showDate) => {
        const apps = this.props.apps
        apps.map((data) =>{
            if(data.applicationID === applicationID){
                data.Tasks = data.Tasks.concat({
                    Time: date,
                    Title: title,
                    showDate : showDate,
                    Status: false
                })
            }
        })
        this.props.setApps(apps)
        this.setState({})
    }

    onSearchChange = (e) =>{
        this.setState({
            searchField: e.target.value
        })
        console.log(this.state.searchField)
    }

    render(){
        const searchFilteredProgress = this.props.filteredProgress.filter(application => {
            return (application.Detail.CompanyName.toLowerCase().includes(this.state.searchField.toLowerCase())||application.Detail.PositionName.toLowerCase().includes(this.state.searchField.toLowerCase()) )
        })

        return(
            <div>
            <div className ="sypp-searchBox-container">
            <input 
            className ="sypp-searchBox"
            type='search' 
            placeholder = '  Search application'
            onChange = {e => this.onSearchChange(e)}
            value = {this.state.searchField}
            />
            </div>
            {this.props.selectedTitle !== ""? <div className ="sypp-selectedTitle">{this.props.selectedTitle}</div>:undefined}
            <div className = "sypp-taskTitles">
                <div className="sypp-taskEntity">Apply</div>
                <div className="sypp-taskEntity">Task</div>
                <div className="sypp-taskEntity">Result</div>
            </div>
                {
                    (searchFilteredProgress.length > 0)?
                    searchFilteredProgress.map((data) => (
                            <div className = "sypp-progress-all">
                                <div className = "sypp-starContainer">
                                <Rating className ="sypp-starIcon" applicationName = {data.applicationID} stop={1} initialRating = {data.Detail.IsFavorite?1:0} onClick = {() => this.onClickIsFavorite(data.applicationID)}
                                emptySymbol="fa fa-star-o starSize starIcon"
                                fullSymbol = "fa fa-star starSize starIcon"
                                 />
                                </div>
                                    <div>{console.log(data)}</div>
                                    <div className = "sypp-application-name" onClick = {e => this.props.toApplicationDetail(data.Detail.applicationID)}>
                                    <div className = "sypp-progress-company">{data.Detail.CompanyName}</div>
                                    <div className = "sypp-progress-position">{data.Detail.PositionName}</div>
                                    </div>
                                <ProgressBar applicationID = {data.Detail.applicationID} applied = {data.applied} dates = {data.Tasks} details = {data.Detail.Status[0]} onClickAdd = {this.onClickAdd}/>
                            </div>
                            )):undefined
                }
            </div>
        )
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(Progress);