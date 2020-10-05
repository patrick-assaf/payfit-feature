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

let leaves: any = {};
let annualDays = 28;

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

    const displayDate = (date: any) => {
        let year = date.slice(0, date.search("-"));
        let dateCut = date.slice(date.search("-")+1);
        let month = dateCut.slice(0, dateCut.search("-"));
        let day = dateCut.slice(dateCut.search("-")+1);
        let formatted_date =  day + "/" + month + "/" + year;
        return formatted_date;
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

    const checkOverlap = (date: any) => {
        let dateCut = date.slice(date.search("-")+1);
        let month = dateCut.slice(0, dateCut.search("-"));
        let day = dateCut.slice(dateCut.search("-")+1);

        let result = false;

        // eslint-disable-next-line
        Object.keys(leaves).map(function(leaveKey: any) {
            let endDate = leaves[leaveKey].end;
            let endDateCut = endDate.slice(endDate.search("-")+1);
            let endMonth = endDateCut.slice(0, endDateCut.search("-"));
            let endDay = endDateCut.slice(endDateCut.search("-")+1);

            let startDate = leaves[leaveKey].start;
            let startDateCut = startDate.slice(startDate.search("-")+1);
            let startMonth = startDateCut.slice(0, startDateCut.search("-"));
            let startDay = startDateCut.slice(startDateCut.search("-")+1);
            
            if(month === startMonth && month === endMonth) {
                if(parseInt(day) <= parseInt(endDay) && parseInt(day) >= parseInt(startDay)) {
                    result = true;
                }
            }
            if(month > startMonth && month === endMonth) {
                if(parseInt(day) <= parseInt(endDay)) {
                    result = true;
                }
            }
            if(month < endMonth && month === startMonth) {
                if(parseInt(day) >= parseInt(startDay)) {
                    result = true;
                } 
            }
        });

        return result;
    }

    const [show, setShow] = useState(false);
    const [formInput, updateFormInput] = useState({ id: 0, type: 'Paid Vacation', start: today, end: '', halfFirst: false, halfLast: false, daysTaken: 0 });
    const [errorState, handleError] = useState({ error: false, message: '' });
    const [submittedState, updateSubmitState] = useState(false);

    const handleClose = () => {
        updateFormInput({ id: formInput.id, type: 'Paid Vacation', start: today, end: '', halfFirst: false, halfLast: false, daysTaken: 0 });
        handleError({ error: false, message: '' });
        setShow(false);
    }

    const handleShow = () => {
        updateFormInput({ id: formInput.id, type: 'Paid Vacation', start: today, end: '', halfFirst: false, halfLast: false, daysTaken: 0 });
        updateSubmitState(false);
        setShow(true);
    }

    const changeType = (event: any) => {
        let leaveType = event.target.value;
        updateFormInput({ id: formInput.id, type: leaveType, start: formInput.start, end: formInput.end, halfFirst: formInput.halfFirst, halfLast: formInput.halfLast, daysTaken: formInput.daysTaken });
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

        if(checkOverlap(startDate)) {
            event.target.value = '';
            handleError({ error: true, message: 'You have already added a leave on this date.' }); 
        }
        else if(endDate && ((endYear <= startYear && endMonth < startMonth) || (endMonth <= startMonth && endDay < startDay))) {
            event.target.value = '';
            updateFormInput({ id: formInput.id, type: formInput.type, start: '', end: formInput.end, halfFirst: formInput.halfFirst, halfLast: formInput.halfLast, daysTaken: formInput.daysTaken });
            handleError({ error: true, message: 'You must choose an end date that is later than the start date.' });
        }
        else {
            handleError({ error: false, message: '' });
            let days = endDate ? remove_weekend(startDate, endDate) : formInput.daysTaken;
            if(days > annualDays) {
                event.target.value = '';
                let errorMessage = "You cannot add a leave that exceeds " + annualDays + " days.";
                handleError({ error: true, message: errorMessage }); 
            }
            updateFormInput({ id: formInput.id, type: formInput.type, start: startDate, end: formInput.end, halfFirst: formInput.halfFirst, halfLast: formInput.halfLast, daysTaken: days });
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

        if(checkOverlap(endDate) || checkOverlap(startDate)) {
            event.target.value = '';
            handleError({ error: true, message: 'You have already added a leave on this date.' }); 
        }
        else if((endYear <= startYear && endMonth < startMonth) || (endMonth <= startMonth && endDay < startDay)) {
            event.target.value = '';
            handleError({ error: true, message: 'You must choose an end date that is later than the start date.' });
        }
        else {
            handleError({ error: false, message: '' });
            let days = startDate ? remove_weekend(startDate, endDate) : formInput.daysTaken;
            if(days > annualDays) {
                event.target.value = '';
                let errorMessage = "You cannot add a leave that exceeds " + annualDays + " days.";
                handleError({ error: true, message: errorMessage }); 
            }
            updateFormInput({ id: formInput.id, type: formInput.type, start: formInput.start, end: endDate, halfFirst: formInput.halfFirst, halfLast: formInput.halfLast, daysTaken: days });
        }
    }

    const changeFirstHalf = (event: any) => {
        let firstDay = formInput.start;
        let lastDay = formInput.end;
        let halfDay = !formInput.halfFirst;
        let days = formInput.daysTaken;

        if(halfDay && !is_weekend(firstDay)) {
            days = days - 0.5;
        }
        else {
            days = (firstDay && lastDay) ? remove_weekend(firstDay, lastDay) : days;
        }

        updateFormInput({ id: formInput.id, type: formInput.type, start: formInput.start, end: formInput.end, halfFirst: halfDay, halfLast: formInput.halfLast, daysTaken: days });
    }

    const changeLastHalf = (event: any) => {
        let firstDay = formInput.start;
        let lastDay = formInput.end;
        let halfDay = !formInput.halfLast;
        let days = formInput.daysTaken;

        if(halfDay && !is_weekend(lastDay)) {
            days = days - 0.5;
        }
        else {
            days = (firstDay && lastDay) ? remove_weekend(firstDay, lastDay) : days;
        }

        updateFormInput({ id: formInput.id, type: formInput.type, start: formInput.start, end: formInput.end, halfFirst: formInput.halfFirst, halfLast: halfDay, daysTaken: days });
    }

    const formSubmission = (event: any) => {
        event.preventDefault();
        updateSubmitState(true);
        setShow(false);
        let index = formInput.id; 
        leaves[index] = formInput;
        if(formInput.type === "Paid Vacation") {
            annualDays = annualDays - formInput.daysTaken;
        }
        updateFormInput({ id: formInput.id+1, type: formInput.type, start: formInput.start, end: formInput.end, halfFirst: formInput.halfFirst, halfLast: formInput.halfLast, daysTaken: formInput.daysTaken });
    }

    return (
        <>
        <div className="feature-box shadow">
            <p className="feature-title">
                October 2020 - Annual Leave
            </p>
            <HeaderBar daysLeft={annualDays} leaves={leaves} />
            <LeaveTable leaves={leaves} />
            <div className="d-flex">
                <Button onClick={handleShow} variant="primary" className="ml-auto feature-button pt-2 pb-2 mb-3"><span className="pr-2">+</span> Add annual leave</Button>
            </div>
            <Message format="info" content="Your annual leave runs from 01/01/2020 to 31/12/2020." />
            { 
                submittedState &&
                <Message format="success" content={"You successfully added a new leave from " + displayDate(formInput.start) + " to " + displayDate(formInput.end) + "."} />
            }

            {
                (annualDays <= 5 && annualDays !== 0) &&
                <Message format="warning" content={"You only have " + annualDays + " annual leave days left for this year."} />
            }

            {
                annualDays === 0 &&
                <Message format="warning" content={"You have used all of you annual leave days for this year."} />
            }

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

            <Message format="info" content="Only Paid Vacations will be deducted from your 28 annual leave days." />

            {
                errorState.error &&
                <Message format="warning" content={errorState.message} /> 
            }

            {
                (formInput.halfFirst && formInput.start) &&
                <Message format="info" content={"You are taking half of the first leave day off on " + displayDate(formInput.start) + "."}/>  
            }

            {
                (formInput.halfLast && formInput.end) &&
                <Message format="info" content={"You are taking half of the last leave day off on " + displayDate(formInput.end) + "."}/>  
            }

            {
                (!errorState.error && formInput.start && formInput.end) &&
                <Message format="info" content={"You are adding a leave for " + formInput.type + " starting on " + displayDate(formInput.start) + " and ending on " + displayDate(formInput.end) + " for a total of " + formInput.daysTaken + " leave days."} /> 
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