import React, {useState} from 'react';
import NewAppCategory from './NewAppCategory'
import './Modalbox.css';
import './Modalbox.scss';
import Modal from 'react-bootstrap/Modal';
//Make independent server call here. Need to save these properties globally

function NewAppPage2(props){
    const [accordion, setAccordion] = useState('');
    const [show, setShow] = useState(false);
    const [categoryInput, setCategoryInput] = useState('');
    const onClickNext = () =>{
        props.setPageNum(2);
    }
    const onClickPrev = () =>{
        props.setPageNum(0);
    }
    const handleClose = () =>{
        setShow(false);
    }
    const handleOpen = () =>{
        setShow(true);
    }
    const onChangeInput = (e) =>{
        setCategoryInput(e.target.value);
    }
    const onSaveNewCategory = () =>{
        var newCategory = {
            categoryID: null, 
            suggestionsOrSeleceted: [], 
            type : categoryInput, 
            _id : null
        }
        props.setCategories([...props.categories, newCategory])
        handleClose();
    }
    return(
        <div className='sypp-NewApp1'>
            <div className='sypp-pagecircle-container'>
                <div className='sypp-pagecircle-subContainer'>
                    <div className='Sypp-pagecircle'/>
                    <div className='Sypp-pagecircle Sypp-pagecircle-active'/>
                    <div className='Sypp-pagecircle'/>
                </div>
            </div>
            <div className='sypp-NewApp1-conatiner'>

            <div className ="sypp-category-container" style={{marginBottom:'5px'}}>
                <div className="sypp-modal-text">Let's categorize this applicaiton!</div>
                <div className="sypp-modal-text">Feel free to leave categories empty if desired!</div>
            </div> 
            <div style={{height:'180px', overflowY:'scroll', width:'235px', paddingTop:'5px'}}>
            {props.categories.map((category, idx) => (
                <NewAppCategory category = {category} accordion = {accordion} setAccordion = {setAccordion}
                setSelectedCategory={props.setSelectedCategory} selectedCategory={props.selectedCategory}
                categories = {props.categories} setCategories = {props.setCategories}
                />
            ))}
            <button className ="sypp-create-category" onClick = {() => handleOpen()}>
                + New Category
            </button>
            </div>
            
            <Modal 
                show={show}
                onHide={() => handleClose()}
                centered
                dialogClassName = "sypp-Modal-Category"
            >
                <div className ="sypp-submodal-container">
                    <div className="sypp-modal-text">What's your new category?</div>
                    <input 
                    className ="sypp-modal-input sypp-newCategory"
                    placeholder = "Category Name"
                    value={categoryInput}
                    onChange = {(e) => onChangeInput(e)}
                    />
                    <div className="sypp-next-button-container">
                        <button className ="sypp-button-next" 
                        onClick = {() => onSaveNewCategory()}
                        disabled = {categoryInput.length<1}>
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
            </div>
            <div className="sypp-save-container">
                <button className ="sypp-button-next" onClick = {() => onClickPrev()}>
                    Prev
                </button>
                <button className ="sypp-button-next" onClick = {() => onClickNext()}>
                    Next
                </button>
            </div>
        </div>
    );
}
export default NewAppPage2;

