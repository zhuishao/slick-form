import { useEffect, useRef, useState } from 'react';

export default ({
  max = 60,
  min = 0,
  time = 1000,
}: {
  max?: number;
  min?: number;
  time?: number;
}) => {
  const [count, setCount] = useState(max);
  const [flag, setFlag] = useState(true);
  const timeRef = useRef(null);

  const start = () => {
    setCount(count - 1);
    setFlag(true);
  };

  const stop = () => setFlag(false);

  const reset = () => {
    stop();
    setCount(max);
  };

  useEffect(() => {
    if (count > min && count !== max && flag) {
      timeRef.current = setTimeout(() => {
        setCount(count - 1);
      }, time);
    } else {
      clearTimeout(timeRef.current);
    }
    return () => clearTimeout(timeRef.current);
  }, [count, flag]);

  return {
    start,
    count,
    stop,
    reset,
  };
};
