import { fetchFilteredCharacters } from '@/lib/dal/character';
import Searcher from './_components/Searcher';
import Filter from './_components/Filter';
import CardList from './_components/CardList';
import Pagination from './_components/Pagination';

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
      <div className='animate-fade-in'>
      <Searcher />
      <Filter />
      {data.results.length > 0 ? (
        <CardList characters={data.results} />
      ) : (
        <div className="flex justify-center items-center p-8">
          <p className="text-xl text-gray-500">
            No se encontraron personajes con los filtros seleccionados
          </p>
        </div>
      )}
      {data.results.length > 0 && <Pagination info={data.info} />}
      </div>
    </>
  );
}