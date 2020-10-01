import React from 'react';
import { Message } from './Message';

interface Props {

}

export const Dashboard: React.FC<Props> = () => {
    return (
        <div className="feature-box">
            <p className="feature-title">
                Annual Leave
            </p>
            <Message />
        </div>
    );
};