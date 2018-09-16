'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1535863423479_1738';

  // add your config here
  config.middleware = [ 'test', 'login' ];
  config.test = {
    enable: false,
  };

  config.login = {
    enable: true,
    ignore: /\/$|\/login|\/logout/,
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://127.0.0.1:9001' ],
  };

  config.cors = {
    credentials: true,
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/trekking',
      options: {
        useNewUrlParser: true,
      },
    },
  };

  return config;
};
