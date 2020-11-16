import React from 'react';
// import { X } from 'react-feather';
import Draggable from 'react-draggable';
import { ModalContext } from './ModalProvider';
import MainPage from './main/MainPage'
import './modal.css'

const Modal = () => {
  return (
    <ModalContext.Consumer>
      {({ windowPosition, hasDraggedWindowPosition}) => (
        <Draggable
          handle=".modal-handle"
          defaultPosition={{x: windowPosition.x, y: windowPosition.y}}
          position={hasDraggedWindowPosition ? { x: windowPosition.x, y: windowPosition.y } : null}
        >
          <div id="modal" className="modal-window" style={{
            transform: windowPosition,
        }}>
            {/* <div className="modal-window-inner-border"> */}
                <>
                  {/* <div className="modal-body"> */}
                  <div className="modal-handle"></div>
                    {/* <div className="modal-content">   */}
                        <MainPage/>
                    {/* </div> */}
                  {/* </div> */}
                </>
              {/* </div> */}
          </div>
        </Draggable>
      )}
    </ModalContext.Consumer>
  );
};

export default Modal;