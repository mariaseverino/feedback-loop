import { createContext, useContext, type ReactNode } from 'react';

interface IUser {
    id: string | number;
    name: string;
    email: string;
    role: 'tenant' | 'admin' | 'member';
    organization: string;
}

interface AuthContextProps {
    user: IUser | null;
    // hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
    children: ReactNode;
    user: IUser | null;
}

export function AuthProvider({ children, user }: AuthProviderProps) {
    // function hasPermission(permission: string) {
    //     return user?.permissions.includes(permission) ?? false;
    // }

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
