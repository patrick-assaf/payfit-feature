import React from 'react';
import '../Style.css';

interface Props {
    leaves: any,
    daysLeft: number
}

export const HeaderBar: React.FC<Props> = ({leaves, daysLeft}: Props) => {
    return (
        <div className="header-box row text-center shadow-sm">
            <div className="col-sm header-title">
                <div>Annual leave</div>
                <div><span style={{color:"limegreen"}}> + </span>28 days</div>
            </div>
            <div className="col-sm header-title">
                <div>Taken this month</div>
                <div>0 days</div>
            </div>
            <div className="col-sm header-title">
                <div><b>Remaining this year</b></div>
                <div><span style={{color:"limegreen"}}> + </span><b>{daysLeft} days</b></div>
            </div>
        </div>
    );
};