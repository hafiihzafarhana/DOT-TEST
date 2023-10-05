"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "user_roles",
      [
        {
          id: "e7a2e6f2-96f2-4f70-8359-c2a71da746a7",
          user_id: "fac8531a-11c1-4d59-8634-b073acfe1b29",
          role_id: "5e03ef6e-efda-4cc2-841f-efaccdb10637", //USER
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "e7a2e6f2-96f2-4f70-8359-c2a71da746a8",
          user_id: "fac8531a-11c1-4d59-8634-b073acfe1b30",
          role_id: "5e03ef6e-efda-4cc2-841f-efaccdb10638", //ADMIN
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_roles", null, {});
  },
};
