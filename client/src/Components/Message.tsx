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
                <div className="message-text">
                    <span className="pr-3">
                        <FontAwesomeIcon icon={faInfoCircle} style={{color: "gray"}} size="lg" className="d-inline" />
                    </span>
                    <p className="d-inline">
                        {content}
                    </p>
                </div>
            </div> 
        );
    }
    if(format === "success") {
        return (
            <div className="message-box success">
                <div className="message-text">
                    <span className="pr-3">
                        <FontAwesomeIcon icon={faCheckCircle} style={{color: "#00c800b3"}} size="lg" className="d-inline" />
                    </span>
                    <p className="d-inline">
                        {content}
                    </p>
                </div>
            </div>
        );
    }
    if(format === "warning") {
        return (
            <div className="message-box warning">
                <div className="message-text">
                    <span className="pr-3">
                        <FontAwesomeIcon icon={faTimesCircle} style={{color: "#ff0000b3"}} size="lg" className="d-inline" />
                    </span>
                    <p className="d-inline">
                        {content}
                    </p>
                </div>
            </div>
        ); 
    }

    return (
        <></>
    )
};