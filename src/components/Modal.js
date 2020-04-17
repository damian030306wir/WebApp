import React from 'react';

const Modal = ({ closeModal }) => (
    <div className="wrapperModal">
        <button className="closeButton" onClick={closeModal}></button>
        <h1>Hello Wolrd</h1>
    </div>
);

export default Modal;