const BASE_URL = 'https://api.github.com';

export interface MemberEntity {
    id: string;
    login: string;
    avatar_url: string;
}

export const getOrganizationMembers = async (organization: string): Promise<MemberEntity[]> => {
    const response = await fetch(`${BASE_URL}/orgs/${organization}/members`);

    if (!response.ok) {
        throw new Error('No se ha encontrado la organización');
    }

    const data: MemberEntity[] = await response.json();
    return data;
};
