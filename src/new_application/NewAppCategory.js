import React, {useState, useEffect, useRef} from 'react';
import AutosizeInput from 'react-input-autosize';

import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './NewApp.scss';
function NewAppCategory(props){
    const[selected, setSelected] = useState(false);
    const[selectedItem, setSelectedItem] = useState();
    const[selectInput, setSelectInput] = useState('');
    const[filteredSearch, setFilteredSearch] = useState([]);
    const [multipleInput, setMultipleInput] = useState('');
    
    const span = useRef();
    
    const onChangeMultipleInput = (e) =>{
        setMultipleInput(e.target.value);
    }   
    const onChangeInput = (e) =>{
        console.log(props.category)
        setSelectInput(e.target.value);
        if(props.category.suggestionsOrSeleceted){
        let filterSuggestion = 
            props.category.suggestionsOrSeleceted.filter(
                (suggestion) =>
                suggestion.content.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
            )
            setFilteredSearch(filterSuggestion)
        }
    }
    const onClickContent = (suggestion) =>{
        setSelectedItem(suggestion);
        setSelected(true);
        let tempCategory = Object.assign({}, props.category)
        tempCategory.suggestionsOrSeleceted=suggestion
        props.setSelectedCategory([...props.selectedCategory,tempCategory]);
    }
    const onClickCancelContent = () =>{
        setSelectedItem();
        setSelectInput('');
        setSelected(false);
    }

    const onClickCreate = (e) =>{
        e.preventDefault();
        var tempCategories = props.categories;
        console.log(props.categories)
        for(var i=0;i<props.categories.length;i++){
            if(tempCategories[i].type === props.category.type){
                tempCategories[i].suggestionsOrSeleceted.push({ categoryID: null,
                    content: selectInput,
                    suggestionID: null})
            }
        }
        
        const suggestion =  
        {categoryID: null,
        content: selectInput,
        suggestionID: null}
        props.setCategories(tempCategories);
        onClickContent(suggestion);
    }
    
    return(
        
        <div className='sypp-NewAppCategory-Container' style={{marginBottom:'15px'}}>
            <div onClick={()=>props.setAccordion(props.category.type)} className='sypp-NewAppCategory-Title-Container' >
                <div className='sypp-NewAppCategory-Title'>
                    {props.category.type}
                </div>
                {selected?
                <div className='sypp-NewAppCategory-Input sypp-NewAppCategory-div'>
                    <div className='sypp-NewAppCategory-div-container'>
                        <div className='sypp-NewAppCategory-div-text' style={{marginRight: '5px'}}>
                            {selectedItem.content}
                        </div>
                        <FontAwesomeIcon className ="sypp-NewAppCategory-div-x" icon={faTimesCircle} onClick={()=>onClickCancelContent()}/>  

                        {/* <div className='sypp-NewAppCategory-div-x'>
                            x
                        </div> */}
                    </div>
                    <AutosizeInput
                        name="sypp-NewAppCategory-MultiInput"
                        value={multipleInput}
                        onChange={(e) => onChangeMultipleInput(e)}
                    />
                </div>:
                <input className='sypp-NewAppCategory-Input' value={selectInput} onChange={e => onChangeInput(e)}/>
                }
            </div>
            {props.accordion === props.category.type?
                <div className='sypp-NewAppCategory-suggestion-cotainer'>
                <div className='sypp-NewAppCategory-suggestion-item' onClick={(e)=>onClickCreate(e)}>
                    Create
                </div>
                {filteredSearch.map((suggestion, idx) =>(
                    <div className='sypp-NewAppCategory-suggestion-item'>
                        <div className='sypp-NewAppCategory-suggestion-item-text' onClick={() => onClickContent(suggestion)}>
                            {suggestion.content}
                        </div>
                    </div>
                ))}
            </div>:
            <></>
            }
            
        </div>
    );
}
export default NewAppCategory;

