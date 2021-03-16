'use strict';

const { Service } = require('egg');

module.exports = class extends Service {
  /**
   * 添加评论
   * @param {obj} param0 输入的内容
   * { blogId, parentId = -1, userName, comment, userEmail }
   */
  async addCmt({ blogId, parentId = -1, userName, comment, userEmail }) {
    const { app } = this,
      op = {
        blogId,
        userName,
        comment,
        userEmail,
        parentId,
      };
    const { dataValues } = app.model.Comment.create(op);
    return dataValues;
  }
  /**
   * 条件查询数据
   * @param {obj} param0 查询条件
   * { limit, offset, blogId = -1 }
   */
  async findCmt({ limit, offset, blogId = -1 }) {
    const op = {
        limit,
        offset,
      },
      { app } = this;
    if (blogId !== -1) {
      op.where = {
        blogId: +blogId,
      };
    }
    const { dataValues } = app.model.Comment.findAndCountAll(op);
    return dataValues;
  }
};
