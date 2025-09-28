
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

export const fetchFilteredCharacters = async (
  name?: string, 
  status?: string, 
  species?: string, 
  gender?: string,  
  type?: string, 
  page?: string
) => {
  const query = new URLSearchParams();
  
  if (name) query.append('name', name);
  if (status) query.append('status', status);
  if (species) query.append('species', species);
  if (gender) query.append('gender', gender);
  if (type) query.append('type', type);
  if (page) query.append('page', page); 
  
  
  const res = await fetch(`https://rickandmortyapi.com/api/character/?${query.toString()}`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  }); 
  
  if (!res.ok) {
    throw new Error('Failed to fetch filtered characters');
  }
  
  return res.json();
}