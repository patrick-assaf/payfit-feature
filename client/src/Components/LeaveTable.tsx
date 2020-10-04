import React from 'react';
import '../Style.css';

interface Props {
    leaves: any
}

export const LeaveTable: React.FC<Props> = ({leaves}: Props) => {
    return (
        <div className="table-box">
            <div className="row">
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
            <hr></hr>
            <div className="text-center">
                <p className="table-empty">No element</p>
            </div>
        </div>
    );
};