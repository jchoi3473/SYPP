import React, { Component } from 'react';
import ProgressBar from './../components/progress/ProgressBar'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './../components/progress/Progress.css'
import './../components/progress/ProgressBar.scss'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-dropdown';
import axios from 'axios';
import {updateFavorite} from './../lib/api'
import './ApplicationList.scss'
// import Rating from "@material-ui/lab/Rating";
 import Rating from 'react-rating';
import {setApps} from './../redux/progress-reducer/progressAction'
import {updateFilteredProgress, updateFilteredProgressTitle, updateFilteredProgressButtonValue} from './../redux/filteredProgress-reducer/filteredProgressAction'

import {connect} from 'react-redux'
import 'font-awesome/css/font-awesome.min.css';

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



const mapStatetoProps = state => {
    return{
        apps: state.progress.applications,
        filteredProgress: state.filteredProgress.applications,
        selectedTitle: state.filteredProgress.selectedTitle,
        connection: state.connection.connection
    }
}
const mapDispatchToProps= dispatch =>{
    return {
        setApps: (applications) => dispatch(setApps(applications)),
        updateFilteredProgress: (applications) => dispatch(updateFilteredProgress(applications)),
        updateFilteredProgressTitle: (title) => dispatch(updateFilteredProgressTitle(title)),
        updateButtonValue: (value) => dispatch(updateFilteredProgressButtonValue(value))
    }
}


export class ApplicationListProgress extends Component{
    constructor(){
        super();
        this.handleMouseHover = this.handleMouseHover.bind(this);

        this.state =  {
            searchField:'',
            isHovering : false,
            radioValue : '0',
            radioName : '',
            categoryValue : ''
        }
    }
    handleMouseHover(){
        this.setState(this.toggleHoverState);
    }
    toggleHoverState(state) {
        return{
            isHovering: !state.isHovering,
        };
    }
    
