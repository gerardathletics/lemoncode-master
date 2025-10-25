import React, { useEffect, useMemo, useState } from 'react';

interface Character {
    id: number;
    name: string;
    image: string;
}

export const RickAndMortyPage: React.FC = () => {
    const [allCharacters, setAllCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch('https://rickandmortyapi.com/api/character');
                const data = await response.json();
                setAllCharacters(data.results);
            } catch (error) {
                console.error('Error fetching characters:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCharacters();
    }, []);

    // filtramos los personajes cuando el usuario escribe en el input (sin usar useEffect)
    const filteredCharacters = useMemo(() => {
        if (searchTerm === '') {
            return allCharacters;
        }
        return allCharacters.filter((character) => character.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [allCharacters, searchTerm]);

    if (loading) {
        return <div>Cargando personajes...</div>;
    }

    return (
        <div>
            <h1>Personajes de Rick and Morty</h1>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Buscar personaje..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: '8px', width: '300px' }}
                />
            </div>
            <div>
                {filteredCharacters.map((character) => (
                    <div key={character.id}>
                        <img src={character.image} alt={character.name} width="50" height="50" />
                        <span>{character.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
