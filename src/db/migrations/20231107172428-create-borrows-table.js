const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, sequelize) => {
    await queryInterface.createTable('borrows', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      return_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      checkout_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      book_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },

      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
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
    await queryInterface.addConstraint('borrows', {
      type: 'foreign key',
      name: 'fk_borrow_book_id',
      fields: ['book_id'],
      references: {
        table: 'books',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('borrows', {
      type: 'foreign key',
      name: 'fk_borrow_user_id',
      fields: ['user_id'],
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, sequelize) => {
    await queryInterface.dropTable('borrows');
  },
};
