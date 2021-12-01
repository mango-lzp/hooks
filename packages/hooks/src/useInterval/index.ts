import { useEffect } from 'react';
import useLatest from '../useLatest';

function useInterval(
  fn: () => void,
  delay: number | undefined,
  options?: {
    immediate?: boolean;
  },
) {
  const immediate = options?.immediate;

  const fnRef = useLatest(fn);

  useEffect(() => {
    if (typeof delay !== 'number' || delay <= 0) return;
    if (immediate) {
      fnRef.current();
    }
    const timer = setInterval(() => {
      fnRef.current();
    }, delay); // 依赖变更  函数重新执行时，会执行 return 里面的函数。 // 离开页面，dom卸载时，也会执行。
    return () => {
      clearInterval(timer);
    };
  }, [delay]);
}

export default useInterval;
