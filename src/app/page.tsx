import { fetchFilteredCharacters } from '@/app/api/characterapi';
import Header from './components/Header';
import Searcher from './components/Searcher';
import Filter from './components/Filter';
import CardList from './components/CardList';
import Pagination from './components/Pagination';
import { Suspense } from 'react';
import CardSkeletonList from './components/CardSkeletonList';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;


  const getParam = (param: string | string[] | undefined): string | undefined => {
    if (Array.isArray(param)) return param[0];
    return param || undefined;
  };

  const page = getParam(params.page) || '1';
  const name = getParam(params.name);
  const status = getParam(params.status);
  const species = getParam(params.species);
  const gender = getParam(params.gender);

  const data = await fetchFilteredCharacters(name, status, species, gender, undefined, page);

  return (
    <>
      <Header />
      <Searcher />
      <Filter />
      <Suspense fallback={<CardSkeletonList />}>
        {data.results.length > 0 ? (
          <CardList characters={data.results} />
        ) : (
          <div className="flex justify-center items-center p-8">
            <p className="text-xl text-gray-500">
              No se encontraron personajes con los filtros seleccionados
            </p>
          </div>
        )}
      </Suspense>
      {data.results.length > 0 && <Pagination info={data.info} />}
    </>
  );
}