import {
    RouterProvider,
    createRootRouteWithContext,
    createRouter,
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './route-tree.gen';
import {
    AuthProvider,
    useAuth,
    type AuthContextProps,
} from './contexts/authContext';

// const rootRoute = createRootRouteWithContext<AuthContextProps>();
const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    context: {
        auth: undefined!,
    },
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

function InnerApp() {
    const queryClient = new QueryClient();
    const auth = useAuth();
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} context={{ auth }} />
        </QueryClientProvider>
    );
}
export function App() {
    return (
        <AuthProvider>
            <InnerApp />
        </AuthProvider>
    );
}
