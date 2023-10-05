"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "books",
      [
        {
          id: "79350f4f-23c3-4c17-8333-4a37c6e1db53",
          name: "Buku Pemrograman C++",
          isbn: "ISBN-2020-06-07-A",
          page: 109,
          description:
            "Buku bahasa pemrograman C++ digunakan untuk pengembangan software arsitektur",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("books", null, {});
  },
};
