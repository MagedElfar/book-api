const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      ISBN: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      qty: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },

      row_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },

      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    // Add foreign key constraints if needed
    await queryInterface.addConstraint('books', {
      type: 'foreign key',
      name: 'fk_row_id',
      fields: ['row_id'],
      references: {
        table: 'rows',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('books', {
      type: 'foreign key',
      name: 'fk_book_user_id',
      fields: ['user_id'],
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, sequelize) => {
    await queryInterface.dropTable('books');
  },
};
