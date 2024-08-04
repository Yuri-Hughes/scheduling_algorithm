export enum Status {
    NOT_READY = "Not Ready",
    READY = "Ready",
    RUNNING = "Running",
    BLOCKED = "Blocked",
    COMPLETE = "Complete"
}

export interface Process {
    code: number;
    arrivalTime: number;
    executionTime: number;
    remainingTime: number;
    startTime?: number;
    endTime?: number;
    deadline: number;
    status: Status;
    quantum?: number;
    overhead?: number;
}
