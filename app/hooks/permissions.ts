type Role = 'tenant' | 'admin' | 'member';
type Permission =
    | 'view_navbar'
    | 'view_dashboard'
    | 'view_team'
    | 'view_feedbacks'
    | 'view_billing'
    | 'view_help';

const rolePermissions: Record<Role, Permission[]> = {
    tenant: [
        'view_navbar',
        'view_dashboard',
        'view_team',
        'view_feedbacks',
        'view_billing',
        'view_help',
    ],
    admin: [
        'view_navbar',
        'view_dashboard',
        'view_team',
        'view_feedbacks',
        'view_help',
    ],
    member: [],
};

export const permissions = (role: Role): Permission[] => {
    return rolePermissions[role] ?? [];
};

export const Can = (role: Role, permission: Permission): boolean => {
    return permissions(role).includes(permission);
};
