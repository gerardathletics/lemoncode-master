import React from 'react';
import { Link } from 'react-router-dom';

interface MemberEntity {
    id: string;
    login: string;
    avatar_url: string;
}

export const ListPage: React.FC = () => {
    const [members, setMembers] = React.useState<MemberEntity[]>([]);
    const [organization, setOrganization] = React.useState('lemoncode');
    const [error, setError] = React.useState<string | null>(null);

    const handleSearch = () => {
        fetch(`https://api.github.com/orgs/${organization}/members`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('No se ha encontrado la organización');
            })
            .then((json) => {
                setMembers(json);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setMembers([]);
            });
    };

    React.useEffect(() => {
        handleSearch();
    }, []);

    return (
        <>
            <h2>Miembros de la organización</h2>
            <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Organización" />
            <button onClick={handleSearch}>Buscar</button>
            {error && <div className="error-message">{error}</div>}
            <div className="list-user-list-container">
                <span className="list-header">Avatar</span>
                <span className="list-header">Id</span>
                <span className="list-header">Name</span>
                {members.map((member) => (
                    <React.Fragment key={member.id}>
                        <img src={member.avatar_url} alt={member.login} />
                        <span>{member.id}</span>
                        <Link to={`/detail/${member.login}`}>{member.login}</Link>
                    </React.Fragment>
                ))}
            </div>
            {/* <Link to="/detail">Navigate to detail page</Link> */}
        </>
    );
};
