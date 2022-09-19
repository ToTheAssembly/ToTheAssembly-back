'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('members', [{
        id: 'L2I9861C',
        name: '강대식',
        hj_name: '姜大植',
        bth_sl: '음',
        bth_date: '1959-11-02',
        position: '위원',
        party: '국민의힘',
        origin: '대구 동구을',
        election: '지역구',
        main_committee: '국토교통위원회, 예산결산특별위원회',
        committees_array: '국토교통위원회, 예산결산특별위원회',
        gender: '남',
        phone: '02-784-5275',
        email: 'kds21341@naver.com',
        homepage: '',
        image: '/image/강대식.jpg',
      },
      {
        id: 'EMC8812P',
        name: '홍석준',
        hj_name: '洪碩晙',
        bth_sl: '음',
        bth_date: '1966-05-17',
        position: '위원',
        party: '국민의힘',
        origin: '대구 달서구갑',
        election: '지역구',
        main_committee: '과학기술정보방송통신위원회, 국회운영위원회',
        committees_array: '과학기술정보방송통신위원회, 국회운영위원회',
        gender: '남',
        phone: '02-784-2601',
        email: '0634assembly@naver.com',
        homepage: '',
        image: '/image/홍석준.jpg',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('members', null, {});
  }
};
