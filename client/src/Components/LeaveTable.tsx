import React from 'react';
import '../Style.css';

interface Props {

}

export const LeaveTable: React.FC<Props> = () => {
    return (
        <div className="header-box row text-left">
            <div className="col-sm header-title">
                <div>Days off</div>
            </div>
            <div className="col-sm header-title">
                <div>From</div>
            </div>
            <div className="col-sm header-title">
                <div>To</div>
            </div>
        </div>
    );
};