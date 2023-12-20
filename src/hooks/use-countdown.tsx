import { useEffect, useRef, useState } from 'react';

type CountdownProps = {
  time: number; // Seconds
  interval?: number; // Seconds
  trigger: boolean;
  disabled?: boolean;
};

export type CountdownType = {
  time: number;
  counting: boolean;
};

export function useCountdown({
  time = 30,
  interval = 1,
  trigger,
  disabled = false,
}: CountdownProps) {
  const [countdown, setCountdown] = useState<CountdownType>({
    time,
    counting: true,
  });
  const countDownInterval = useRef<any>(null);

  const reset = () => {
    clearInterval(countDownInterval.current);
    countDownInterval.current = null;
  };

  useEffect(() => {
    if (!disabled) {
      let timer = time;
      setCountdown({ time: timer, counting: true });
      countDownInterval.current = setInterval(() => {
        timer = timer - 1;
        if (timer <= 0) {
          timer = time;
          reset();
          setCountdown({ time: timer, counting: false });
        } else {
          setCountdown({ time: timer, counting: true });
        }
      }, interval * 1000);
    } else {
      setCountdown({ time: 30, counting: false });
    }
    return () => {
      reset();
    };
  }, [trigger]);

  return countdown;
}
