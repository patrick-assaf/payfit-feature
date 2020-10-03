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
    const [formInput, updateFormInput] = useState({ type: '1', start: '', end: '', halfFirst: false, halfLast: false })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changeType = (event: any) => {
        console.log(event.target.value);
    }

    const changeStart = (event: any) => {
        console.log(event.target.value);
    }

    const changeEnd = (event: any) => {
        console.log(event.target.value);
    }

    const changeFirstHalf = (event: any) => {
        console.log(event.target.value);
    }

    const changeLastHalf = (event: any) => {
        console.log(event.target.value);
    }

    const formSubmission = () => {
        console.log("Form Submitted");
    }

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

            <Form onSubmit={formSubmission}>
            <Modal.Body className="pt-4 pb-4">
                <Form.Row className="d-flex justify-content-center">
                <Form.Group className="w-100 modal-row"> 
                    <Form.Label className="label-text" htmlFor="leaveType">Leave Type*</Form.Label>
                    <Form.Control
                        required 
                        name="leaveType" 
                        as="select" 
                        className="mr-sm-2 mb-1" 
                        id="leaveType" 
                        custom 
                        placeholder="Choose a type of leave..." 
                        size="sm"
                        onChange={changeType}
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
                    <Form.Text muted>
                        <FontAwesomeIcon icon={faInfoCircle} style={{color: "gray"}} className="d-inline mr-2"/> Choose the type of leave that you wish to add.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="w-100 modal-row">
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
                            id="startDate"
                            name="startDate"
                            size="sm"
                            onChange={changeStart}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="w-100 modal-row">
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
                            id="endDate"
                            name="endDate"
                            size="sm"
                            onChange={changeEnd}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Check 
                    type="switch"
                    id="firstDayHalf"
                    name="firstDayHalf"
                    label="Part of first leave day off"
                    className="label-text pb-2 pt-2 pr-4 pl-4 mr-4 ml-4"
                    onChange={changeFirstHalf}
                />
                <Form.Check 
                    type="switch"
                    id="lastDayHalf"
                    name="lastDayHalf"
                    label="Part of last leave day off"
                    className="label-text pb-2 pt-2 pr-4 pl-4 mr-4 ml-4"
                    onChange={changeLastHalf}
                />
                </Form.Row>
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