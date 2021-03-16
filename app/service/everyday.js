'use strict';

const { Service } = require('egg');

module.exports = class extends Service {
  /**
   * 添加每日一句
   * @param {Obj} param0 输入的内容
   */
  async addED({ content }) {
    if (!content) {
      return '数据错误';
    }
    const { app } = this,
      op = {
        content,
      },
      { dataValues } = await app.model.Everyday.create(op);
    return dataValues;
  }
  /**
   * 查询每日一句
   */
  async findED() {
    const { app } = this,
      op = {
        order: [[ 'id', 'DESC' ]],
      },
      { dataValues } = await app.model.Everyday.findOne(op);
    return dataValues;
  }
};
