'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;
  const MappingTagBlog = app.model.define(
    'mappingTagBlog',
    {
      tagId: {
        type: INTEGER,
        primaryKey: true,
      },
      blogId: {
        type: INTEGER,
        primaryKey: true,
      },
    }
  );
  return MappingTagBlog;
};
