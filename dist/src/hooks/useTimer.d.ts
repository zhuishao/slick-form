declare const _default: ({ max, min, time, }: {
    max?: number;
    min?: number;
    time?: number;
}) => {
    start: () => void;
    count: number;
    stop: () => void;
    reset: () => void;
};
export default _default;
