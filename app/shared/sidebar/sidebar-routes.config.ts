import {  RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'bucketlists', title: 'My Bucketlists',  icon: 'dashboard', class: '' },
    { path: 'profile', title: 'My Profile',  icon:'person', class: '' },
    { path: 'table', title: 'Table List',  icon:'content_paste', class: '' },
    { path: 'typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: 'icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: 'notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
    { path: 'login', title: 'Login',  icon:'unarchive', class: 'active-pro' },
];
