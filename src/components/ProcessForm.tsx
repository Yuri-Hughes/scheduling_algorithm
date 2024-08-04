import React, { useState } from 'react';
import { Process, Status } from '../types';

interface ProcessFormProps {
    addProcess: (process: Process) => void;
}

const ProcessForm: React.FC<ProcessFormProps> = ({ addProcess }) => {
    const [arrivalTime, setArrivalTime] = useState(0);
    const [executionTime, setExecutionTime] = useState(0);
    const [deadline, setDeadline] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProcess: Process = {
            code: Date.now(),
            arrivalTime,
            executionTime,
            remainingTime: executionTime,
            deadline,
            status: Status.NOT_READY
        };
        addProcess(newProcess);
        setArrivalTime(0);
        setExecutionTime(0);
        setDeadline(0);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Arrival Time: </label>
                <input type="number" value={arrivalTime} onChange={e => setArrivalTime(parseInt(e.target.value))} />
            </div>
            <div>
                <label>Execution Time: </label>
                <input type="number" value={executionTime} onChange={e => setExecutionTime(parseInt(e.target.value))} />
            </div>
            <div>
                <label>Deadline: </label>
                <input type="number" value={deadline} onChange={e => setDeadline(parseInt(e.target.value))} />
            </div>
            <button type="submit">Add Process</button>
        </form>
    );
};

export default ProcessForm;
