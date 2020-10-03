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
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="modal-title">
                <Modal.Title>Leaves</Modal.Title>
            </Modal.Header>

            <Form onSubmit={() => console.log("Form submitted.")}>
            <Modal.Body className="d-flex justify-content-center">
                <Form.Group className="pt-4 pr-4 pl-4"> 
                    <Form.Label className="label-text" htmlFor="leaveType">Leave Type*</Form.Label>
                    <Form.Control
                        required 
                        name="leaveType" 
                        as="select" 
                        className="mr-sm-2 mb-1" 
                        id="leaveType" 
                        custom 
                        placeholder="Choose a type of leave..." 
                    >
                        <option value="1">Paid vacation</option>
                        <option value="2">Unpaid vacation</option>
                        <option value="3">Paternity / Maternity / Adoption</option>
                        <option value="4">Sick child</option>
                        <option value="5">Family reasons</option>
                        <option value="6">RTT</option>
                        <option value="7">Remote work</option>
                        <option value="8">Sick leave</option>
                        <option value="9">Occupational disease</option>
                    </Form.Control>
                    <Form.Text className="pb-3" muted>
                        <FontAwesomeIcon icon={faInfoCircle} style={{color: "gray"}} className="d-inline mr-2"/> Choose the type of leave that you wish to add.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="pt-4 pr-4 pl-4">
                    <Form.Label htmlFor="startDate" className="label-text">Start of leave*</Form.Label>
                    <InputGroup className="mb-2 mr-sm-2" id="startDate">
                        <InputGroup.Prepend>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faCalendarAlt} style={{color: "gray"}} className="d-inline" />
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                            required
                            type="date"
                            placeholder="Pick a date"
                            name="startDate"
                        />
                    </InputGroup>
                    <Form.Text className="pb-3" muted>
                        <FontAwesomeIcon icon={faInfoCircle} style={{color: "gray"}} className="d-inline mr-2"/> This is a help message.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="pt-4 pr-4 pl-4">
                    <Form.Label htmlFor="endDate" className="label-text">End of leave*</Form.Label>
                    <InputGroup className="mb-2 mr-sm-2" id="endDate">
                        <InputGroup.Prepend>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faCalendarAlt} style={{color: "gray"}} className="d-inline" />
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                            required
                            type="date"
                            placeholder="Pick a date"
                            name="endDate"
                        />
                    </InputGroup>
                    <Form.Text className="pb-3" muted>
                        <FontAwesomeIcon icon={faInfoCircle} style={{color: "gray"}} className="d-inline mr-2"/> This is a help message.
                    </Form.Text>
                </Form.Group>
            </Modal.Body>

            <Message format="info" content="Only paid vacations will be deducted from your 28 annual leave days." />
            
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit">Save leave</Button>
            </Modal.Footer>
            </Form>
        </Modal>
        </>
    );
};