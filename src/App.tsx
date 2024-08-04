import React, { useState } from 'react';
import ProcessForm from './components/ProcessForm';
import GanttChart from './components/GanttChart';
import SystemConfigForm from './components/SystemConfigForm';
import { runFIFO, runSJF, runRoundRobin, runEDF } from './scheduler';
import { Process, Status } from './types';

const App: React.FC = () => {
    const [processes, setProcesses] = useState<Process[]>([]);
    const [quantum, setQuantum] = useState<number>(1);
    const [overhead, setOverhead] = useState<number>(0);
    const [algorithm, setAlgorithm] = useState<'FIFO' | 'SJF' | 'RR' | 'EDF'>('FIFO');
    const [scheduledProcesses, setScheduledProcesses] = useState<Process[]>([]);

    const addProcess = (process: Process) => {
        setProcesses(prev => [...prev, process]);
    };

    const scheduleProcesses = () => {
        let result: Process[] = [];
        switch (algorithm) {
            case 'FIFO':
                result = runFIFO(processes);
                break;
            case 'SJF':
                result = runSJF(processes);
                break;
            case 'RR':
                result = runRoundRobin(processes, quantum, overhead);
                break;
            case 'EDF':
                result = runEDF(processes, quantum, overhead);
                break;
        }
        setScheduledProcesses(result);
    };

    return (
        <div>
            <SystemConfigForm setQuantum={setQuantum} setOverhead={setOverhead} />
            <ProcessForm addProcess={addProcess} />
            <div>
                <label>Select Algorithm: </label>
                <select onChange={e => setAlgorithm(e.target.value as 'FIFO' | 'SJF' | 'RR' | 'EDF')} value={algorithm}>
                    <option value="FIFO">FIFO</option>
                    <option value="SJF">SJF</option>
                    <option value="RR">Round Robin</option>
                    <option value="EDF">EDF</option>
                </select>
                <button onClick={scheduleProcesses}>Run Scheduling</button>
            </div>
            <GanttChart processes={scheduledProcesses} />
        </div>
    );
};

export default App;
