import { type RouteConfig, index, layout } from '@react-router/dev/routes';

export default [index('routes/feedback-page.tsx')] satisfies RouteConfig;

// export default [
//     layout('layout/layout.tsx', [
//         index('routes/enviar-feedback.tsx'),
//         // route('feedback-enviados', 'routes/home.tsx'),
//         // route('receber-feedback', 'routes/home.tsx'),
//         // route('enviar-feedback', 'routes/home.tsx'),
//     ]),
// ] satisfies RouteConfig;
