import {
    createRootRoute,
    createRootRouteWithContext,
    HeadContent,
    Outlet,
} from '@tanstack/react-router';
import { NotFoundComponent } from '~/routes/not-found-component';

interface IUser {
    id: string | number;
    name: string;
    email: string;
    role: 'tenant' | 'admin' | 'member';
    organization: string;
}

export interface AuthContextProps {
    currentUser: IUser | null;
    setCurrentUser: (user: IUser | null) => void;
    isAuthenticated: boolean;
    saveAuthenticatedUser: (user: IUser) => void;
    logout: () => void;
}

interface Auth {
    auth: AuthContextProps;
}

export const Route = createRootRouteWithContext<Auth>()({
    component: () => (
        <>
            <HeadContent />
            <Outlet />
        </>
    ),

    notFoundComponent: () => {
        return <NotFoundComponent />;
    },
});
