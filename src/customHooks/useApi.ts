import {useState, useCallback} from 'react';

type UseApiReturn<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (...args: any[]) => Promise<void>;
};

function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>,
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiFunction(...args);
        setData(response);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    },
    [apiFunction],
  );

  return {data, loading, error, fetchData};
}

export default useApi;
