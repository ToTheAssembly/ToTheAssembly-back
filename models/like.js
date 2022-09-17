module.exports = (sequelize, Datatypes) => (
    sequelize.define('like', {
        id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    }, {
        timestamps: true,
        // 데이터베이스 문자열을 한글을 지원하는 UTF8로 설정하겠다는 뜻
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
);