const APP_CONFIG = {};
  Object.defineProperties(APP_CONFIG,
    {
      API_ROOT_URL: {
        value: 'http://localhost:3000',
        writable: false,
      },
      API_EXT_URL: {
        value: 'http://localhost:8080/develop2',
        writable: false,
      },
      LINK_PREFIX: {
        value: '/joss1/app',
        writable: false,
      },
      APP_ROOT_URL: {
        value: '/',
        writable: false,
      },
      APP_ID: {
        value: 'joss1',
        writable: false,
      },
      APP_TITLE: {
        value: 'joss1',
        writable: false,
      },
      APP_NAV_BAR_TITLE: {
        value: 'joss1',
        writable: false,
      },
      APP_ICON_NAME: {
        value: 'favicon.png',
        writable: false,
      },
    });

  window.APP_CONFIG = APP_CONFIG;