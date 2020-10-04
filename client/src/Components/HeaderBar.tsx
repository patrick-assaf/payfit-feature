import React from 'react';
import '../Style.css';

interface Props {
    leaves: any,
    daysLeft: number
}

export const HeaderBar: React.FC<Props> = ({leaves, daysLeft}: Props) => {

    let daysThisMonth: any = 0;

    const monthDays = () => {
        let days = daysThisMonth;
        // eslint-disable-next-line
        Object.keys(leaves).map(function(leaveKey: any) {
            let endDate = new Date(leaves[leaveKey].end);
            let startDate = new Date(leaves[leaveKey].start);
            let endMonth = endDate.getMonth();
            let startMonth = startDate.getMonth();
            if((endMonth === 9 || startMonth === 9) && leaves[leaveKey].type === "Paid Vacation") {
                days += leaves[leaveKey].daysTaken;
            }
            else {
                days += 0;
            }
        });
        return days;
    }

    daysThisMonth = monthDays();

    return (
        <div className="header-box row text-center shadow-sm">
            <div className="col-sm header-title">
                <div>Annual leave</div>
                <div><span style={{color:"limegreen"}}> + </span>28 days</div>
            </div>
            <div className="col-sm header-title">
                <div>Taken this month</div>
                <div>{daysThisMonth} days</div>
            </div>
            <div className="col-sm header-title">
                <div><b>Remaining this year</b></div>
                <div><span style={{color:"limegreen"}}> + </span><b>{daysLeft} days</b></div>
            </div>
        </div>
    );
};