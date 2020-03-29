import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import FreelancerProfile from './components/Profile/FreelancerProfile/FreelancerProfile';

const RouteWithSubRoutes = route => {
    return (
        <Route 
            path={route.path}
            exact={route.exact}
            render={props => <route.component {...props} routes={route.routes} />}
        />
    )
}

export const RenderRoutes = ({routes}) => {
    return (
        <Switch>
            {routes.map( route => {
                return <RouteWithSubRoutes key={route.key} {...route} />;
            })}
            <Route component={() => <h1>Not Found</h1>} />
        </Switch>
    )
}

const ROUTES = [
    { path: '/', key: 'ROOT', exact: true, component: () => <Header />},
    {
        path: '/profile',
        key: 'PROFILE',
        name: "My Profile",
        classes: 'nav-item',
        component: () => <FreelancerProfile />
    },
    {
        path: '/',
        key: "APP",
        name: 'Home',   
        classes: 'nav-item',
        component: RenderRoutes,
        routes: [
            {
                path: '/app',
                key: "APP_ROOT",
                exact: true,
                component: () => <h1>App Index</h1>
            },
            {
                path: '/app/page',
                key: "APP_PAGE",
                exact: true,
                component: () => <h1>App Page</h1>
            },
        ],
    },
    {
        path: '/kill',
        key: "KILL",
        name: "Browse Jobs",
        classes: 'nav-item',
        component: () => <h1>Killua</h1>
    },
    {
        path: '/kill',
        key: "KILL",
        name: "Candidates",
        classes: 'nav-item',
        component: () => <h1>Killua</h1>
    },
    {
        path: '/kill',
        key: "KILL",
        name: "Blog",
        classes: 'nav-item',
        component: () => <h1>Killua</h1>
    },
    {
        path: '/kill',
        key: "KILL",
        name: "Contact",
        classes: 'nav-item',
        component: () => <h1>Killua</h1>
    },
    {
        path: '/kill',
        key: "KILL",
        name: "Post a Job",
        classes: 'nav-item cta mr-md-1',
        component: () => <h1>Killua</h1>
    },
    {
        path: '/kill',
        key: "KILL",
        name: "Want a Job",
        classes: 'nav-item cta cta-colored',
        component: () => <h1>Killua</h1>
    },
];

export default ROUTES;

