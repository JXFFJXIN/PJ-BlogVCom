'use strict';

const {
  Service,
} = require('egg');

module.exports = class extends Service {
  /**
   * 添加评论
   * @param {obj} param0 输入的内容
   * { blogId, parentId = -1, userName, comment, userEmail }
   */
  async addCmt({
    blogId,
    parentId = -1,
    userName,
    comment,
    userEmail = '未留下邮箱',
  }) {
    const {
        app,
      } = this,
      op = {
        blogId,
        userName,
        comment,
        userEmail,
        parentId,
      },
      { dataValues } = await app.model.Comment.create(op);
    return dataValues;
  }
  /**
   * 查询所有数据
   * @param {obj} param0 查询条件
   * { limit, offset, blogId = -1 }
   */
  async findCmtAll({
    limit = 10,
    offset = 0,
  }) {
    const op = {
        limit,
        offset,
        order: [[ 'id', 'DESC' ]],
      },
      { app } = this,
      req = await app.model.Comment.findAndCountAll(op);
    return req;
  }
};
