const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue')},
      {path: '/author', component: () => import('pages/Author')},
      {path: '/book', component: () => import('pages/Book')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
