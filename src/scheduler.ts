import { Process, Status } from './types';

export const runFIFO = (processes: Process[]): Process[] => {
    let currentTime = 0;
    const result: Process[] = [];

    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    for (const process of processes) {
        while (currentTime < process.arrivalTime) {
            currentTime++;
            result.push({
                code: -1,
                arrivalTime: currentTime,
                executionTime: 0,
                remainingTime: 0,
                endTime: 0,
                deadline: 0,
                status: Status.NOT_READY
            });
        }
        process.status = Status.RUNNING;
        process.startTime = currentTime;
        process.endTime = currentTime + process.executionTime;
        for (let t = 0; t < process.executionTime; t++) {
            currentTime++;
            result.push({ ...process, endTime: currentTime });
        }
        process.status = Status.COMPLETE;
    }

    return result;
};

export const runSJF = (processes: Process[]): Process[] => {
    let currentTime = 0;
    const result: Process[] = [];
    const queue: Process[] = [];

    while (processes.length > 0 || queue.length > 0) {
        processes = processes.filter(process => {
            if (process.arrivalTime <= currentTime) {
                queue.push(process);
                return false;
            }
            return true;
        });

        if (queue.length === 0) {
            currentTime++;
            continue;
        }

        queue.sort((a, b) => a.executionTime - b.executionTime);

        const process = queue.shift()!;
        process.status = Status.RUNNING;
        process.startTime = currentTime;
        for (let t = 0; t < process.executionTime; t++) {
            currentTime++;
            result.push({ ...process, endTime: currentTime });
        }
        process.endTime = currentTime;
        process.status = Status.COMPLETE;
    }

    return result;
};

export const runRoundRobin = (processes: Process[], quantum: number, overhead: number): Process[] => {
    let currentTime = 0;
    const queue: Process[] = [];
    const result: Process[] = [];

    while (processes.length > 0 || queue.length > 0) {
        processes = processes.filter(process => {
            if (process.arrivalTime <= currentTime) {
                queue.push(process);
                return false;
            }
            return true;
        });

        if (queue.length === 0) {
            currentTime++;
            continue;
        }

        const process = queue.shift()!;
        process.status = Status.RUNNING;
        process.startTime = currentTime;
        const execTime = Math.min(quantum, process.remainingTime);
        for (let t = 0; t < execTime; t++) {
            currentTime++;
            process.remainingTime--;
            result.push({ ...process, endTime: currentTime });
        }
        process.endTime = currentTime;

        if (process.remainingTime > 0) {
            process.status = Status.READY;
            queue.push(process);
        } else {
            process.status = Status.COMPLETE;
        }

        currentTime += overhead;
    }

    return result;
};

export const runEDF = (processes: Process[], quantum: number, overhead: number): Process[] => {
    let currentTime = 0;
    const result: Process[] = [];
    const queue: Process[] = [];

    while (processes.length > 0 || queue.length > 0) {
        processes = processes.filter(process => {
            if (process.arrivalTime <= currentTime) {
                queue.push(process);
                return false;
            }
            return true;
        });

        if (queue.length === 0) {
            currentTime++;
            continue;
        }

        queue.sort((a, b) => a.deadline - b.deadline);

        const process = queue.shift()!;
        process.status = Status.RUNNING;
        process.startTime = currentTime;
        const execTime = Math.min(quantum, process.remainingTime);
        for (let t = 0; t < execTime; t++) {
            currentTime++;
            process.remainingTime--;
            result.push({ ...process, endTime: currentTime });
        }
        process.endTime = currentTime;

        if (process.remainingTime > 0) {
            process.status = Status.READY;
            queue.push(process);
        } else {
            process.status = Status.COMPLETE;
        }

        currentTime += overhead;
    }

    return result;
};
