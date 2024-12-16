import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

//lazy loading
const Auth = lazy(() => import('../pages/Auth/Auth'));
const Home = lazy(() => import('../pages/Home/Home'));

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Auth />
    }, {
        path: '/home',
        element: <Home />
    }
]);

export default Router;
