import { fetchCharacterById } from '@/app/api/characterapi';
import Header from '@/app/components/Header';
import { Character} from '@/app/types/types';
import Image from 'next/image';
import Link from 'next/link';

export default async function CharacterPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const character: Character = await fetchCharacterById(id);

  const capNumber = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  return (
    <>
      <Header />
      <div className='flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl'>
        <div className='mx-auto'>
          <Link className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-6" href="/">
            <svg fill="currentColor" height="16" viewBox="0 0 256 256" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-85.66a8,8,0,0,1-11.32,0L136,104.69V160a8,8,0,0,1-16,0V104.69L94.34,130.34a8,8,0,0,1-11.32-11.32l40-40a8,8,0,0,1,11.32,0l40,40A8,8,0,0,1,173.66,130.34Z" transform="rotate(270 128 128)"></path></svg>
            Back to all characters
          </Link>
        </div>
        <div className="bg-background-light dark:bg-background-dark shadow-lg rounded-xl overflow-hidden mx-auto">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image alt={character.name} className="h-64 w-full object-cover md:h-full md:w-64"
                src={character.image}
                height={256}
                width={256}
              />
            </div>
            <div className="p-8 flex-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{character.name}</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex items-center">
                  <p className="w-28 font-semibold text-gray-500 dark:text-gray-400">Estado</p>
                  <div className="flex items-center gap-2">
                    {character.status === 'Alive' && (
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                    )}{character.status === 'Dead' && (
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                    )}{character.status === 'unknown' && (
                      <span className="h-2.5 w-2.5 rounded-full bg-gray-500"></span>
                    )}
                    <p className="text-gray-800 dark:text-gray-200">{character.status}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="w-28 font-semibold text-gray-500 dark:text-gray-400">Especie</p>
                  <p className="text-gray-800 dark:text-gray-200">{character.species}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-28 font-semibold text-gray-500 dark:text-gray-400">Tipo</p>
                  <p className="text-gray-800 dark:text-gray-200">{character.type || 'Indefinido'}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-28 font-semibold text-gray-500 dark:text-gray-400">Género</p>
                  <p className="text-gray-800 dark:text-gray-200">{character.gender}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="font-semibold text-gray-500 dark:text-gray-400">Origen</p>
                  <a className="text-primary hover:underline">{character.origin.name}</a>
                </div>
                <div className="sm:col-span-2">
                  <p className="font-semibold text-gray-500 dark:text-gray-400">Última ubicación conocida</p>
                  <a className="text-primary hover:underline" >{character.location.name}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-12'>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Episodios</h3>
          {
            character.episode.length === 0 ? (
              <p className="text-gray-800 dark:text-gray-200">No hay episodios disponibles.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {character.episode.map((ep, index) => (
                  <div key={index}>
                    {/* <p className="text-gray-800 dark:text-gray-200">{ep}</p> */}
                    <a className="bg-background-light dark:bg-background-dark shadow rounded-lg p-4 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow duration-300" href={ep} target="_blank">
                      <span className="text-primary text-2xl font-bold">{capNumber(ep)}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">Episodio {capNumber(ep)}</span>
                    </a>
                  </div>
                ))}
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}
