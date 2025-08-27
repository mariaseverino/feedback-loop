import {
    type RouteConfig,
    index,
    layout,
    route,
} from '@react-router/dev/routes';

export default [
    index('routes/landing-page.tsx'),
    route('register', 'routes/register.tsx'),
    route('login', 'routes/login.tsx'),
    route('esqueci-senha', 'routes/request-reset-password.tsx'),
    route('reset-senha', 'routes/reset-password.tsx'),
    layout('layout/layout.tsx', [
        route('dashboard', 'routes/dashboard.tsx'),
        route('equipe', 'routes/team.tsx'),
        route('feedback', 'routes/feedback-page.tsx'),
    ]),
] satisfies RouteConfig;
