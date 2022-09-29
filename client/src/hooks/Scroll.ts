import { useEffect, useState } from 'react';

export function useScrollTop() {
  const [top, setTop] = useState(0);

  const scrollListener = () => {
    const { top } = document.body.getBoundingClientRect();
    setTop(top);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  });
  return top;
}
