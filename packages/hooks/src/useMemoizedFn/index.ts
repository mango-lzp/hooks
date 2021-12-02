import { useMemo, useRef } from 'react';

type noop = (...args: any[]) => any;

function useMemoizedFn<T extends noop>(fn: T) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error(`useMemoizedFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  // ref 创建之后就不会后续变更了，只会返回最初创建的那个对象。{ current：initialVal }，
  // 利用该特性不会引起重复渲染，用一个ref来保存传入的fn， 同步维护ref.current
  // 再维护一个保持跟传入fn一致的函数返回。即不触发rerender也能拿到最新的fn
  const fnRef = useRef<T>(fn);
  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo(() => fn, [fn]);

  const memoizedFn = useRef<T>();
  if (!memoizedFn.current) {
    // 这里需要指定this的指向，不然this会默认指向fnRef
    memoizedFn.current = function (...args) {
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      return fnRef.current.apply(this, args);
    } as T;
  }

  return memoizedFn.current;
}

export default useMemoizedFn;
