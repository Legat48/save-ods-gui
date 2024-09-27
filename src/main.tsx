import type { RouteRecord } from 'vite-react-ssg'
import { ViteReactSSG } from 'vite-react-ssg'
import Layout from './Layout'
import './styles/style.scss';


const routes: RouteRecord[] = [
  {
    index: true,
    lazy: () => import('./pages'),
  },
  {
    path: '/json-info',
    lazy: () => import('./pages/json-info'),
  },
  {
    path: '/apk',
    lazy: () => import('./pages/apk')
  },
  {
    path: '/ems-setting',
    lazy: () => import('./pages/ems-setting')
  },
  {
    path: '/user-stat',
    lazy: () => import('./pages/user-stat')
  },
  {
    path: '/eq-status',
    lazy: () => import('./pages/eq-status')
  },
  {
    path: '/json-info/smelting',
    lazy: () => import('./pages/json-info/smelting')
  },
  {
    path: '/heat-now',
    lazy: () => import('./pages/heat-now')
  },
]

const routesWithLayout = [{
  path: '/',
  Component: Layout,
  children: routes,
}]

export const createRoot = ViteReactSSG({ routes: routesWithLayout, basename: import.meta.env.BASE_URL })
