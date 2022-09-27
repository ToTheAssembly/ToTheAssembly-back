'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('billhashtag', [{
            hashtagId: 1,
            billId: "PRC_K2D2Y0Y8E1L9S1Z8I3M3B2O5J1Y8T5"
        },
        {
            hashtagId: 2,
            billId: "PRC_K2D2Y0Y8E1L9S1Z8I3M3B2O5J1Y8T5"
        },
        {
            hashtagId: 3,
            billId: "PRC_K2D2Y0Y8E1L9S1Z8I3M3B2O5J1Y8T5"
        },
        {
            hashtagId: 1,
            billId: "PRC_S2P2C0M9U0Y1I1E7U1R9H2B9P5L6R8"
        },
        {
            hashtagId: 4,
            billId: "PRC_S2P2C0M9U0Y1I1E7U1R9H2B9P5L6R8"
        },
        {
            hashtagId: 5,
            billId: "PRC_S2P2C0M9U0Y1I1E7U1R9H2B9P5L6R8"
        }
    ], {});
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('billhashtag', null, {});
    }
};
