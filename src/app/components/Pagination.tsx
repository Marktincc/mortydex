'use client'

import { NextPage } from 'next'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
// import { useRouter } from 'next/router';
import { APIInfo } from '../types/types';

interface Props {
  info: APIInfo | null;
}

const Pagination: NextPage<Props> = ({ info }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get('page')) || 1;
 
  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/?${params.toString()}`);
  };


  const handleNext = () => {
    if (info && typeof info.pages === 'number' && page < info.pages) {
      updatePage(page + 1);
    }
  };
  const handlePrevious = () => {
    if (page > 1) {
      updatePage(page - 1);
    }
  };

  return (
    <div className="mt-8 flex items-center justify-center">
      <nav aria-label="Pagination" className="flex items-center space-x-2">
        <button onClick={handlePrevious} disabled={page <= 1} className="flex items-center justify-center rounded-md border border-primary/20 bg-background-light px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-primary/30 dark:bg-background-dark dark:text-gray-300 dark:hover:bg-gray-800" >
          {/* <span className="material-symbols-outlined text-base">chevron_left</span> */}
          <span className="ml-1">Anterior</span>
        </button>
        {info && (() => {
         
          let start = Math.max(1, page - 1);
          let end = Math.min(info.pages, page + 1);
          if (page === 1) end = Math.min(3, info.pages);
          if (page === info.pages) start = Math.max(1, info.pages - 2);
          return Array.from({ length: end - start + 1 }, (_, i) => {
            const num = start + i;
            return (
              <button
                key={num}
                aria-current={page === num ? "page" : undefined}
                className={
                  page === num
                    ? "flex h-8 w-8 items-center justify-center rounded-md border border-primary bg-primary text-sm font-medium text-white"
                    : "flex h-8 w-8 items-center justify-center rounded-md border border-primary/20 bg-background-light text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-primary/30 dark:bg-background-dark dark:text-gray-300 dark:hover:bg-gray-800"
                }
                onClick={() => updatePage(num)}
              >
                {num}
              </button>
            );
          });
        })()}
        <button
          className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/20 bg-background-light text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-primary/30 dark:bg-background-dark dark:text-gray-300 dark:hover:bg-gray-800"
          onClick={() => info && updatePage(info.pages)}
        >
          {info ? info.pages : '...'}
        </button>
        <button onClick={handleNext} disabled={!info || page >= info.pages} className="flex items-center justify-center rounded-md border border-primary/20 bg-background-light px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:border-primary/30 dark:bg-background-dark dark:text-gray-300 dark:hover:bg-gray-800">
          <span className="mr-1">Siguiente</span>
          <span className="material-symbols-outlined text-base"></span>
        </button>
      </nav>
    </div>
  );
}

export default Pagination