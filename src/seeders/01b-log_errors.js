"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "log_errors",
      [
        {
          id: "c3e6124e-7eaf-4ecf-9137-ef142fde3b98",
          code: 500,
          status: "INTERNAL SERVER ERROR",
          message: "Server Error",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("log_errors", null, {});
  },
};
