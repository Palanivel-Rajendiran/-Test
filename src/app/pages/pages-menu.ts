import { NbMenuItem } from '@nebular/theme';

// Side bar Menu setting list and route navigations
export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Project',
    icon: 'layout-outline',
    children: [
      {
        title: 'Projects',
        link: '/pages/project/projects',
      }
    ]
  },
  {
    title: 'Test Progress',
    icon: 'browser-outline',
    children: [
      {
        title: 'Test Execution',
        link: '/pages/test-progress/test-execution',
      }
    ]
  }
];
