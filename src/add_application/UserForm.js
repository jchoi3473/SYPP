import React, {Component} from 'react';
import RoleLocationAdd from './RoleLocationAdd';
import Applied from './Applied';
import CompanyPositionAdd from './CompanyPositionAdd';
import InterviewDate from './InterviewDate';
import Page from '../components/page/Page'

import {connect} from 'react-redux'
import {postNewApp, setSelectedCategories} from './../redux/addApp-reducer/addAppAction'
import {requestProgress} from './../redux/progress-reducer/progressAction'


const mapStatetoProps = state => {
    return{
        addApp: state.addApp,
        categories: state.categories.categories
    }
} 

const mapDispatchToProps= dispatch =>{
    return {
        onRequestProgress: () => dispatch(requestProgress()),        
        postNewApp: (app) => dispatch(postNewApp(app)),
        setSelectedCategories: (categories) => dispatch(setSelectedCategories(categories))
    }
}


export class UserForm extends Component {
    state = {
        step: 1,
    }

    //Send Post request, close modal(save button)
    onSaveButton = async() => {
        // this.props.postNewApp(this.props.addApp)
        console.log("Triggered")
        const app = await this.props.postNewApp(this.props.addApp)
        console.log("Triggered")
        const app2 = setTimeout(()=> this.props.onRequestProgress(), 500) 
        var newCategory = this.props.addApp.Categories;
        for (var i=0;i<this.props.addApp.Categories.length;i++){
        console.log(this.props.categories[i])
        newCategory[i].SuggestionsOrSeleceted = []
        }
        this.props.setSelectedCategories(newCategory)
        this.props.handleClose()
    }




    nextStep = () =>{
        const {step}  = this.state;
        this.setState({
            step: step + 1
        });
    }

    prevStep = () =>{
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
                        <Page pageNumber ={this.state.step} pageCount = {[1,2,3,4]}/>
                        <CompanyPositionAdd 
                            nextStep = {this.nextStep}
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <Page pageNumber ={this.state.step} pageCount = {[1,2,3,4]}/>
                        <RoleLocationAdd
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        />
                    </div>
                )
            case 3:
                return (
                    <div>
                        <Page pageNumber ={this.state.step} pageCount = {[1,2,3,4]}/>
                        <Applied
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        />
                    </div>
                )
                //can use save button here. Send info from this save?
            case 4:
                return (
                    <div>
                        <Page pageNumber ={this.state.step} pageCount = {[1,2,3,4]}/>
                        <InterviewDate 
                        />
                        <div className="sypp-next-button-container">
                            <button className = "sypp-button-next" onClick={this.onSaveButton}>Save</button>
                        </div>
                    </div>
                )
        }
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(UserForm)