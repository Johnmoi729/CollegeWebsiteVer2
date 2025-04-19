import { useEffect, useState } from "react";

// Simple cache implementation
const cache = new Map();

export function useDataFetching(fetchFn, key, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        // Check cache first
        if (cache.has(key)) {
          setData(cache.get(key));
          setLoading(false);
          return;
        }

        const result = await fetchFn();

        // Update cache and state only if component is still mounted
        if (isMounted) {
          cache.set(key, result);
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "An error occurred");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error, refetch: () => cache.delete(key) };
}
