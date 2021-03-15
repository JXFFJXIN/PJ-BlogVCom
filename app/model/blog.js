'use strict';
// 第一步，sequelize.define(modelName, attributes, options)
// 第二步，model.sync({options})
module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  // INTEGER, TEXT, BOOLEAN, BIGINT, FLOAT, REAL, DOUBLE, DECIMAL, DATEONLY
  // UUID, Sequelize.UUIDV4, Sequelize.UUIDV1
  const Blog = app.model.define('blog', {
    title: {
      type: STRING(128),
      allowNull: false,
    },
    content: {
      type: TEXT, // 数据类型
      allowNull: false, // 是否为空
      // defaultValue: '默认值', // 默认值
      // unique: true, // 约束
      // autoIncrement: true, // 自增
      // primaryKey: true, // 主键
      // field: 'field_with_underscores', // 自定义字段名
    },
    view: {
      type: INTEGER,
      defaultValue: 0,
    },
    tag: {
      type: STRING(128),
      allowNull: false,
    },
  }, {
    // freezeTableName: true,// 停止模型自动复数化
    // tableName: 'Employees', // 直接提供表名称
    // timestamps: false, // 禁止Sequelize添加createdAt和updatedAt
    // createdAt: false, // 禁止Sequelize添加createdAt
    // updatedAt: 'updateTimestamp' // Sequelize添加updatedAt,但是重命名
  });

  Blog.associate = () => {
    // Blog与Comment是一对多关系，所以这里使用hasMany()
    // foreignKey: '外键', targetKey: '目标键'
    app.model.Blog.hasMany(app.model.Comment, { foreignKey: 'blogId', targetKey: 'id' });
    app.model.Blog.belongsToMany(app.model.Tag,
      {
        through: app.model.MappingTagBlog,
        foreignKey: 'blogId',
        otherKey: 'tagId',
      });
  };

  return Blog;
};
