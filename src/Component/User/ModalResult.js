import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalResult = (props) => {
    const { show, setShow, dataModal } = props;
    const handleClose = () => setShow(false);
    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Your result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b>
                        <div>Total Question: {dataModal.countTotal}</div>
                        <div>Total Correct answer: {dataModal.countCorrect}</div>
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Show answer
                    </Button>
                    <Button variant="primary" onClick={() => handleClose()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;