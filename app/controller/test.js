'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async get() {
    // GET /b/：id 获取某一篇博客
    // ctx.query 解析?后面的数据并返回，不允许重复键名
    // ctx.queries 解析?后面的数据并返回,允许重复键名，相同结果放入数组中
    // ctx.params 获取动态路径中的数据，即:冒号后的键名对应的值
    // ctx.body 最常用的两类格式分别是 JSON 和 Form
    // ctx.request.body 使用内置bodyParser中间件解析body内容
    // ctx.headers，ctx.header，ctx.request.headers，ctx.request.header：这几个方法是等价的，都是获取整个 header 对象。
    // ctx.get(name)，ctx.request.get(name)：获取请求 header 中的一个字段的值，如果这个字段不存在，会返回空字符串。
    // 我们建议用 ctx.get(name) 而不是 ctx.headers['name']，因为前者会自动处理大小写。
    // ctx.cookies[.set()/.get()]，我们可以在 Controller 中便捷、安全的设置和读取 Cookie。
    // ctx.session 来访问或者修改当前用户 Session
    // ctx.validate(rule, [body]),果不传第二个参数会自动校验 `ctx.request.body`
    // ctx.status 设置状态码
    // ctx.service 使用业务服务逻辑层的内容
    // ctx.body 是 ctx.response.body 的简写
    const { ctx } = this;
    ctx.body = `params:${ctx.params.id},query:${JSON.stringify(ctx.query)}`;
  }
  async post() {
    // 1. CSRF防御
    // egg会返回一个cookie：包含csrfToken值
    // 在请求时候需要添加一个约定的请求头，并且将返回的cookie进行赋值
    const { ctx } = this;
    ctx.body = `body内容：${JSON.stringify(ctx.request.body)}`;
  }
}
// 基础查询
// 1. 创建字段
// app.model.实例.create({数据对象})
// 2. 读取整个表
// app.model.实例.findAll()
// 3. 读取整个表，带配置
/*
app.model.实例.findAll({
    attributes: ['foo', 'bar'] # 选择查询
    attributes: ['foo', ['bar', 'baz'], 'qux'] # 重命名属性
    where: { # 过滤查询
        authorId: {
            [Op.eq]: 2
        }
        [Op.and]: [
            { authorId: 12 },
            { status: 'active' }
        ]
        [Op.or]: [
            { authorId: 12 },
            { authorId: 13 }
        ]
    }
    # 等效于
    where: {
        # Op.eq
        authorId: 2
        # Op.and
        authorId: 12
        status: 'active'
        # Op.or
        [Op.or]: [12, 13]
    }
    order:[
        // 将转义 title 并针对有效方向列表进行降序排列
        ['title', 'DESC'],
        // 将按最大年龄进行降序排序
        [sequelize.fn('max', sequelize.col('age')), 'DESC'],
        // 将使用关联对象按嵌套关联模型的 createdAt 排序. (首选方法)
        [Subtask.associations.Task, Task.associations.Project, 'createdAt', 'DESC'],
        // 将使用关联对象按关联模型的 createdAt 排序. (首选方法)
        [Subtask.associations.Task, 'createdAt', 'DESC'],
    ]
    // 将按最大年龄降序排列
    order: sequelize.literal('max(age) DESC'),
    // 如果忽略方向,则默认升序,将按最大年龄升序排序
    order: sequelize.fn('max', sequelize.col('age')),
    // 如果省略方向,则默认升序, 将按年龄升序排列
    order: sequelize.col('age'),
    // 将根据方言随机排序(但不是 fn('RAND') 或 fn('RANDOM'))
    order: sequelize.random()

    limit: 10 # 容量
    offset: 8 # 偏移
})
*/
// 4. 更改数据
// app.model.实例.update({更改的数据}，{where查询})
// 5， 删除数据
// app.model.实例.destroy({where查询})
// 6. 销毁所有数据
// app.model.实例.destroy({truncate:true})
// 7. 批量创建
/*
const captains = await Captain.bulkCreate([# 数组对象
  { name: 'Jack Sparrow' },
  { name: 'Davy Jones' }
]，{
   validate: true # 验证数据
});
*/
/* 实用方法
1. count 差数
app.model.实例.count({where查询})
2. max，min，sum
app.model.实例.max
app.model.实例.min
app.model.实例.sum
*/

// 联表查询
// 一对一联表查询
/*
await app.model.父表.findAll({
    include: {
        model: app.model.子表
    }
})
*/
// 一对多联表查询
/*
await app.model.父表.findAll({
    where: { #条件
    },
    include: { # 联表查询
      model: app.model.子表
    }
})
*/
// 多对多联表查询
/*
await app.model.源表.findAll({
    where:{
        id: 1,
    },
    include: [ # 多级联表查询
        {model: app.model.子表},
        {model: app.model.目标表}
    ]
});
*/
module.exports = TestController;
