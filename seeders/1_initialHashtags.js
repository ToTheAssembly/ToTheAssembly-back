'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('hashtags', [{
            id: 1,
            name: "징계"
        },
        {
            id: 2,
            name: "공무원"
        },
        {
            id: 3,
            name: "채용"
        },
        {
            id: 4,
            name: "자동차"
        },
        {
            id: 5,
            name: "보험"
        }
    ], {});
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('hashtags', null, {});
    }
};
