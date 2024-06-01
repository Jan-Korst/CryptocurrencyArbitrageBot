import React, { useState, useEffect, useCallback } from 'react';

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      try {
        func(...args);
      } catch (error) {
        console.error('Error executing debounced function:', error);
      }
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const SearchComponent = ({ apiCall }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const debouncedApiCall = useCallback(
    debounce((searchQuery) => {
      try {
        apiCall(search"Query).catch(err => {
          console.error('API call failed:', err);
          setError('Failed to fetch data. Please try again.');
        });
      } catch (error) {
        console.error('Error with debounced API call:', error);
        setError('An unexpected error occurred.');
      }
    }, 500),
    [apiCall]
  );

  useEffect(() => {
    if (input.length) {
      debouncedApiCall(input);
    }
  }, [input, debouncedApiCall]);

  return (
    <>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search here..."
      />
      {error && <div className="error">{error}</div>}
    </>
  );
};

Promise.all([fetchResource1(), fetchResource2()])
  .then(([res1, res2]) => {
    // Process results
  })
  .catch((error) => {
    console.error('Failed to fetch resources:', error);
    // Implement error handling logic here, such as setting state to show error messages
  });

const cache = {};

function fetchWithCache(url) {
  if (cache[url]) {
    return Promise.resolve(cache[url]);
  }
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      cache[url] = data;
      return data;
    })
    .catch(error => {
      console.error('Fetch error:', error);
      throw error; // Rethrow after logging to allow further error handling up the chain
    });
}