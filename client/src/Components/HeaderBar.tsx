import React from 'react';
import '../Style.css';

interface Props {
    taken: number
}

export const HeaderBar: React.FC<Props> = ({taken}: Props) => {
    return (
        <div className="header-box row text-center">
            <div className="col-sm header-title">
                <div>Annual leave</div>
                <div><span style={{color:"#00c800b3"}}> + </span>28 days</div>
            </div>
            <div className="col-sm header-title">
                <div>Taken this month</div>
                <div>{taken} days</div>
            </div>
            <div className="col-sm header-title">
                <div><b>Remaining this year</b></div>
                <div><span style={{color:"#00c800b3"}}> + </span><b>{28-taken} days</b></div>
            </div>
        </div>
    );
};