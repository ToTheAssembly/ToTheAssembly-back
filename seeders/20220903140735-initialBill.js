'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('bills', [{
      id: 'PRC_K2D2Y0Y8E1L9S1Z8I3M3B2O5J1Y8T5',
      bill_num: '2117233',
      title: '감사원법 일부개정법률안',
      created_at: new Date(2022, 8, 3),
      proposer: '이태규의원 등 10인',
      party: '국민의힘',
      main_proposer: '이태규',
      proposer_array: '권은희,김영식,김예지,김용판,김정재,박덕흠,배준영,유경준,정우택',
      proposer_link: 'http://likms.assembly.go.kr/bill/coactorListPopup.do?billId=PRC_K2D2Y0Y8E1L9S1Z8I3M3B2O5J1Y8T5',
      content: '제안이유 및 주요내용 현행법에 따르면, 공무원이 징계사유에 해당하는 경우 소속 장관 또는 임용권자에게 그 종류를 지정하여 징계를 요구할 수 있음. 그런데 공무원의 여러 비위 중 채용, 승진 등 인사와 관련된 비위는 공정의 가치를 심각하게 훼손하는 것으로서 중징계가 필요한 사안임. 한편, 현행법은 징계요구의 대상을 “「국가공무원법」과 그 밖의 법령에 규정된 징계 사유에 해당”하는 공무원으로 한정하고 있는데, 여기에 지방공무원과 공공기관의 직원을 명시함으로써 징계요구의 대상을 명확히 할 필요가 있음. 이에 징계요구의 대상에 지방공무원과 공공기관의 직원을 포함하도록 명시하는 한편, 인사 관련 비위의 중대성을 감안하여 인사 관련 비위로 징계 요구 등을 하는 경우에는 반드시 중징계를 요구하도록 하려는 것임(안 제32조).',
      result: '철회',
      result_cd: '철회',
      hashtag: '#징계#공무원#채용',
    },
    {
      id: 'PRC_S2P2C0M9U0Y1I1E7U1R9H2B9P5L6R8',
      bill_num: '2117230',
      title: '자동차관리법 일부개정법률안',
      created_at: new Date(2022, 8, 3),
      proposer: '박상혁의원 등 17인',
      party: '더불어민주당',
      main_proposer: '박상혁',
      proposer_array: '김윤덕,김정호,김주영,민형배,어기구,유기홍,이동주,이정문,이학영,이해식,정성호,조오섭,최인호,한준호,홍기원,홍성국',
      proposer_link: 'http://likms.assembly.go.kr/bill/coactorListPopup.do?billId=PRC_S2P2C0M9U0Y1I1E7U1R9H2B9P5L6R8',
      content: '제안이유 및 주요내용 현행법에서는 침수차의 불법 유통을 막기 위하여 수리비가 피보험차량 가액을 초과하는 전손 침수차량의 폐차 의무화를 규정하고 이를 위반한 경우 과태료를 부과하도록 하고 있음. 또한 시ㆍ도지사는 보험회사가 전손 처리한 자동차에 대하여 이전등록 신청을 받은 경우 수리검사를 받은 경우에 한정하여 이전등록을 수리하고 있음. 그런데 침수차 중 분손처리 되거나 자기차량손해 담보 특약에 가입하지 아니하는 경우에는 폐차 또는 검사를 받을 의무가 없기 때문에 제대로 수리되지 않거나 안전이 담보되지 않은 상태로 유통 될 가능성이 있어 중고차를 구매하는 소비자의 피해를 막기 위한 제도개선이 시급한 상황임. 이에 시장ㆍ군수ㆍ구청장은 천재지변ㆍ화재 또는 침수로 인하여 안전운행에 지장이 있다고 인정되는 자동차의 소유자에게 국토교통부장관이 실시하는 검사를 받도록 의무화하고 위반 시 처벌함으로써 침수차에 대한 관리를 강화하려는 것임(제37조제1항제5호 신설 등).',
      hashtag: '#공무원#자동차#보험',
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bill', null, {});
  }
};
