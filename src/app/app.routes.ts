import { Routes } from '@angular/router';
import { PAGES } from './site/site-data';

const infoPage = () => import('./pages/info-page').then((m) => m.InfoPage);
const notFound = () => import('./pages/not-found').then((m) => m.NotFound);

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  ...PAGES.map((page) => ({ path: page.path, loadComponent: infoPage, data: { page: page.path } })),
  { path: 'not-found', loadComponent: notFound },
  { path: '**', loadComponent: notFound },
];
