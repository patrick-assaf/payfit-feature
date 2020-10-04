import React from 'react';
import '../Style.css';

interface Props {
    leaves: any,
    daysLeft: number
}

export const HeaderBar: React.FC<Props> = ({leaves, daysLeft}: Props) => {

    let daysThisMonth: any = 0;

    const is_weekend = (dateChecked: any) => {
        let date = new Date(dateChecked);
        if(date.getDay() === 5 || date.getDay() === 6) {
            return true;
        }
        else {
            return false;
        }
    }

    const monthDays = () => {
        let days = daysThisMonth;
        // eslint-disable-next-line
        Object.keys(leaves).map(function(leaveKey: any) {
            let endDate = leaves[leaveKey].end;
            let endDateCut = endDate.slice(endDate.search("-")+1);
            let endMonth = endDateCut.slice(0, endDateCut.search("-"));

            let startDate = leaves[leaveKey].start;
            let startDateCut = startDate.slice(startDate.search("-")+1);
            let startMonth = startDateCut.slice(0, startDateCut.search("-"));

            if((endMonth === 9 && startMonth === 9) && leaves[leaveKey].type === "Paid Vacation") {
                days += leaves[leaveKey].daysTaken;
            }
            else if((startMonth < 9 && endMonth === 9) && leaves[leaveKey].type === "Paid Vacation") {
                let end = leaves[leaveKey].end;
                let year = end.slice(0, end.search("-"));
                let dateCut = end.slice(end.search("-")+1);
                let month = dateCut.slice(0, dateCut.search("-"))

                let currentDate = year + "-" + month + "-01";
                let startDay = 1;

                while(currentDate !== end) {
                    if(!is_weekend(currentDate)) {
                        days += 1;
                    }
                    startDay += 1;
                    let startDayPrint = startDay < 10 ? '0' + startDay : startDay;
                    currentDate = year + "-" + month + "-" + startDayPrint;
                }

                if(!is_weekend(end)) {
                    days += 1;
                }
            }
            else if((startMonth === 9 && endMonth > 9) && leaves[leaveKey].type === "Paid Vacation") {                    
                let start = leaves[leaveKey].start;
                let year = start.slice(0, start.search("-"));
                let dateCut = start.slice(start.search("-")+1);
                let month = dateCut.slice(0, dateCut.search("-"));
                let startDay = dateCut.slice(dateCut.search("-")+1);

                let lastMonthDay = new Date(year, month, 0).getDate();

                let currentDate = start;
                let daysCount = parseInt(startDay);

                startDay = parseInt(startDay);

                while(daysCount <= lastMonthDay) {
                    if(!is_weekend(currentDate)) {
                        days += 1;
                    }
                    daysCount += 1;
                    startDay += 1;
                    let startDayPrint = startDay < 10 ? '0' + startDay : startDay;
                    currentDate = year + "-" + month + "-" + startDayPrint;
                }
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