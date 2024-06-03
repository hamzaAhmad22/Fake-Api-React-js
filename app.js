import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState(null);
  const [query, setQuery] = useState('');

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  // Fetch single data based on query
  const fetchSingleData = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${query}`);
      setSingleData(response.data);
    } catch (error) {
      console.error("Error fetching single data: ", error);
    }
  };

  return (
    <div>
      <h1>Fake API Data</h1>

      <h2>All Data</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>

      <h2>Fetch Single Data</h2>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Enter ID" 
      />
      <button onClick={fetchSingleData}>Fetch Data</button>

      {singleData && (
        <div>
          <h3>Single Data</h3>
          <p>ID: {singleData.id}</p>
          <p>Title: {singleData.title}</p>
          <p>Body: {singleData.body}</p>
        </div>
      )}
    </div>
  );
};

export default App;
