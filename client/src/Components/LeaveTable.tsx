import React from 'react';
import '../Style.css';

interface Props {
    leaves: any
}

export const LeaveTable: React.FC<Props> = ({leaves}: Props) => {

    const colors: any = {
        "Paid Vacation": "#7C4FFF",
        "Unpaid Vacation": "#419488",
        "Paternity / Maternity / Adoption": "#4696EC",
        "Sick Child": "#CEDC3A",
        "Family Reasons": "#F7C244",
        "RTT": "#6E757B",
        "Remote Work": "#14284A",
        "Sick Leave": "#2A4494",
        "Occupational Disease": "#DDDDDD"
    }

    const fontColor: any = {
        "Paid Vacation": "white",
        "Unpaid Vacation": "white",
        "Paternity / Maternity / Adoption": "white",
        "Sick Child": "black",
        "Family Reasons": "black",
        "RTT": "white",
        "Remote Work": "white",
        "Sick Leave": "white",
        "Occupational Disease": "black" 
    }

    const displayDate = (date: any) => {
        let current_date = new Date(date);
        let current_month = current_date.getMonth()+1 < 10 ? "0" + (current_date.getMonth()+1) : (current_date.getMonth()+1);
        let formatted_date = current_month + "-" + date.substring(date.length-2) + "-" + current_date.getFullYear();
        return formatted_date;
    }

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
                <div className="col-sm header-title">
                    <div>Type</div>
                </div>
            </div>
            <hr></hr>
            {
                Object.keys(leaves).length === 0 &&
                <div className="text-center">
                    <p className="table-empty">No element</p>
                </div>
            }

            {
               Object.keys(leaves).length !== 0 && 
                <div>
                {
                    Object.keys(leaves).map(function(leaveKey: any){
                        return <div className="row leave-row" key={leaveKey}>
                            <div className="col-sm leave-text">
                                <div>{leaves[leaveKey].daysTaken}</div>
                            </div>
                            <div className="col-sm leave-text">
                                <div>{displayDate(leaves[leaveKey].start)}</div>
                            </div>
                            <div className="col-sm leave-text">
                                <div>{displayDate(leaves[leaveKey].end)}</div>
                            </div>
                            <div className="col-sm leave-text leave-type" style={{backgroundColor: colors[leaves[leaveKey].type], color: fontColor[leaves[leaveKey].type]}}>
                                <div>{leaves[leaveKey].type}</div>
                            </div>
                        </div>
                    })
                }
                </div>
            }
            
        </div>
    );
};