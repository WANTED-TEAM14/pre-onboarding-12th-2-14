import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';

interface IntersectPropsType {
  loading: boolean;
  setPage: Dispatch<SetStateAction<number>>;
}

function useIntersect({ loading, setPage }: IntersectPropsType) {
  const targetRef = useRef<HTMLLIElement | null>(null);

  const loadMore = useCallback(() => {
    setPage(prev => prev + 1);
  }, [setPage]);

  const onIntersect = useCallback(
    (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting && targetRef.current) {
        targetRef.current = null;
        loadMore();
      }
    },
    [loadMore],
  );

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
  }, [loading, onIntersect]);

  return { targetRef };
}

export default useIntersect;
