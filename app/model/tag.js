'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;
  const Tag = app.model.define(
    'tag',
    {
      tag: {
        type: STRING(64),
        allowNull: false,
      },
    }
  );

  Tag.associate = () => {
    app.model.Tag.belongsToMany(app.model.Blog,
      {
        through: app.model.MappingTagBlog,
        foreignKey: 'tagId',
        otherKey: 'blogId',
      });
  };
  return Tag;
};
