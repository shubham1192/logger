import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logger from './logger';
import './App.css';
 
function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
 
    const fetchData = async () => {
        logger.log('Button clicked');
        setLoading(true);
        setError(null);
 
        try {
            logger.log('Requesting data from API');
const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
            logger.log('Data fetched successfully');
            setData(response.data);
        } catch (error) {
            logger.error('Data fetch failed');
            setError(error);
        } finally {
            setLoading(false);
        }
    };
 
    useEffect(() => {
        if (data) {
            logger.log('Data state updated');
        }
    }, [data]);
 
    useEffect(() => {
        if (error) {
            logger.error('Error state updated');
        }
    }, [error]);
 
    return (
        <div className="App">
            <h1>React Logger App</h1>
            <button onClick={fetchData} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Data'}
            </button>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
}
 
export default App;