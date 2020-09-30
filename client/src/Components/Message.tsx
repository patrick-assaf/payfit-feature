import React from 'react';
import '../Style.css'

interface Props {

}

export const Message: React.FC<Props> = () => {
    return (
        <div className="message-box">
            <p className="message-text">
                Message
            </p>
        </div>
    );
};