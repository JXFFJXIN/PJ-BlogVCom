'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // 开启egg-validate
  validate: {
    enable: true,
    package: 'egg-validate',
  },

  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },

};
