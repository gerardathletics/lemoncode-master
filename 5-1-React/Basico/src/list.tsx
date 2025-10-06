import React from 'react';
import { Link } from 'react-router-dom';

interface MemberEntity {
    id: string;
    login: string;
    avatar_url: string;
}

export const ListPage: React.FC = () => {
    const [members, setMembers] = React.useState<MemberEntity[]>([]);
    const [organization, setOrganization] = React.useState(() => {
        return sessionStorage.getItem('organization') || 'lemoncode';
    });
    const [organizationInput, setOrganizationInput] = React.useState(organization);
    const [error, setError] = React.useState<string | null>(null);

    const handleSearch = () => {
        fetch(`https://api.github.com/orgs/${organizationInput}/members`)
            .then((response) => {
                if (response.ok) {
                    sessionStorage.setItem('organization', organizationInput);
                    setOrganization(organizationInput);
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    React.useEffect(() => {
        fetch(`https://api.github.com/orgs/${organization}/members`)
            .then((response) => response.json())
            .then((json) => setMembers(json));
    }, [organization]);

    return (
        <>
            <h2>Miembros de la organización en Github</h2>
            <input type="text" value={organizationInput} onChange={(e) => setOrganizationInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Organización" />
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
