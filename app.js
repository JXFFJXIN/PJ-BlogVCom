'use strict';

module.exports = app => {
  if (app.config.env !== 'local' || app.config.env === 'unittest') {
    app.beforeStart(async () => {
      await app.model.sync({// 空配置则，如果表不存在，则会创建表（如果已经存在，则不执行任何操作）
        // force: true, // 这将创建表，如果该表已经存在，则将其首先删除
        alter: true, // 这将检查数据库中表的当前状态，然后在表中进行必要的更改以使其与模型匹配。
        match: /blogvcomdb$/, // 安全检查，接收RegExp
      });
    });
  }
};
