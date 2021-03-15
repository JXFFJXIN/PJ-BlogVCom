'use strict';

module.exports = app => {
  const { TEXT } = app.Sequelize;

  const EveryDay = app.model.define(
    'everyday',
    {
      content: {
        type: TEXT,
        allowNull: false,
      },
    }
  );

  return EveryDay;
};
