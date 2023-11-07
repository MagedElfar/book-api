const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, sequelize) => {
    await queryInterface.createTable('rows', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      section_id: {
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
    await queryInterface.addConstraint('rows', {
      type: 'foreign key',
      name: 'fk_section_id',
      fields: ['section_id'],
      references: {
        table: 'sections',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, sequelize) => {
    await queryInterface.dropTable('rows');
  },
};
