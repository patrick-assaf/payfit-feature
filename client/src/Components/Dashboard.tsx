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

    const getTodaysDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        return yyyy + '-' + mm + '-' + dd;
    }

    const today = getTodaysDate();

    const is_weekend = (dateChecked: any) => {
        let date = new Date(dateChecked);
        if(date.getDay() === 5 || date.getDay() === 6) {
            return true;
        }
        else {
            return false;
        }
    }

    const remove_weekend = (start: any, end: any) => {
        let endDate = end;
        let endYear = endDate.slice(0, endDate.search("-"));
        let endDateCut = endDate.slice(endDate.search("-")+1);
        let endMonth = endDateCut.slice(0, endDateCut.search("-"));

        let startDate = start;
        let startYear = startDate.slice(0, startDate.search("-"));
        let startDateCut = startDate.slice(startDate.search("-")+1);
        let startMonth = startDateCut.slice(0, startDateCut.search("-"));
        let startDay = startDateCut.slice(startDateCut.search("-")+1);

        if(parseInt(startMonth) < parseInt(endMonth)) {
            let daysInMonth = new Date(startYear, startMonth, 0).getDate();

            let currentDate = startDate;
            let daysCount = parseInt(startDay);

            let days = 0;

            startDay = parseInt(startDay);

            while(daysCount <= daysInMonth) {
                if(!is_weekend(currentDate)) {
                    days += 1;
                }
                daysCount += 1;
                startDay += 1;
                let startDayPrint = startDay < 10 ? '0' + startDay : startDay;
                currentDate = startYear + "-" + startMonth + "-" + startDayPrint;
            }

            currentDate = endYear + "-" + endMonth + "-01";
            startDay = 1;

            while(currentDate !== endDate) {
                if(!is_weekend(currentDate)) {
                    days += 1;
                }
                startDay += 1;
                let startDayPrint = startDay < 10 ? '0' + startDay : startDay;
                currentDate = endYear + "-" + endMonth + "-" + startDayPrint;
            }
    
            if(!is_weekend(endDate)) {
                days += 1;
            }

            return days;
        }

        else {
            let currentDate = startDate;
            let days = 0;

            startDay = parseInt(startDay);

            while(currentDate !== endDate) {
                if(!is_weekend(currentDate)) {
                    days += 1;
                }
                startDay += 1;
                let startDayPrint = startDay < 10 ? '0' + startDay : startDay;
                currentDate = startYear + "-" + startMonth + "-" + startDayPrint;
            }

            if(!is_weekend(endDate)) {
                days += 1;
            }

            return days;
        }
    }

    const [show, setShow] = useState(false);
    const [formInput, updateFormInput] = useState({ type: 'Paid Vacation', start: today, end: '', halfFirst: false, halfLast: false, daysTaken: 0 });
    const [errorState, handleError] = useState({ error: false, message: '' });

    const handleClose = () => {
        updateFormInput({ type: 'Paid vacation', start: today, end: '', halfFirst: false, halfLast: false, daysTaken: 0 });
        handleError({ error: false, message: '' });
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const changeType = (event: any) => {
        let leaveType = event.target.value;
        updateFormInput({ type: leaveType, start: formInput.start, end: formInput.end, halfFirst: formInput.halfFirst, halfLast: formInput.halfLast, daysTaken: formInput.daysTaken });
    }

    const changeStart = (event: any) => {
        let startDate = event.target.value;
        let startYear = startDate.slice(0, startDate.search("-"));
        let startDateCut = startDate.slice(startDate.search("-")+1);
        let startMonth = startDateCut.slice(0, startDateCut.search("-"));
        let startDay = startDateCut.slice(startDateCut.search("-")+1);

        let endDate = formInput.end;
        let endYear = endDate.slice(0, endDate.search("-"));
        let endDateCut = endDate.slice(endDate.search("-")+1);
        let endMonth = endDateCut.slice(0, endDateCut.search("-"));
        let endDay = endDateCut.slice(endDateCut.search("-")+1);

        if(endDate && ((endYear <= startYear && endMonth < startMonth) || (endMonth <= startMonth && endDay <= startDay))) {
            event.target.value = '';
            updateFormInput({ type: formInput.type, start: '', end: formInput.end, halfFirst: formInput.halfFirst, halfLast: formInput.halfLast, daysTaken: formInput.daysTaken });
            handleError({ error: true, message: 'You must choose an end date that is later than the start date.' });
        }
        else {
            handleError({ error: false, message: '' });
            let days = endDate ? remove_weekend(startDate, endDate) : formInput.daysTaken;
            updateFormInput({ type: formInput.type, start: startDate, end: formInput.end, halfFirst: formInput.halfFirst, halfLast: formInput.halfLast, daysTaken: days });
        }
    }

    const changeEnd = (event: any) => {
        let endDate = event.target.value;
        let endYear = endDate.slice(0, endDate.search("-"));
        let endDateCut = endDate.slice(endDate.search("-")+1);
        let endMonth = endDateCut.slice(0, endDateCut.search("-"));
        let endDay = endDateCut.slice(endDateCut.search("-")+1);

        let startDate = formInput.start;
        let startYear = startDate.slice(0, startDate.search("-"));
        let startDateCut = startDate.slice(startDate.search("-")+1);
        let startMonth = startDateCut.slice(0, startDateCut.search("-"));
        let startDay = startDateCut.slice(startDateCut.search("-")+1);

        if((endYear <= startYear && endMonth < startMonth) || (endMonth <= startMonth && endDay <= startDay)) {
            event.target.value = '';
            handleError({ error: true, message: 'You must choose an end date that is later than the start date.' });
        }
        else {
            handleError({ error: false, message: '' });
            let days = startDate ? remove_weekend(startDate, endDate) : formInput.daysTaken;
            updateFormInput({ type: formInput.type, start: formInput.start, end: endDate, halfFirst: formInput.halfFirst, halfLast: formInput.halfLast, daysTaken: days });
        }
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
                        <option value="Paid Vacation">Paid Vacation</option>
                        <option value="Unpaid Vacation">Unpaid Vacation</option>
                        <option value="Paternity / Maternity / Adoption">Paternity / Maternity / Adoption</option>
                        <option value="Sick Child">Sick Child</option>
                        <option value="Family Reasons">Family Reasons</option>
                        <option value="RTT">RTT</option>
                        <option value="Remote Work">Remote Work</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Occupational Disease">Occupational Disease</option>
                    </Form.Control>
                    <Form.Text muted>
                        <FontAwesomeIcon icon={faInfoCircle} style={{color: "gray"}} className="d-inline mr-1"/> Choose the type of leave that you wish to add.
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
                            defaultValue={today}
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

            {
                errorState.error &&
                <Message format="warning" content={errorState.message} /> 
            }

            {
                !errorState.error && formInput.start && formInput.end &&
                <Message format="info" content={"You are adding a leave for " + formInput.type + " starting on " + formInput.start + " and ending on " + formInput.end + " for a total of " + formInput.daysTaken + " leave days."} /> 
            }

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