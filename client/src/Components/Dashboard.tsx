import React from 'react';
import { Message } from './Message';
import { HeaderBar } from './HeaderBar';
import { LeaveTable } from './LeaveTable';
import Button from 'react-bootstrap/Button';

interface Props {

}

export const Dashboard: React.FC<Props> = () => {

    return (
        <div className="feature-box shadow">
            <p className="feature-title">
                October 2020 - Annual Leave
            </p>
            <HeaderBar taken={0} />
            <LeaveTable />
            <div className="d-flex">
                <Button variant="primary" className="ml-auto feature-button pt-2 pb-2 mb-3"><span className="pr-2">+</span> Add annual leave</Button>
            </div>
            <Message format="info" content="Your annual leave runs from 01/01/2020 to 31/12/2020." />
        </div>
    );
};