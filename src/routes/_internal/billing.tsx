import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_internal/billing')({
    component: RouteComponent,
});

function RouteComponent() {
    return <Navigate to="/not-found-component" />;
}
