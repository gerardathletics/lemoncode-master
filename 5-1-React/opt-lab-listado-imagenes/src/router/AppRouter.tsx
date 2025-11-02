import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.tsx';
import KittiesPage from '../pages/KittiesPage.tsx';
import PuppiesPage from '../pages/PuppiesPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <KittiesPage />,
            },
            {
                path: 'kitties',
                element: <KittiesPage />,
            },
            {
                path: 'puppies',
                element: <PuppiesPage />,
            },
        ],
    },
]);

export function AppRouter() {
    return <RouterProvider router={router} />;
}
