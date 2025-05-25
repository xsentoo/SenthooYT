import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => Promise<void>;
  threshold?: number;
}

export const useInfiniteScroll = ({
  loading,
  hasMore,
  onLoadMore,
  threshold = 200
}: UseInfiniteScrollProps): { observerRef: React.RefObject<HTMLDivElement> } => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading) {
        onLoadMore();
      }
    },
    [hasMore, loading, onLoadMore]
  );
  
  // Initialize the intersection observer
  useEffect(() => {
    if (observer) {
      observer.disconnect();
    }
    
    const options = {
      rootMargin: `0px 0px ${threshold}px 0px`,
    };
    
    const newObserver = new IntersectionObserver(handleObserver, options);
    setObserver(newObserver);
    
    return () => {
      if (newObserver) {
        newObserver.disconnect();
      }
    };
  }, [handleObserver, threshold, observer]);
  
  // Observe the target element
  useEffect(() => {
    const currentObserver = observer;
    const currentTarget = observerRef.current;
    
    if (currentTarget && currentObserver) {
      currentObserver.observe(currentTarget);
    }
    
    return () => {
      if (currentTarget && currentObserver) {
        currentObserver.unobserve(currentTarget);
      }
    };
  }, [observer, observerRef]);
  
  return { observerRef };
};