import {  RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'My Bucketlists',  icon: 'dashboard', class: '' },
    { path: 'user', title: 'User Profile',  icon:'person', class: '' },
    { path: 'table', title: 'Table List',  icon:'content_paste', class: '' },
    { path: 'typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: 'icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: 'notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
    { path: 'unauthorized', title: 'Login',  icon:'unarchive', class: 'active-pro' },
];
