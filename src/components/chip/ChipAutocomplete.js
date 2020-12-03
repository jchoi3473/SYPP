import React, { Component, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import './ChipAutocomplete.css';
import './ChipAutocomplete.scss';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiButtonBase from '@material-ui/core/ButtonBase';
import MuiChipInput from 'material-ui-chip-input'

import {connect} from 'react-redux'
import { setCategories } from '../../redux/categories-reducer/categoriesAction';
import { setSelectedCategories } from '../../redux/addApp-reducer/addAppAction';



const ButtonBase = withStyles({
  root: {
    padding: '0px',
    margin: '0px'
  },
})(MuiButtonBase);

const ChipInput = withStyles({
  inputRoot: {
    flexWrap: 'wrap',
    fontSize :'5',
    maxWidth: 50,
    color: "white",
    '&$outlined,&$filled': {
      boxSizing: 'border-box'
    },
  },
  chipContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    cursor: 'text',
    width: '100%' ,
    marginBottom: -2,
    minHeight: 30,
    '&$labeled&$standard': {
      marginTop: 5
    }
  },
  chip:{
    background : "#5E6A7E",
    marginTop: '5px',
    marginBottom:'3px',
    fontSize : '10px',
    height : '20px',
    color :"#C2DBFF",
  },
})(MuiChipInput);

const Accordion = withStyles({
  root: {
    minHeight: '0',
    margin: 0,
    padding: 0,
    border: '0px solid rgba(0, 0, 0, 0)',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    '&$expanded': {
      margin: '0px 0',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    display: 'block',
    margin: '0px 0',
    backgroundColor: 'transparent',
    '&$expanded': {
      margin: '0px 0',
      minHeight: 0,
    },
  },
  content: {
    '&$expanded': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      margin: '5px 0px'
    },
  },
  expanded: {},
  focused: {    
    '&$focused': {
    backgroundColor: 'transparent',
    },
  },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: 0,
    marginTop: 1
  },
}))(MuiAccordionDetails);

export class ChipAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: '',
    };
  }
  
  onClick = (e) => {
    const newSelectedCategory = this.props.selectedCategories
    for (var i =0;i<newSelectedCategory.length;i++){
      if(newSelectedCategory[i].Type === this.props.name){
        newSelectedCategory[i].SuggestionsOrSeleceted = newSelectedCategory[i].SuggestionsOrSeleceted.concat(e.currentTarget.innerText)
      }
    }
    // newSelectedCategory[this.props.index].selectedCategory = newSelectedCategory[this.props.index].selectedCategory.concat(e.currentTarget.innerText)
    this.props.setSelectedCategories(newSelectedCategory)
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: '',
    });
  };

  newSuggestion = e => {
    this.handleSuggestion(this.props.index, this.state.userInput);
    const newSelectedCategory = this.props.selectedCategories
    for (var i =0;i<newSelectedCategory.length;i++){
      if(newSelectedCategory[i].Type === this.props.name){
        newSelectedCategory[i].SuggestionsOrSeleceted = newSelectedCategory[i].SuggestionsOrSeleceted.concat(this.state.userInput)
      }
    }
     
    // newSelectedCategory[this.props.index].selectedCategory = newSelectedCategory[this.props.index].selectedCategory.concat(this.state.userInput)
    this.props.setSelectedCategories(newSelectedCategory)
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: '',
    });  }



  onChange = (e) => {
    const { suggestions } = this.props.categories[this.props.index];
    const userInput = e.currentTarget.value;
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
  };

  handleDeleteTags = (tag) => {
   
    const delectedCategory = this.props.selectedCategories[this.props.index].SuggestionsOrSeleceted.filter(state => state !== tag)
    const newSelectedCategory = this.props.selectedCategories
    // console.log(this.props.name)
    // for (var i =0;i<newSelectedCategory.length;i++){
    //   if(newSelectedCategory[i].Type === this.props.name){
    //     newSelectedCategory[i].SuggestionsOrSeleceted = delectedCategory
    //   }
    // }
    newSelectedCategory[this.props.index].SuggestionsOrSeleceted = this.props.selectedCategories[this.props.index].SuggestionsOrSeleceted.filter(state => state !== tag)
    this.props.setSelectedCategories(newSelectedCategory)
    console.log(newSelectedCategory)
    this.setState({})
  };

  handleSuggestion = (index, newSuggestion) => {
    var boolTest = true
    this.props.categories[index].suggestions.map((suggestion) => {
        if(newSuggestion == suggestion){
            boolTest = false;
        }
    })
    if(boolTest){
        const {categories} = {...this.props}
        const category = categories;
        category[index].suggestions = this.props.categories[index].suggestions.concat(newSuggestion)
        this.props.setCategories(category)
    }
  }

  onClickAccordion = (e) => {
    this.props.handleAccordion(this.props.index)
  }

  static defaultProperty={
    suggestions: []
  };
  disableEvents = true;

  /* Dynamically compute style for wrapper components 
      to control mouse interactivity */
  wrapperStyle = e => { 
  };

  render(){
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
        chip
      }
    } = this;
    let suggestionsListComponent;
      if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
          suggestionsListComponent = (
            <ul className = "sypp-ul">
              {filteredSuggestions.map((suggestion, index) => {
                return (
                  <button class ="sypp-suggestion sypp-chipbutton" key={suggestion} onClick={onClick}>
                    {suggestion}
                  </button>
                );
              })}
            </ul>
          );
        } 
      }

    return (
      <div>
        <Accordion expanded = {this.props.accordion} 
        TransitionProps={{
          timeout: 600
        }}>
          <AccordionSummary>
            <div className = "sypp-accoridon-container">
                <div className = 'sypp-label-container'>
                  <div className="sypp-label-text">{this.props.name}</div>
                </div>
                <div className ="sypp-border" onClick = {this.onClickAccordion}>
                    <ChipInput
                    value={this.props.selectedCategories[this.props.selectedCategories.map(
                      function(e){
                        return e.Type
                    }).indexOf(this.props.name)].SuggestionsOrSeleceted}
                    placeholder="Assign Tag"
                    onDelete={(tag) => this.handleDeleteTags(tag)}
                    onUpdateInput={this.onChange}
                    disableUnderline = {true}
                    fullWidthInput = {false}
                    fullWidth = {false}
                    />
                </div>
            </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className = "sypp-container-suggestion">
                {suggestionsListComponent}
                <button className = "sypp-suggestion" 
                  onClick={this.newSuggestion}
                  disabled = {this.state.userInput.length<1}
                >Create</button>
                </div>
            </AccordionDetails>
        </Accordion>
      </div>
    );
  };
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

export default connect(mapStatetoProps, mapDispatchToProps)(ChipAutocomplete);

