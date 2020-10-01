import React, { useState } from 'react';
import { Message } from './Message';
import Button from 'react-bootstrap/Button';

interface Props {

}

export const Dashboard: React.FC<Props> = () => {

    const [month, setMonth] = useState("October");

    return (
        <div className="feature-box">
            <p className="feature-title">
                {month} 2020 - Annual Leave 
                    <Button variant="outline-primary" size="sm" className="ml-3" onClick={(e) => month === "October" ? setMonth("November") : setMonth("October")}>
                        Change Month
                    </Button>
            </p>
            <div className="d-flex">
                <Button variant="primary" className="ml-auto feature-button"><span className="pr-2">+</span> Add annual leave</Button>
            </div>
            <Message />
        </div>
    );
};