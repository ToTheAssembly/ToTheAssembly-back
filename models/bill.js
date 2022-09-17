module.exports = (sequelize, Datatypes) => (
    sequelize.define('bill', {
        id:{
            type: Datatypes.STRING(50),
            primaryKey: true,
        },
        bill_num: {
            type: Datatypes.STRING(20),
        },
        title:{
            type: Datatypes.STRING(100),
        },
        committee: {
            type: Datatypes.STRING(50),
        },
        created_at: {
            type: Datatypes.DATEONLY,
            allowNull: false,
            defaultValue: Datatypes.NOW,
            //type: Datatypes.DATEONLY,
        },
        detail_link: {
            type: Datatypes.STRING(150),
        },
        proposer: {
            // ㅇㅇㅇ외 100인
            type: Datatypes.STRING(20),
        },
        party: {
            type: Datatypes.STRING(20),
        },
        main_proposer: {
            type: Datatypes.STRING(10),
        },
        proposer_array: {
            type: Datatypes.STRING(200),
        },
        proposer_link: {
            type: Datatypes.STRING(150),
        },
        content: {
            type: Datatypes.STRING(700),
        },
        result: {
            // 처리상태
            type: Datatypes.STRING(50),
        },
        result_cd: {
            // 표결결과
            type: Datatypes.STRING(20),
        },
        hashtag: {
            type: Datatypes.STRING(60),
        },
    }, {
        timestamps: false,
        // 데이터베이스 문자열을 한글을 지원하는 UTF8로 설정하겠다는 뜻
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
);