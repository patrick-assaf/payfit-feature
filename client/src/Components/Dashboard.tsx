import React, { useState } from 'react';
import { Message } from './Message';
import { HeaderBar } from './HeaderBar';
import { LeaveTable } from './LeaveTable';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'; 

interface Props {

}

export const Dashboard: React.FC<Props> = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <div className="feature-box shadow">
            <p className="feature-title">
                October 2020 - Annual Leave
            </p>
            <HeaderBar taken={0} />
            <LeaveTable />
            <div className="d-flex">
                <Button onClick={handleShow} variant="primary" className="ml-auto feature-button pt-2 pb-2 mb-3"><span className="pr-2">+</span> Add annual leave</Button>
            </div>
            <Message format="info" content="Your annual leave runs from 01/01/2020 to 31/12/2020." />
        </div>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="modal-title">
                <Modal.Title>Leaves</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className="d-flex justify-content-center" inline>
                <Form.Group>
                    <Form.Label htmlFor="startDate" className="label-text pr-4 pb-2">Start of leave*</Form.Label>
                    <InputGroup className="mb-2 mr-sm-2" id="startDate">
                        <InputGroup.Prepend>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faCalendarAlt} style={{color: "gray"}} className="d-inline" />
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="Pick a date" />
                    </InputGroup>
                    <Form.Text className="pl-2 pb-3" muted>
                        <FontAwesomeIcon icon={faInfoCircle} style={{color: "gray"}} className="d-inline mr-1"/> Must be 8-20 characters long.
                    </Form.Text>
                </Form.Group>
                </Form>
            </Modal.Body>

            <Message format="info" content="Choose the type of leave that you wish to add." />
            
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary">Save leave</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
};