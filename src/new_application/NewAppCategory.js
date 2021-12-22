import React, {useState} from 'react';
import './NewApp.scss';
function NewAppCategory(props){
    const[selected, setSelected] = useState(false);
    const[selectedItem, setSelectedItem] = useState();
    const[selectInput, setSelectInput] = useState('');
    const[filteredSearch, setFilteredSearch] = useState([]);

    const onChangeInput = (e) =>{
        setSelectInput(e.target.value);
        let filterSuggestion = 
            props.category.suggestionsOrSeleceted.filter(
                (suggestion) =>
                suggestion.content.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
            )
        setFilteredSearch(filterSuggestion)
    }
    const onClickContent = (suggestion) =>{
        setSelectedItem(suggestion);
        setSelected(true);

    }
    return(
        <div className='sypp-NewAppCategory-Container' style={{marginBottom:'15px'}}>
            <div onClick={()=>props.setAccordion(props.category.type)} className='sypp-NewAppCategory-Title-Container' >
                <div className='sypp-NewAppCategory-Title'>
                    {props.category.type}
                </div>
                {selected?
                <div>
                    <div>
                        {selectedItem.content}
                    </div>
                    <div>
                        x
                    </div>
                </div>:
                <input className='sypp-NewAppCategory-Input' value={selectInput} onChange={e => onChangeInput(e)}/>
                }
            </div>
            {props.accordion === props.category.type?
                <div className='sypp-NewAppCategory-suggestion-cotainer' style={{marginLeft : "120px"}}>
                <div className='sypp-NewAppCategory-suggestion-item'>
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