import React from 'react';
import { Process, Status } from '../types';

interface GanttChartProps {
    processes: Process[];
}

const GanttChart: React.FC<GanttChartProps> = ({ processes }) => {
    const maxEndTime = Math.max(...processes.map(p => p.endTime ?? 0), 0);

    return (
        <div style={{ position: 'relative', width: `${maxEndTime + 10}px`, height: '300px', border: '1px solid black', overflowX: 'scroll' }}>
            {processes.map((process) => (
                <div
                    key={process.code}
                    style={{
                        position: 'absolute',
                        top: `${process.code % 10 * 20}px`,  // To prevent overlap
                        left: `${process.startTime ?? 0}px`,
                        width: `${(process.endTime ?? 0) - (process.startTime ?? 0)}px`,
                        height: '15px',
                        backgroundColor: getColor(process.status),
                        color: 'white',
                        textAlign: 'center',
                        lineHeight: '15px',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {`P${process.code}`}
                </div>
            ))}
        </div>
    );
};

const getColor = (status: Status) => {
    switch (status) {
        case Status.RUNNING:
            return 'green';
        case Status.READY:
            return 'yellow';
        case Status.BLOCKED:
            return 'red';
        case Status.COMPLETE:
            return 'blue';
        default:
            return 'grey';
    }
};

export default GanttChart;
