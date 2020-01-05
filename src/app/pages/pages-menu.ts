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
        link: '/pages/project/projects/list',
      },
      {
        title: 'Test Plan',
        link: '/pages/project/test-plan/list',
      },
      {
        title: 'Project Complete',
        link: '/pages/project/project-complete',
      },
    ],
  },
  {
    title: 'Test Progress',
    icon: 'browser-outline',
    children: [
      {
        title: 'Test Scenarios',
        link: '/pages/test-progress/test-scenarios/projects-list',
      },
      {
        title: 'Test Cases',
        link: '/pages/test-progress/test-cases/projects-list',
      },
      {
        title: 'Test Execution',
        link: '/pages/test-progress/test-execution/projects-list',
      },
      {
        title: 'Defects',
        link: '/pages/test-progress/defects',
      },
      {
        title: 'Test Generation',
        link: '/pages/test-progress/test-generation',
      },
    ],
  },
];
