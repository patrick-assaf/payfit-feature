import React from 'react';
import '../Style.css'

interface Props {
    format: string
    content: string
}

export const Message: React.FC<Props> = ({format, content}: Props) => {

    if(format === "info") {
        return (
            <div className="message-box info">
                <p className="message-text">
                    {content}
                </p>
            </div> 
        );
    }
    if(format === "success") {
        return (
            <div className="message-box success">
                <p className="message-text">
                    {content}
                </p>
            </div>
        );
    }
    if(format === "warning") {
        return (
            <div className="message-box warning">
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