import React, {useState, useEffect, useRef} from 'react';
import Modal from 'react-bootstrap/Modal';
import NewAppPage1 from './NewAppPage1';
import NewAppPage2 from './NewAppPage2';
import NewAppPage3 from './NewAppPage3';
import './Modalbox.css';
import './Modalbox.scss';

function NewAppliation(props){
    const [pageNum, setPageNum] = useState(0);
    const [show, setShow] = useState(false);
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleClose = () => {
        setPageNum(0);
        setShow(false);
    };
    const handleShow = () => setShow(true);
    useEffect(() => {
        if(localStorage.getItem('user')){
            let tempCategories = JSON.parse(localStorage.getItem('user')).preferences
            if(tempCategories[0].type === "All"){
                tempCategories.shift()
            }
            if(tempCategories[0].type === "Starred"){
                tempCategories.shift()
            }
            setCategories(tempCategories)
        }
    },[])

    const nextPage = () => {
        console.log(pageNum)
        let nextPageNum = pageNum;
        nextPageNum = nextPageNum++;
        setPageNum(nextPageNum);
    }
    const prevPage = () =>{
        let prevPageNum = pageNum;
        setPageNum(prevPageNum--);
    }
    const setCompanyName = (e) =>{
        setCompany(e.target.value);
    }
    const setPositionName = (e) =>{
        setPosition(e.target.value);
    }
    return(
        <div>
            <div onClick = {handleShow} className = "sypp-newapp-button">
                <div className = "sypp-newapp-button-plus">+</div>
                <div  className = "sypp-newapp-button-body">New App</div>
            </div>
            <Modal 
            show={show}
            onHide={handleClose}
            centered
            dialogClassName = "sypp-ModalMain"
            style = {{border :'none !important'}}
            >
            <>
            {
                {  
                    0: <NewAppPage1 setPageNum = {setPageNum} company = {company} setCompanyName = {setCompanyName}
                    position = {position} setPositionName = {setPositionName}
                    />,
                    1: <NewAppPage2 setPageNum = {setPageNum} categories = {categories} setCategories={setCategories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>,
                    2: <NewAppPage3 setPageNum = {setPageNum}/>,
                }[pageNum]
            }
            </>
            </Modal>

        </div>
    );
}
export default NewAppliation;