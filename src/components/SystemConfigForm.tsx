import React, { useState } from 'react';

interface SystemConfigFormProps {
    setQuantum: (quantum: number) => void;
    setOverhead: (overhead: number) => void;
}

const SystemConfigForm: React.FC<SystemConfigFormProps> = ({ setQuantum, setOverhead }) => {
    const [localQuantum, setLocalQuantum] = useState(1);
    const [localOverhead, setLocalOverhead] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setQuantum(localQuantum);
        setOverhead(localOverhead);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Quantum: </label>
                <input type="number" value={localQuantum} onChange={e => setLocalQuantum(parseInt(e.target.value))} />
            </div>
            <div>
                <label>Overhead: </label>
                <input type="number" value={localOverhead} onChange={e => setLocalOverhead(parseInt(e.target.value))} />
            </div>
            <button type="submit">Set System Configuration</button>
        </form>
    );
};

export default SystemConfigForm;

