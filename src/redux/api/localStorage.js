
export const loadState = (stateKey) => {
    try {
        const serializedState = localStorage.getItem(stateKey);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (stateKey, stateValue) => {
    try {
        const serializedState = JSON.stringify(stateValue);
        localStorage.setItem(stateKey, serializedState);
    } catch {
        // ignore write errors
    }
};