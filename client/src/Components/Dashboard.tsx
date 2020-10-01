import React from 'react';
import { Message } from './Message';
import Button from 'react-bootstrap/Button';

interface Props {

}

export const Dashboard: React.FC<Props> = () => {

    return (
        <div className="feature-box">
            <p className="feature-title">
                October 2020 - Annual Leave
            </p>
            <div className="d-flex">
                <Button variant="primary" className="ml-auto feature-button"><span className="pr-2">+</span> Add annual leave</Button>
            </div>
            <Message format="warning" content="This is an informational message" />
        </div>
    );
};