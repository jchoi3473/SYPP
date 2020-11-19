import React, {Component} from 'react';
import ChipAutocomplete from '../chip/ChipAutocomplete'
import './Modalbox.css';
import Modal from 'react-bootstrap/Modal';
import Scroll from '../scroll/Scroll'

import {connect} from 'react-redux'
import { setSelectedCategories } from '../../redux/addApp-reducer/addAppAction';
import { setCategories } from '../../redux/categories-reducer/categoriesAction';


//Make independent server call here. Need to save these properties globally

export class RoleLocationAdd extends Component{
    constructor(props){
        super(props)
        this.state = {
            userInput : '',
            show : false,
        };
    }
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
        
        const category =  this.props.categories;
        for(var i=0;i<category.length;i++){
                category[i].accordion = false;
        }
        this.props.setCategories(category)
    };
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };
    handleClose = () => {
        this.setState({show: false});
    }
    handleShow = () => {
        this.setState({show: true});
    }
    onChange = (e) =>{
        this.setState({
            userInput: e.currentTarget.value
        })
    }
    onClick = () => {
        this.handleSave(this.state.userInput)
        this.setState({
            show:false
        })
    }

    handleSave = (input) =>{
        const index = this.props.categories.length
        const {categories} = {...this.props}
        const category = categories
        for(var i=0;i<category.length;i++){
            category[i].accordion = false;
            this.props.setCategories(category)
        }
        const newCategory = this.props.categories.concat({
            index: index,
            name: input,
            suggestions : [],
            accordion : true,
        })
        const newSelectCategory = this.props.selectedCategories.concat({
            Type: input,
            SuggestionsOrSeleceted : []
        })
        this.props.setSelectedCategories(newSelectCategory)
        this.props.setCategories(newCategory)
        this.setState({})
    }

    
    handleAccordion = (index) => {
        const category =  this.props.categories;
        if(category[index].accordion == false){
            category[index].accordion = true;
        }
        for(var i=0;i<category.length;i++){
            if(index != category[i].index){
                category[i].accordion = false;
    
            }
            this.props.setCategories(category)
        }
        this.setState({})
    }


    render(){
        return(
            <div>
                <div className ="sypp-category-container">
                    <div className="sypp-modal-text">Let's categorize this applicaiton!</div>
                    <div className="sypp-modal-text">Feel free to leave categories empty if desired!</div>
                    <Scroll className = "sypp-scroll">
                    {   
                        this.props.categories.map((data) => (
                        <div>
                            <ChipAutocomplete
                            className ="sypp-modal-input sypp-position"
                            name = {data.name}
                            key = {data.index}
                            index = {data.index}
                            accordion = {data.accordion}
                            handleAccordion = {this.handleAccordion}
                        />
                        </div>
                        ))
                    }
                    <button className ="sypp-create-category" onClick = {this.handleShow}>
                        + New Category
                    </button>
                    </Scroll>
                </div>
                <Modal 
                    show={this.state.show}
                    onHide={this.handleClose}
                    centered
                    dialogClassName = "sypp-Modal-Category"
                >
                    <div className ="sypp-submodal-container">
                        <div className="sypp-modal-text">What's your new category?</div>
                        <input 
                        className ="sypp-modal-input sypp-newCategory"
                        placeholder = "Category Name"
                        value={this.state.userInput}
                        onChange = {this.onChange}
                        />
                        <div className="sypp-next-button-container">
                            <button className ="sypp-button-next" 
                            onClick = {this.onClick}
                            disabled = {this.state.userInput.length<1}>
                                Save
                            </button>
                        </div>
                    </div>
                </Modal>

                <div className = "sypp-next-button-container">
                <button className = "sypp-button-prev" onClick = {this.back}>
                    Prev
                </button>
                <button className ="sypp-button-next" onClick = {this.continue}>
                    Next
                </button>
                </div>
                
        </div>
        );
    }
}

const mapStatetoProps = state => {
    return{
        categories: state.categories.categories,
        selectedCategories: state.addApp.Categories
    }
}
const mapDispatchToProps= dispatch =>{
    return {
      setCategories: (category) => dispatch(setCategories(category)),   
      setSelectedCategories: (category) => dispatch(setSelectedCategories(category))
    }
  }
  
export default connect(mapStatetoProps,mapDispatchToProps)(RoleLocationAdd)