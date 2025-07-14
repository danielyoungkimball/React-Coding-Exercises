import { useCallback, useEffect, useMemo, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

function App() {
  const URI = "https://jsonplaceholder.typicode.com/todos/1";
  const { data, loading, refetch } = useFetch(URI);
  const memoizedData = useMemo(() => data, [data]);
  return (
    <div className="App">
      <button onClick={refetch}>Refresh</button>
      {loading ? "Loading..." : <pre>{JSON.stringify(memoizedData, null, 2)}</pre>}
    </div>
  );
}

export default App;
