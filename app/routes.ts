import {
    type RouteConfig,
    index,
    layout,
    route,
} from '@react-router/dev/routes';

export default [
    index('routes/landing-page.tsx'),
    route('feedback', 'routes/feedback-page.tsx'),
    layout('layout/layout.tsx', [
        route('dashboard', 'routes/dashboard.tsx'),
        route('equipe', 'routes/team.tsx'),
    ]),
] satisfies RouteConfig;

// export default [
//     layout('layout/layout.tsx', [
//         index('routes/enviar-feedback.tsx'),
//         // route('feedback-enviados', 'routes/home.tsx'),
//         // route('receber-feedback', 'routes/home.tsx'),
//         // route('enviar-feedback', 'routes/home.tsx'),
//     ]),
// ] satisfies RouteConfig;
