import React, { useEffect, useState } from 'react';
import { useDebounce } from './hooks/useDebounce';
import {
    Container,
    TextField,
    Typography,
    Card,
    CardContent,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Alert,
    Box,
    Paper,
    InputAdornment,
    Chip,
    CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import './rickAndMorty.css';

interface Character {
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

export const RickAndMortyPage: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
    const [error, setError] = useState<string | null>(null);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        const fetchCharacters = async () => {
            setLoading(true);
            setError(null);
            try {
                const url = debouncedSearchTerm
                    ? `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(debouncedSearchTerm)}`
                    : 'https://rickandmortyapi.com/api/character/';

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('No se encontraron personajes');
                }

                const data = await response.json();
                setCharacters(data.results);
            } catch (error) {
                console.error('Error al cargar personajes:', error);
                setError(error instanceof Error ? error.message : 'Error al cargar personajes');
                setCharacters([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCharacters();
    }, [debouncedSearchTerm]);

    if (loading) {
        return <div>Cargando personajes...</div>;
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'alive':
                return 'success';
            case 'dead':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Container className="rick-morty-container">
            <Typography variant="h4" className="rick-morty-title">
                Personajes de Rick and Morty
            </Typography>

            <Paper className="search-container">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Buscar personaje..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    {loading && (
                        <Box className="loading-indicator">
                            <CircularProgress size={20} />
                            Buscando...
                        </Box>
                    )}
                </Box>
            </Paper>

            {error && (
                <Alert severity="error" className="error-message">
                    {error}
                </Alert>
            )}

            {!error && characters.length > 0 && (
                <Alert severity="info" className="info-message" icon={<InfoIcon />}>
                    Solo se muestran los primeros 20 resultados de la búsqueda
                </Alert>
            )}

            <Box className="characters-layout">
                {/* Lista de personajes */}
                <Card className="characters-list">
                    <CardContent>
                        <List>
                            {characters.map((character) => (
                                <ListItem
                                    key={character.id}
                                    onClick={() => setSelectedCharacter(character)}
                                    className={`character-item ${selectedCharacter?.id === character.id ? 'selected' : ''}`}
                                >
                                    <ListItemAvatar>
                                        <Avatar src={character.image} alt={character.name} className="character-avatar" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography className="character-name">{character.name}</Typography>}
                                        secondary={
                                            <Box className="character-status">
                                                <Chip label={character.status} color={getStatusColor(character.status) as any} size="small" />
                                                <Chip label={character.species} variant="outlined" size="small" />
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>

                {/* bloque detalles*/}
                <Card className="character-details">
                    <CardContent>
                        {selectedCharacter ? (
                            <Box>
                                <Box className="character-details-header">
                                    <Typography variant="h5" className="character-details-title">
                                        {selectedCharacter.name}
                                    </Typography>
                                    <Avatar src={selectedCharacter.image} alt={selectedCharacter.name} className="character-details-image" />
                                </Box>

                                <Box className="character-details-info">
                                    <Box className="character-details-item">
                                        <Typography className="character-details-label">Estado:</Typography>
                                        <Chip
                                            label={selectedCharacter.status}
                                            color={getStatusColor(selectedCharacter.status) as any}
                                            className={`status-${selectedCharacter.status.toLowerCase()}`}
                                        />
                                    </Box>
                                    <Box className="character-details-item">
                                        <Typography className="character-details-label">Especie:</Typography>
                                        <Typography className="character-details-value">{selectedCharacter.species}</Typography>
                                    </Box>
                                    <Box className="character-details-item">
                                        <Typography className="character-details-label">Género:</Typography>
                                        <Typography className="character-details-value">{selectedCharacter.gender}</Typography>
                                    </Box>
                                    <Box className="character-details-item">
                                        <Typography className="character-details-label">Origen:</Typography>
                                        <Typography className="character-details-value">{selectedCharacter.origin.name}</Typography>
                                    </Box>
                                    <Box className="character-details-item">
                                        <Typography className="character-details-label">Ubicación:</Typography>
                                        <Typography className="character-details-value">{selectedCharacter.location.name}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ) : (
                            <Box className="empty-state">
                                <Typography variant="h6" gutterBottom>
                                    Selecciona un personaje
                                </Typography>
                                <Typography variant="body2">Haz clic en un personaje de la lista para ver sus detalles</Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};
