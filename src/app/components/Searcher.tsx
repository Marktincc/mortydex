'use client'

import { NextPage } from 'next'
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props { }

const Searcher: NextPage<Props> = ({ }) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('name') || '');

  // Prueba de search on submit
  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const params = new URLSearchParams(searchParams.toString());
  //   if (query) {
  //     params.set('name', query);
  //     params.set('page', '1'); // Reset to the first page on new search
  //   } else {
  //     params.delete('name');
  //   }
  //   router.push(`/?${params.toString()}`);
  // }
useEffect(() => {
  const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set('name', query);
      params.set('page', '1'); // Reset to the first page on new search
    } else {
      params.delete('name');
    }
    router.push(`/?${params.toString()}`);
}, [query])

  return (
    // Para search on submit onSubmit={handleSearch} es un form
    <div  className='px-5 mb-6 mt-6'>
      <div className="relative">
        <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        </span>
        <input
          className="w-full rounded-lg outline-none border-primary/30 bg-background-light py-2.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-primary/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-background-dark dark:text-white dark:placeholder:text-gray-500" placeholder="Buscar personajes..." type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Searcher