/* eslint valid-jsdoc: "off" */
'use strict';


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  const path = require('path');


  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1615791768793_9681';

  // 配置静态资源映射
  config.static = {
    prefix: '/',
  };

  // 配置模板引擎
  exports.view = {
    // 该配置会被 egg-view 读取
    root: [
      path.resolve(__dirname, '../app/public'),
      path.resolve(__dirname, '../app/view'),
    ].join(','), // 将 app/public 目录作为模板目录
    mapping: {
      // 映射配置，将不同的模板后缀映射到对应的模板引擎处理
      '.ejs': 'ejs',
    },
    defaultViewEngine: 'ejs', // 如果映射找不到对应的模板引擎，将使用该值作为默认使用的模板引擎
    defaultExtension: '.ejs', // 后续在controller中渲染模板时，默认渲染的模板后缀名
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    database: 'blogvcomdb',
    password: '961211',
    define: { // model的全局配置
      timestamps: true, // 添加create,update,delete时间戳
      paranoid: true, // 添加软删除
      freezeTableName: true, // 防止修改表名为复数
      // underscored: false, // 防止驼峰式字段被默认转为下划线
      // freezeTableName: true,// 停止模型自动复数化
      // tableName: 'Employees', // 直接提供表名称
      // timestamps: false, // 禁止Sequelize添加createdAt和updatedAt
      // createdAt: false, // 禁止Sequelize添加createdAt
      // updatedAt: 'updateTimestamp' // Sequelize添加updatedAt,但是重命名
    },
  };

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 调整body传输的大小限制，默认都为100kb
  config.bodyParser = {
    jsonLimit: '1mb',
    formLimit: '1mb',
  };
  // 配置cookie
  // config.cookies = {
  // httpOnly: true | false,
  // sameSite: 'none|lax|strict',
  // };
  // 配置session
  config.session = {
    key: 'EGG_SESS', // 承载 Session 的 Cookie 键值对名字
    maxAge: 86400000, // Session 的最大有效时间
  };
  // 定义security
  config.security = {
  // xframe: {
  //     value: 'SAMEORIGIN',
  // enable: false,
  // },
    csrf: {
      headerName: 'x-csrf-token', // 自定义请求头
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
