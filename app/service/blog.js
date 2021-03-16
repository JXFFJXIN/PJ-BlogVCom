'use strict';

const { Service } = require('egg');

module.exports = class extends Service {
  /**
   * 创建博客数据
   * @param {obj} param0 创建的内容
   * { title, content, tag }
   */
  async addBlog({ title, content, tag }) {
    const { app } = this,
      op = {
        title,
        content,
        tag,
      };
    const { dataValues } = await app.model.Blog.create(op);
    return dataValues;
  }
  /**
   * 通过页面进行查找
   * @param {obj} param0 查询配置
   */
  async findBlog({ limit = 10, offset = 0 }) {
    const { app } = this,
      op = {
        limit,
        offset,
        order: [[ 'id', 'DESC' ]],
      };
    const req = app.model.Blog.findAndCountAll(op);
    return req;
  }
  /**
   * 通过id进行查找
   * @param {obj} param0 查找配置
   */
  async findBlogByPK({ id }) {
    const { app } = this,
      op = {
        where: {
          id: parseInt(id),
        },
        include: {
          model: app.model.Comment,
        },
        order: [[ 'comments', 'id', 'DESC' ]],
      },
      req = await app.model.Blog.findByPk(id);
    await req.increment('view');
    const [{ dataValues }] = await app.model.Blog.findAll(op);
    return dataValues;
  }
  /**
   * 热度查找
   * @param {obj} param0 条件
   */
  async findBlogHot({ limit = 10, offset = 0 }) {
    const { app } = this,
      op = {
        limit,
        offset,
        order: [[ 'view', 'DESC' ], [ 'id', 'DESC' ]],
      },
      req = await app.model.Blog.findAndCountAll(op);
    return req;
  }
};