    async onClickIsFavorite (applicationID){
        var apps = this.props.apps
        for(var i=0; i<apps.length;i++){
            if(apps[i].applicationID+"" === applicationID+""){
                apps[i].detail.isFavorite = !apps[i].detail.isFavorite
                this.props.setApps(apps)                
                await updateFavorite(JSON.parse(localStorage.getItem('user')).uID, "application", applicationID, apps[i].detail.isFavorite)
                if (this.props.connection) {
                    try {
                        await this.props.connection.invoke('UpdateConnectionID', JSON.parse(localStorage.getItem('user')).uID, this.props.connection.connection.connectionId)
                        await this.props.connection.invoke('Application_IsFavorite_Update', JSON.parse(localStorage.getItem('user')).uID, applicationID, apps[i].detail.isFavorite)  
                    } catch(e) {
                        console.log(e);
                    }
                }
                break;
            }
        }
        this.setState({})
    }
    //mid task add, need to make fetch call
    onClickAdd = (applicationID, title, date, isVisible) => {
        const apps = this.props.apps
        apps.map((data) => {
            if(data.applicationID === applicationID){
                data.tasks = data.tasks.concat({
                    time: date,
                    title: title,
                    isVisible : isVisible,
                    status: false
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
    onClickDelete = () =>{
        console.log("trigger Trash Can")
    }
    categorySpecified = () =>{
        var temp = []
            for(var i=0; i<this.props.apps.length ;i++){
                //save i as an index
                for(var j=0;j<this.props.apps[i].detail.categories.length;j++){
                    if(this.props.apps[i].detail.categories[j]){
                    if(this.props.apps[i].detail.categories[j].type === this.state.radioName){
                        for(var k=0; k<this.props.apps[i].detail.categories[j].suggestionsOrSeleceted.length;k++){
                            if(!temp.includes(this.props.apps[i].detail.categories[j].suggestionsOrSeleceted[k].content)){
                                console.log("triggered")
                                temp = temp.concat(this.props.apps[i].detail.categories[j].suggestionsOrSeleceted[k].content)
                                
                            }
                          }    
                    }
                    }
                }
            }
            console.log(temp)

        return(
            <>
                <Dropdown 
                className = "sypp-category-dropdown sypp-category-dropdown-arrowdiv"
                arrowClassName = "sypp-category-dropdown-arrowdiv"
                controlClassName = "sypp-Dropdown-control"
                menuClassName = "sypp-Dropdown-menu"
                options = {temp} 
                onChange = {this.onClickSpecificCategory} 
                value = {this.props.selectedTitle} 
                arrowClosed = {<FontAwesomeIcon className = "sypp-category-dropdown-arrow" icon={faChevronUp}/>}
                arrowOpen = {<FontAwesomeIcon className = "sypp-category-dropdown-arrow" icon={faChevronDown}/>}        
                />
            </>
        )
    }

    onClickSpecificCategory = value => {
        console.log(Object.values(value)[0])
        console.log("clicked")
        var filtered = [] 
        for(var i=0; i<this.props.apps.length ;i++){
            for(var j=0;j<this.props.apps[i].detail.categories.length;j++){
                if(this.props.apps[i].detail.categories[j]){
                    if(this.props.apps[i].detail.categories[j].type === this.state.radioName && this.props.apps[i].detail.categories[j].suggestionsOrSeleceted.map((data) => data.content === Object.values(value)[0])){
                        filtered = filtered.concat(this.props.apps[i])
                    }}
            }
        }
        this.props.updateFilteredProgressTitle(Object.values(value)[0])
        this.props.updateFilteredProgress(filtered)
        // () => console.log('option selected', this.props.selectedTitle)
    }

    radioChange = (radio) => {
        console.log(radio.name)
        var filtered = [] 
        if(radio.value==='0'||radio.value==='1'){
            // e.preventDefault();
            var name = ''
            for(var i=0;i<this.props.options.length;i++){
                if(this.props.options[i].value ===  radio.value)
                name = this.props.options[i].name
            }
            // props.onChange(name);
            // setRadioValue(e.currentTarget.value)
            if(radio.value === '0'){
                filtered = this.props.apps
                this.props.updateFilteredProgressTitle("All")
                // setRadioValue('0')
                this.props.updateButtonValue('0')
                this.setState({
                    radioValue : '0'
                })
            }
            //isFavorite = true인 case들
            else if(radio.value === '1'){
                this.setState({
                    radioValue : '1'
                })
                this.props.updateButtonValue('1')
                this.props.updateFilteredProgressTitle("Starred")
                for(var i=0;i<this.props.apps.length;i++){
                if(this.props.apps[i].detail.isFavorite) 
                    filtered = filtered.concat(this.props.apps[i])
                }
            }
        }
        else{
            var temp = []
            for(var i=0; i<this.props.apps.length ;i++){
                //save i as an index
                for(var j=0;j<this.props.apps[i].detail.categories.length;j++){
                    if(this.props.apps[i].detail.categories[j]){
                    if(this.props.apps[i].detail.categories[j].type === radio.name){
                        // console.log("triggered")
                        // filtered = filtered.concat(this.props.apps[i])

                        // for(var k=0; k<this.props.apps[i].detail.categories[j].suggestionsOrSeleceted.length;k++){
                        //     if(e.target.getAttribute('name') === this.props.apps[i].detail.categories[j].suggestionsOrSeleceted[k]){
                        //     }
                        // }
                        for(var k=0; k<this.props.apps[i].detail.categories[j].suggestionsOrSeleceted.length;k++){
                            if(!temp.includes(this.props.apps[i].detail.categories[j].suggestionsOrSeleceted[k])){
                              temp = temp.concat(this.props.apps[i].detail.categories[j].suggestionsOrSeleceted[k])
                            }
                          }    
                    }}
                }
            }
            if(temp.length>0){
                for(var i=0; i<this.props.apps.length ;i++){
                    for(var j=0;j<this.props.apps[i].detail.categories.length;j++){
                        if(this.props.apps[i].detail.categories[j]){
                        if(this.props.apps[i].detail.categories[j].type === radio.name && this.props.apps[i].detail.categories[j].suggestionsOrSeleceted.map((data) => data.content ===  temp[0])){
                            console.log(temp[0])
                            filtered = filtered.concat(this.props.apps[i])
                        }}
                    }
                }
            }
            this.props.updateFilteredProgressTitle(temp[0].content)   
            this.setState({
                radioValue : radio.value,
                radioName : radio.name
            })
        }
        this.props.updateFilteredProgress(filtered)

    }




    render(){
        const searchFilteredProgress = this.props.filteredProgress.filter(application => {
            return (application.detail.companyName.toLowerCase().includes(this.state.searchField.toLowerCase())||application.detail.positionName.toLowerCase().includes(this.state.searchField.toLowerCase()) )
        })

        return(
            <div  style = {{height : '100%'}}>
            {/* <div style = {{width : '200px', overflowX : 'scroll'}}> */}
                <ButtonGroup toggle className = "sypp-applicationList-radio-container">
                {this.props.options.map((radio, idx) => (
                    <ToggleButton
                    className={"sypp-colorChange2 sypp-activeChange sypp-hoverChange sypp-text1"}
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={radio.value}
                    checked={this.state.radioValue === radio.value}
                    onChange={(e) => this.radioChange(radio)}
                    data-for="radioTip"
                    data-tip = ''
                    // onMouseEnter = {e => handleChange(e)}
                    >
                    <div className = "sypp-category-radio-padding" name = {radio.name} value = {radio.value}>
                        <span style = {{minWidth : 'fit-content'}}>{radio.name}</span>
                    </div>
                    </ToggleButton>
            ))}
                </ButtonGroup>
            {/* </div> */}
            <div className ="sypp-searchBox-container">
            <input 
            className ="sypp-applicationlist-searchBox"
            type='search' 
            placeholder = '  Search application'
            onChange = {e => this.onSearchChange(e)}
            value = {this.state.searchField}
            />
            </div>
            {this.props.selectedTitle !== "" ? 
            <>
                {
                (this.state.radioValue==='0'||this.state.radioValue==='1')? 
                <div className ="sypp-selectedTitle">{this.props.selectedTitle}
                </div>:
                <>
                    {
                    this.categorySpecified()
                    }
                </> 
                }
            </>: undefined
            
            }

            <div className = "sypp-task-sortby">Testing</div>
            <div className = "sypp-taskTitles">
                <div className="sypp-taskEntity">Apply</div>
                <div className="sypp-taskEntity">Task</div>
                <div className="sypp-taskEntity">Result</div>
            </div>
                <div className = "sypp-applicationList-container" style={this.props.extended?{overflowY: 'scroll', height: '80%'}:{overflowY: 'scroll', height: '75%'}}>
                {
                (searchFilteredProgress.length > 0)?
                searchFilteredProgress.map((data) => (
                        <div className = "sypp-progress-all sypp-trashIcon-Hover">
                            <div className = "sypp-starContainer">
                            <Rating className ="sypp-starIcon" applicationName = {data.applicationID} stop={1} initialRating = {data.detail.isFavorite?1:0} onClick = {() => this.onClickIsFavorite(data.applicationID)}
                            emptySymbol="fa fa-star-o starSize starIcon"
                            fullSymbol = "fa fa-star starSize starIcon"
                                />
                            </div>
                                <div className = "sypp-application-name" onClick = {() => this.props.toApplicationDetail(data.applicationID)}>
                                <div className = "sypp-appilication-name-container" >
                                    <div className = "sypp-progress-company"  >{data.detail.companyName}</div>
                                    <FontAwesomeIcon className = "sypp-trashIcon sypp-trashIcon-Hover" icon={faTrashAlt} onClick = {this.onClickDelete}/>
                                </div>
                                <div className = "sypp-progress-position" >{data.detail.positionName}</div>
                                </div>
                            <ProgressBar applicationID = {data.applicationID} applied = {data.applied} dates = {data.tasks} details = {data.detail.status[0]} onClickAdd = {this.onClickAdd}/>
                        </div>
                        )):undefined
                }
                </div>
            </div>
        )
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(ApplicationListProgress);