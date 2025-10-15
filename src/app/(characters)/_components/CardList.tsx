import { Character } from '@/shared/types/types';
import Cards from './Card';

interface Props {
  characters: Character[];
}

export default function CardList({ characters }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-5">
      <Cards characters={characters} />
    </div>
  );
}
