import { fetchCharacterById } from '@/lib/dal/character';
import { Character } from '@/shared/types/types';
import Image from 'next/image';
import Link from 'next/link';

export default async function CharacterPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const character: Character = await fetchCharacterById(id);

  const capNumber = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  return (
    <>
      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        {/* 🔙 Botón volver con fade */}
        <div className="mx-auto animate-fade-in animate-duration-[600ms] animate-ease-out">
          <Link
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-6"
            href="/"
          >
            <svg
              fill="currentColor"
              height="16"
              viewBox="0 0 256 256"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-85.66a8,8,0,0,1-11.32,0L136,104.69V160a8,8,0,0,1-16,0V104.69L94.34,130.34a8,8,0,0,1-11.32-11.32l40-40a8,8,0,0,1,11.32,0l40,40A8,8,0,0,1,173.66,130.34Z"
                transform="rotate(270 128 128)"
              ></path>
            </svg>
            Back to all characters
          </Link>
        </div>

        {/* 🧍Card personaje */}
        <div className="bg-background-light dark:bg-background-dark shadow-lg rounded-xl overflow-hidden mx-auto animate-fade-in animate-slide-up animate-duration-[800ms] animate-ease-out animate-delay-[200ms]">
          <div className="md:flex">
            <div className="md:flex-shrink-0 animate-zoom-in animate-duration-[700ms] animate-delay-[100ms]">
              <div className="h-64 w-full md:h-full md:w-64">
                <Image
                  alt={character.name}
                  className="object-cover h-full w-full"
                  src={character.image}
                  height={256}
                  width={256}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>

            {/* 🧾 Info personaje */}
            <div className="p-8 flex-1 animate-slide-up animate-fade-in animate-duration-[800ms] animate-delay-[300ms]">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {character.name}
              </h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {[
                  ['Estado', character.status],
                  ['Especie', character.species],
                  ['Tipo', character.type || 'Indefinido'],
                  ['Género', character.gender],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className={`flex items-center animate-fade-in animate-slide-up animate-delay-[${400 + i * 100}ms]`}
                  >
                    <p className="w-28 font-semibold text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="text-gray-800 dark:text-gray-200">{value}</p>
                  </div>
                ))}

                <div className="sm:col-span-2 animate-fade-in animate-delay-[900ms]">
                  <p className="font-semibold text-gray-500 dark:text-gray-400">Origen</p>
                  <a className="text-primary hover:underline">{character.origin.name}</a>
                </div>
                <div className="sm:col-span-2 animate-fade-in animate-delay-[1000ms]">
                  <p className="font-semibold text-gray-500 dark:text-gray-400">
                    Última ubicación conocida
                  </p>
                  <a className="text-primary hover:underline">{character.location.name}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🎬 Episodios */}
        <div className="mt-12 animate-fade-in animate-slide-up animate-delay-[600ms]">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Episodios</h3>
          {character.episode.length === 0 ? (
            <p className="text-gray-800 dark:text-gray-200">No hay episodios disponibles.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {character.episode.map((ep, index) => (
                <div
                  key={index}
                  className={`animate-fade-in animate-slide-up animate-delay-[${700 + index * 100}ms]`}
                >
                  <a
                    className="bg-background-light dark:bg-background-dark shadow rounded-lg p-4 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow duration-300"
                    href={ep}
                    target="_blank"
                  >
                    <span className="text-primary text-2xl font-bold">{capNumber(ep)}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Episodio {capNumber(ep)}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
