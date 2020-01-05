export const AppConstants = {
    NoWhiteSpaceReg: ('.*\\S.*[a-zA-Z0-9_]+$'),
    DATE_FORMATS: {
        parse: {
          dateInput: 'LL',
        },
        display: {
          dateInput: 'YYYY-MM-DD',
          monthYearLabel: 'YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'YYYY',
        },
    },
    clearProjectInfoFromLocalStorageViews: [
      '/pages/test-progress/test-cases/projects-list',
      '/pages/test-progress/test-scenarios/projects-list',
      '/pages/test-progress/test-execution/projects-list'
    ]
};
