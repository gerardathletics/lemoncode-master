import React from 'react';
import { Link } from 'react-router-dom';
import { MemberEntity, getOrganizationMembers } from './api/githubApi';
import { useOrganization } from './context/OrganizationContext';
import {
    Container,
    TextField,
    Button,
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';

export const ListPage: React.FC = () => {
    const { organization, setOrganization } = useOrganization();
    const [members, setMembers] = React.useState<MemberEntity[]>([]);
    const [organizationInput, setOrganizationInput] = React.useState(organization);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const members = await getOrganizationMembers(organizationInput);
            setOrganization(organizationInput);
            setMembers(members);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al buscar organización');
            setMembers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    React.useEffect(() => {
        const loadMembers = async () => {
            setLoading(true);
            try {
                const members = await getOrganizationMembers(organization);
                setMembers(members);
            } catch (err) {
                console.error('Error al cargar miembros:', err);
            } finally {
                setLoading(false);
            }
        };
        loadMembers();
    }, [organization]);

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontWeight: 600,
                    }}
                >
                    <GitHubIcon fontSize="large" />
                    Miembros de la organización en Github
                </Typography>
                <Link to="/rickandmorty">Ir a Rick and Morty</Link>
            </Box>

            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={organizationInput}
                        onChange={(e) => setOrganizationInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Buscar organización..."
                        label="Organización"
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
                    <Button variant="contained" onClick={handleSearch} disabled={loading} sx={{ minWidth: 120, height: 56 }}>
                        {loading ? 'Buscando...' : 'Buscar'}
                    </Button>
                </Box>
            </Paper>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {members.length > 0 && (
                <Card elevation={3}>
                    <CardContent sx={{ p: 0 }}>
                        <List sx={{ width: '100%' }}>
                            {members.map((member, index) => (
                                <ListItem
                                    key={member.id}
                                    component={Link}
                                    to={`/detail/${member.login}`}
                                    sx={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        borderBottom: index < members.length - 1 ? 1 : 0,
                                        borderColor: 'divider',
                                        transition: 'background-color 0.2s',
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                        py: 2,
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar src={member.avatar_url} alt={member.login} sx={{ width: 56, height: 56 }} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="h6" component="span">
                                                {member.login}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="body2" color="text.secondary">
                                                ID: {member.id}
                                            </Typography>
                                        }
                                        sx={{ ml: 2 }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            )}

            {!loading && members.length === 0 && !error && (
                <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="body1" color="text.secondary">
                        No se encontraron miembros. Prueba buscando una organización.
                    </Typography>
                </Paper>
            )}
        </Container>
    );
};
