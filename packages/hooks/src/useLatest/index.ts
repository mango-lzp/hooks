import { useRef } from 'react';

// 过时闭包可以通过函数关闭变量闭包。函数赋值等方式更新闭包。
// 设置对象引用不会有过时闭包问题
function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

export default useLatest;
