import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import UserForm from './UserForm.js';
import './Modalbox.css';
import './Modalbox.scss';

import "bootstrap/dist/css/bootstrap.min.css";






const ModalBox = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div onClick = {handleShow} className = {"sypp-newapp-button"}>
                <div className = "sypp-newapp-button-plus">+</div>
                <div  className = "sypp-newapp-button-body">New App</div>
            </div>
            <Modal 
            show={show}
            onHide={handleClose}
            centered
            dialogClassName = "sypp-ModalMain"
            >
                <div className = 'sypp-Modal-container'>
                    <button className ="sypp-button-close" onClick={handleClose}>X</button>
                    <UserForm handleClose = {handleClose}/>
                </div>
            </Modal>
        </div>
    )
};
export default ModalBox;
