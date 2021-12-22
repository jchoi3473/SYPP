import React, {useState} from 'react';
import NewAppCategory from './NewAppCategory'
import './Modalbox.css';
import './Modalbox.scss';
import Modal from 'react-bootstrap/Modal';
//Make independent server call here. Need to save these properties globally

function NewAppPage2(props){
    const [accordion, setAccordion] = useState('');
    const onClickNext = () =>{
        props.setPageNum(2);
    }
    const onClickPrev = () =>{
        props.setPageNum(0);
    }
    return(
        <div className='sypp-NewApp1'>
            <div className ="sypp-category-container">
                <div className="sypp-modal-text">Let's categorize this applicaiton!</div>
                <div className="sypp-modal-text">Feel free to leave categories empty if desired!</div>
            </div> 

            {props.categories.map((category, idx) => (
                <NewAppCategory category = {category} accordion = {accordion} setAccordion = {setAccordion}/>
            ))}

            <div className="sypp-next-button-container">
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

