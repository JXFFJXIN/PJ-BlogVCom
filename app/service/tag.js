'use strict';

const { Service } = require('egg');

module.exports = class extends Service {
  /**
   * 查找并创建一个标签
   * @param {obj} param0 输入的内容
   * { tag }
   */
  async addTag({ tag }) {
    const { app } = this,
      op = {
        tag,
      };
    const { dataValues } = app.model.Tag.findOrCreate(op);
    return dataValues;
  }
  /**
   * 查询数据
   * @param {obj} param0 查询数据
   */
  async findTag({ tagId }) {
    const op = {},
      { app } = this;
    if (tagId) {
      op.where = {
        id: +tagId,
      };
      op.include = {
        model: app.model.Blog,
      };
    }
    const { dataValues } = app.model.Tag.findAndCountAll(op);
    return dataValues;
  }
};
