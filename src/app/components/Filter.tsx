'use client'

import { NextPage } from 'next'
import { useSearchParams, useRouter } from 'next/navigation';


interface Props { }

const Filter: NextPage<Props> = ({ }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
      params.set('page', '1');
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-4 px-5 mb-6">
      <select
        className="rounded px-3 border-primary/30 bg-background-light text-sm text-gray-900 ring-1 ring-inset ring-primary/20 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-background-dark dark:text-white h-8"
        onChange={(e) => handleChange('status', e.target.value)}
        defaultValue={searchParams.get('status') || 'all'}>
        <option value='all'>Estado</option>
        <option value='alive'>Vivo</option>
        <option value='dead'>Muerto</option>
        <option value='unknown'>Desconocido</option>
      </select>
      <select
        className="rounded px-3 border-primary/30 bg-background-light text-sm text-gray-900 ring-1 ring-inset ring-primary/20 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-background-dark dark:text-white h-8"
        onChange={(e) => handleChange('species', e.target.value)}
        defaultValue={searchParams.get('species') || 'all'}>
        <option value='all'>Especie</option>
        <option value='human'>Humano</option>
        <option value='alien'>Alien</option>
      </select>
      <select
        className="rounded px-3 border-primary/30 bg-background-light text-sm text-gray-900 ring-1 ring-inset ring-primary/20 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-background-dark dark:text-white h-8"
        onChange={(e) => handleChange('gender', e.target.value)}
        defaultValue={searchParams.get('gender') || 'all'}>
        <option value='all'>Género</option>
        <option value='male'>Masculino</option>
        <option value='female'>Femenino</option>
        <option value='genderless'>Sin género</option>
        <option value='unknown'>Desconocido</option>
      </select>
    </div>)
}

export default Filter