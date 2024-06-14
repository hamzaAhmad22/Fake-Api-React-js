import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState(null);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  // Function to simulate fetching all data
  const fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        // Simulate data change by adding a timestamp to the title
        const modifiedData = data.map(item => ({
          ...item,
          title: `${item.title} - ${new Date().toLocaleTimeString()}`
        }));
        setData(modifiedData);
      })
      .catch(error => setError("Error fetching data: " + error.message));
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch single data based on query
  const fetchSingleData = () => {
    if (!query) {
      setError("Query cannot be empty");
      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Invalid ID');
        }
        return response.json();
      })
      .then(data => {
        // Simulate data change by adding a timestamp to the title
        const modifiedData = {
          ...data,
          title: `${data.title} - ${new Date().toLocaleTimeString()}`
        };
        setSingleData(modifiedData);
        setError('');
      })
      .catch(error => setError("Error fetching single data: " + error.message));
  };

  return (
    <div className="container">
      <h1>CUSTOMERS DATA</h1>
      {error && <p className="error">{error}</p>}
      <button onClick={fetchData} className="button">Reload Data</button>
      <ol className="data-list">
        {data.map(item => (
          <li key={item.id} className="data-item">{item.title}</li>
        ))}
      </ol>

      <h2>Fetch Single Data</h2>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Enter ID" 
        className="input"
      />
      <button onClick={fetchSingleData} className="button">Fetch Data</button>

      {singleData && (
        <div className="single-data">
          <h3>Single Data</h3>
          <p><strong>ID:</strong> {singleData.id}</p>
          <p><strong>Title:</strong> {singleData.title}</p>
          <p><strong>Body:</strong> {singleData.body}</p>
        </div>
      )}
    </div>
  );
};

export default App;
