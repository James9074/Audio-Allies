export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard', authority: ['admin', 'user'] },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: './_Dashboard',
      },
      // Audio Allies Stuff
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        component: './_Account/Profile',
      },
      //sendmessage
      {
        name: 'Send Message',
        icon: 'message',
        path: '/messages',
        component: './_Messages',
      },
      //upgrademembership
      {
        name: 'My Membership',
        icon: 'project',
        path: '/membership',
        component: './_Account/Profile',
      },
      //uploadepisode
      {
        name: 'Upload New Episode',
        icon: 'cloud-upload',
        path: '/upload',
        component: './Forms/StepForm',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/upload',
            redirect: '/upload/info',
          },
          {
            path: '/upload/info',
            name: 'info',
            component: './Forms/StepForm/Step1',
          },
          {
            path: '/upload/confirm',
            name: 'confirm',
            component: './Forms/StepForm/Step2',
          },
          {
            path: '/upload/result',
            name: 'result',
            component: './Forms/StepForm/Step3',
          },
        ],
      },
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        hideInMenu: true,
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
