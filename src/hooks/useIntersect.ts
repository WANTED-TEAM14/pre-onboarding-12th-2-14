import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

interface IntersectPropsType {
  loading: boolean;
  setPage: Dispatch<SetStateAction<number>>;
}

function useIntersect({ loading, setPage }: IntersectPropsType) {
  const targetRef = useRef<HTMLLIElement | null>(null);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const onIntersect = (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting && targetRef.current) {
      targetRef.current = null;
      loadMore();
    }
  };

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        onIntersect(entry);
      },
      { threshold: 0.5 },
    );

    if (targetRef.current) observer.observe(targetRef.current);

    return () => observer && observer.disconnect();
  }, [loading]);

  return { targetRef };
}

export default useIntersect;
