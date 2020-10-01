import React from 'react';
import '../Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface Props {
    format: string
    content: string
}

export const Message: React.FC<Props> = ({format, content}: Props) => {

    if(format === "info") {
        return (
            <div className="message-box info">
                <FontAwesomeIcon icon={faInfoCircle} style={{color: "gray"}} size="lg" />
                <p className="message-text">
                    {content}
                </p>
            </div> 
        );
    }
    if(format === "success") {
        return (
            <div className="message-box success">
                <FontAwesomeIcon icon={faCheckCircle} style={{color: "#00c800b3"}} size="lg" />
                <p className="message-text">
                    {content}
                </p>
            </div>
        );
    }
    if(format === "warning") {
        return (
            <div className="message-box warning">
                <FontAwesomeIcon icon={faTimesCircle} style={{color: "#ff0000b3"}} size="lg" />
                <p className="message-text">
                    {content}
                </p>
            </div>
        ); 
    }

    return (
        <></>
    )
};