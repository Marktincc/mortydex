export const fetchCharacters = async (page: number) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  if (!res.ok) {
    throw new Error('Failed to fetch characters');
  }
  return res.json();
};

export const fetchCharacterById = async (id: string) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  if (!res.ok) {
    throw new Error('Failed to fetch character');
  }
  return res.json();
};

const baseUrl = 'https://rickandmortyapi.com/api';

export async function fetchFilteredCharacters(
  name?: string,
  status?: string,
  species?: string,
  gender?: string,
  type?: string,
  page?: string
) {
  const params = new URLSearchParams();

  if (name) params.append('name', name);
  if (status) params.append('status', status);
  if (species) params.append('species', species);
  if (gender) params.append('gender', gender);
  if (type) params.append('type', type);
  if (page) params.append('page', page);

  const url = `${baseUrl}/character/?${params.toString()}`;
  const res = await fetch(url);

  // Si la respuesta no es ok, devolvemos un objeto con resultados vacíos
  if (!res.ok) {
    return {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null
      },
      results: []
    };
  }

  return res.json();
}