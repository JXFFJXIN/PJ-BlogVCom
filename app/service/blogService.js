'use strict';

const { Service } = require('egg');

module.exports = class extends Service {
  /**
   * 创建博客
   * @param {Object} options 创建的内容
   */
  async add(options) {
    const { app } = this;
    const { dataValues: req } = await app.model.Blog.create(options);
    return req;
  }
  /**
   * 条件查找博客
   * @param {Object} options 查找条件
   */
  async find(options) {
    const { app } = this;
    const op = {
      include: [
        { model: app.model.Tag },
        { model: app.model.Comment },
      ],
      ...options,
    };
    const req = await app.model.Blog.findAll(op);
    return req;
  }
  /**
   * id精确查找
   * @param {Number} id 特定id值
   */
  async findById(id) {
    const { app } = this;
    const { dataValues: req } = await app.model.Blog.findById(id);
    return req;
  }
  /**
   * 删除特定内容
   * @param {Object} options 查找条件
   */
  async delete(options) {
    const { app } = this;
    const { dataValues: req } = await app.model.Blog.destroy(options);
    return req;
  }
  /**
   * 修改博客
   * @param {Number} id 修改所需id
   * @param {Object} content 修改的内容
   */
  async edit(id, content) {
    const { app } = this;
    const { dataValues: req } = await app.model.Blog.updateOne({ id }, content);
    return req;
  }
};
