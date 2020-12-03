import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import UserForm from './UserForm.js';
import './Modalbox.css';
import './Modalbox.scss';

import "bootstrap/dist/css/bootstrap.min.css";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
}));


const ModalBox = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const classes = useStyles();

    return (
        <div>
            <div onClick = {handleShow} className = {classes.extendedIcon + " sypp-newapp-button"}>
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


// const ModalBox = (props) => {
//     const [modalIsOpen, setModalIsOpen] = useState(false) 
//     return (
//         <div>
//             <button onClick={() => setModalIsOpen(true)}>Open modal</button>
//             <Modal className = 'Modal-small' closeTimeoutMS={300} isOpen = {modalIsOpen} onRequestClose={() => setModalIsOpen(false)}> 
//                 <UserForm/>
//                 <button onClick={() => setModalIsOpen(false)}>close modal</button>
//             </Modal>
//         </div>
//     )
// };