'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Comment = app.model.define(
    'comment',
    {
      blogId: {
        type: INTEGER,
        allowNull: false,
      },
      parentId: {
        type: INTEGER,
        defaultValue: -1,
      },
      userName: {
        type: STRING(64),
        defaultValue: '匿名用户',
      },
      comment: {
        type: STRING(256),
        allowNull: false,
      },
      userEmail: {
        type: STRING(256),
        defaultValue: '未填写电子邮箱',
      },
    }
  );

  Comment.associate = () => {
    app.model.Comment.belongsTo(app.model.Blog, { foreignKey: 'blogId', targetKey: 'id' });
  };
  return Comment;
};
