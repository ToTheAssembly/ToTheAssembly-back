module.exports = (sequelize, Datatypes) => (
    sequelize.define('member', {
        id:{
            type: Datatypes.STRING(20),
            primaryKey: true,
        },
        name: {
            type: Datatypes.STRING(10),
        },
        hj_name:{
            type: Datatypes.STRING(20),
        },
        bth_sl: {
            type: Datatypes.STRING(5),
        },
        bth_date: {
            type: Datatypes.STRING(20),
        },
        position: {
            type: Datatypes.STRING(20),
        },
        party: {
            type: Datatypes.STRING(20),
        },
        origin: {
            type: Datatypes.STRING(20),
        },
        election: {
            type: Datatypes.STRING(20),
        },
        main_committee: {
            type: Datatypes.STRING(50),
        },
        committees_array: {
            type: Datatypes.STRING(200),
        },
        gender: {
            type: Datatypes.STRING(5),
        },
        phone: {
            type: Datatypes.STRING(20),
        },
        email: {
            type: Datatypes.STRING(50),
        },
        homepage: {
            type: Datatypes.STRING(100),
        },
        image: {
            // 의원 사진 URL
            type: Datatypes.STRING(200),
        },
    }, {
        timestamps: false,
        // 데이터베이스 문자열을 한글을 지원하는 UTF8로 설정하겠다는 뜻
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
);