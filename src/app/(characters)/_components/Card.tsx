'use client'

import { NextPage } from 'next'
import Image from 'next/image'
import { Character } from '@/shared/types/types';
import { useRouter } from 'next/navigation';

interface Cardscharacter {
  characters: Character[];
}

const Cards: NextPage<Cardscharacter> = ({ characters }) => {
  const router = useRouter();

  const handleCardClick = (id: number) => {
    router.push(`/character/${id}`);
  };


  const formattedTime = (createdDate: string) => {
    const date = new Date(createdDate);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      {characters.map(character => (
        <div
          key={character.id}
          className="group cursor-pointer rounded-lg bg-white shadow-md transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl dark:bg-gray-800 min-h-[320px]"
          onClick={() => handleCardClick(character.id)}
          suppressHydrationWarning
        >

          <div className="relative overflow-hidden rounded-t-lg" suppressHydrationWarning>
            <Image
              className="aspect-[1/1] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={character.image}
              width={500}
              height={500}
              alt={character.name}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Overlay para oscurecer */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" suppressHydrationWarning></div>
            <div className="absolute bottom-0 left-0 p-3" suppressHydrationWarning>
              <h3 className="text-lg font-bold text-white">{character.name}</h3>
            </div>
          </div>

          {/* Información */}
          <div className="space-y-3 p-4" suppressHydrationWarning>
            <div className="flex items-center gap-2 text-sm" suppressHydrationWarning>
              {character.status === 'Alive' && (
                <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
              )}
              {character.status === 'Dead' && (
                <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
              )}
              {character.status === 'unknown' && (
                <span className="h-2.5 w-2.5 rounded-full bg-gray-500"></span>
              )}
              <p className="text-gray-600 dark:text-gray-300">{character.status} - {character.species}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300" suppressHydrationWarning>
              <p>{character.gender}</p>
            </div>

            <div suppressHydrationWarning>
              <p className="text-xs text-gray-500 dark:text-gray-400">Origen:</p>
              <a className="text-sm text-primary hover:underline" href="#">{character.origin.name}</a>
            </div>

            <div suppressHydrationWarning>
              <p className="text-xs text-gray-500 dark:text-gray-400">Última ubicación:</p>
              <p className="text-sm text-gray-700 dark:text-gray-200">{character.location.name}</p>
            </div>

            <div suppressHydrationWarning>
              <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Episodios:</p>
              <div className="flex flex-wrap gap-1.5" suppressHydrationWarning>
                {character.episode.length > 0 && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary dark:bg-primary/20" suppressHydrationWarning>
                    Apareció en {character.episode.length} Episodios
                  </span>
                )}
              </div>
            </div>

            <p className="pt-2 text-right text-xs text-gray-400 dark:text-gray-500" suppressHydrationWarning>
              Creado: {formattedTime(character.created)}
            </p>
          </div>
        </div>
      ))}
    </>
  )
}

export default Cards
