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
        where: { tag },
      };
    const req = app.model.Tag.findOrCreate(op);
    return req;
  }
  /**
   * 查询所有数据
   * @param {obj} param0 查询数据
   */
  async findTagAll({ limit = 10, offset = 0 }) {
    const { app } = this,
      op = {
        limit,
        offset,
      },
      req = await app.model.Tag.findAndCountAll(op);
    return req;
  }
  /**
   * id查询
   * @param {obj} param0 配置
   */
  async findTagById({ id }) {
    const { app } = this,
      op = {
        where: { id },
        include: {
          model: app.model.Blog,
        },
        order: [[ 'blogs', 'id', 'DESC' ]],
      },
      [{ dataValues }] = await app.model.Tag.findAll(op);
    return dataValues;
  }
};
