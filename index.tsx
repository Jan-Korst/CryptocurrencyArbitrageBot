import React, { useState, useEffect } from 'react';

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const SearchComponent = ({ apiCall }) => {
  const [input, setInput] = useState('');

  const debouncedApiCall = useCallback(
    debounce((searchQuery) => {
      apiCall(searchQuery);
    }, 500),
    []
  );

  useEffect(() => {
    if (input.length) {
      debouncedApiCall(input);
    }
  }, [input, debouncedApiCall]);

  return (
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Search here..."
    />
  );
};
```

```typescript
Promise.all([fetchResource1(), fetchResource2()])
  .then(([res1, res2]) => {
  })
  .catch((error) => {
  });
```

```typescript
const cache = {};

function fetchWithCache(url) {
  if (cache[url]) {
    return Promise.resolve(cache[url]);
  }
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      cache[url] = data;
      return data;
    });
}