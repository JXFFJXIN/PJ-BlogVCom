'use strict';

const { Service } = require('egg');

module.exports = class extends Service {
  /**
   * 添加映射
   * @param {tagIdArr, blogId} param0 创建的内容
   */
  async addMapping({ tagIdArr, blogId }) {
    const { app } = this;
    if (tagIdArr.length === 0 || !tagIdArr) {
      return;
    }
    const op = [];
    for (const item of tagIdArr) {
      const res = { blogId };
      res.tagId = +item;
      op.push(res);
    }
    const req = await app.model.MappingTagBlog.bulkCreate(op);
    return req;
  }
  /**
   * 查找映射
   * @param {obj} param0 查找配置
   * { limit, offset, blogId, tagId }
   */
  async findMapping({ limit, offset, blogId = -1, tagId = -1 }) {
    const { app } = this;
    const op = {
      limit,
      offset,
      where: {},
    };
    if (blogId !== -1 && tagId === -1) {
      op.where.blogId = +blogId;
    }
    if (blogId === -1 && tagId !== -1) {
      op.where.tagId = +tagId;
    }
    const { dataValues } = await app.model.MappingTagBlog.findAndCountAll(op);
    return dataValues;
  }
};
