'use strict';

const { Controller } = require('egg');

module.exports = class extends Controller {
  /**
   * GET /b ?page=?&pageSize=?
   * 获取数据
   * queryBlogByPage.queryBlogHot.queryBlogCount,queryBlogAll
   */
  async index() {
    const { ctx } = this,
      { page, pageSize } = ctx.query,
      op = {
        limit: parseInt(pageSize),
        offset: (parseInt(page) - 1) * parseInt(pageSize),
      },
      { count, rows } = await ctx.service.blog.findBlog(op),
      blogList = [];

    rows.map(it => blogList.push(it.dataValues));
    ctx.body = {
      success: true,
      data: {
        count,
        data: blogList,
      },
    };
    ctx.status = 201;
  }
  /**
   * GET /b/：id
   * id查找数据
   * queryBlogById，addview
   */
  async show() {
    // GET /b/：id 获取某一篇博客
    const { ctx } = this,
      { id } = ctx.params,
      op = { id: parseInt(id) },
      res = await ctx.service.blog.findBlogByPK(op);
    const [ ...cmtList ] = res.comments;
    const cmt = [];
    cmtList.map(it => cmt.push(it.dataValues));
    res.comments = cmt;
    ctx.body = {
      success: true,
      data: res,
    };
    ctx.status = 201;
  }
  /**
   * POST /b
   * 添加数据
   * addBlog
   */
  async create() {
    const { ctx } = this;
    ctx.validate({
      title: { type: 'string', require: 'true' },
      content: { type: 'string', require: 'true' },
      tag: { type: 'string', require: 'true' },
    });
    let op = ctx.request.body;
    const { id: blogId, tag } = await ctx.service.blog.addBlog(op);
    const tagArr = tag.split(',').map(it => it.trim());
    const tagIdArr = [];
    for (const item of tagArr) {
      op = {
        tag: item,
      };
      const [{ dataValues }] = await ctx.service.tag.addTag(op);
      tagIdArr.push(dataValues.id);
    }
    op = {
      tagIdArr,
      blogId,
    };
    await ctx.service.mapping.addMapping(op);
    ctx.body = {
      success: true,
      data: true,
    };
    ctx.status = 201;
  }
  /**
   * GET /b/new
   * 获得热度博客列表
   */
  async new() {
    const { ctx } = this,
      { page, pageSize } = ctx.query,
      op = {
        limit: parseInt(pageSize),
        offset: (parseInt(page) - 1) * parseInt(pageSize),
      },
      { count, rows } = await ctx.service.blog.findBlogHot(op),
      blogList = [];

    rows.map(it => blogList.push(it.dataValues));
    ctx.body = {
      success: true,
      data: {
        count,
        data: blogList,
      },
    };
    ctx.status = 201;
  }
  async edit() {
    // GET /b/：id/edit 获取某一篇博客的编辑界面
    this.ctx.body = '博客编辑页面';
  }
  async update() {
    // PUT /b 修改一篇博客
    this.ctx.body = '处理提交的修改博客内容';
  }
  async destroy() {
    // DELETE /b/：id 删除一篇博客
    this.ctx.body = '删除博客';
  }
};
