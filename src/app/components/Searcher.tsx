'use client'

import { NextPage } from 'next'
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props { }

const Searcher: NextPage<Props> = ({ }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('name') || '');
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [lastQuery, setLastQuery] = useState(query);
  const [isLoading, setIsLoading] = useState(false);

  // Efecto para el debounce
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      if (query !== lastQuery) {
        setDebouncedQuery(query);
      }
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      setIsLoading(false);
    };
  }, [query, lastQuery]);

  useEffect(() => {
    
    if (debouncedQuery === lastQuery) return;

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) {
      params.set('name', debouncedQuery);
      params.set('page', '1');
    } else {
      params.delete('name');
    }
    router.push(`/?${params.toString()}`);
    setLastQuery(debouncedQuery);
  }, [debouncedQuery, searchParams, router, lastQuery]);

  return (
    // Para search on submit onSubmit={handleSearch} es un form
    <div className='px-5 mb-6 mt-6'>
      <div className="relative">
        <span className={`material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isLoading ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            className={`bi bi-search ${isLoading ? 'animate-pulse' : ''}`} viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </span>
        <input
          className={`w-full rounded-lg outline-none border-primary/30 bg-background-light py-2.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ${isLoading ? 'ring-primary' : 'ring-primary/20'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-background-dark dark:text-white dark:placeholder:text-gray-500`}
          placeholder="Buscar personajes..."
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Searcher