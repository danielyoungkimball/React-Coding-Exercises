import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Fetch error", error));
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="App">
      <button onClick={fetchData}>Refresh</button>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
    </div>
  );
}

export default App;
