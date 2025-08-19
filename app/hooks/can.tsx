import type { ReactNode } from 'react';
import { useAuth } from '~/contexts/authContext';

export function Can({
    permission,
    children,
}: {
    permission: string;
    children: ReactNode;
}) {
    const { user } = useAuth();
    return user?.permissions.includes(permission) ? children : null;
}

// <Can permission={PERMISSIONS.USERS_MANAGE}>
//     <button>Adicionar Usuário</button>
// </Can>;
