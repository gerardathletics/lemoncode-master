const BASE_URL = 'https://rickandmortyapi.com/api';

export interface Character {
    id: number;
    name: string;
    image: string;
    status: string;
    species: string;
    gender: string;
    origin: {
        name: string;
    };
    location: {
        name: string;
    };
}

interface CharactersResponse {
    results: Character[];
}

export const getCharacters = async (searchTerm?: string): Promise<Character[]> => {
    const url = searchTerm
        ? `${BASE_URL}/character/?name=${encodeURIComponent(searchTerm)}`
        : `${BASE_URL}/character/`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('No se encontraron personajes');
    }

    const data: CharactersResponse = await response.json();
    return data.results;
};
