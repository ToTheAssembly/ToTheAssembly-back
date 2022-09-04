module.exports = (sequelize, Datatypes) => (
    sequelize.define('hashtag', {
        name: {
            type: Datatypes.STRING(20),
            primaryKey: true,
        },
    }, {
        // 모든 모델에 넣어야됨! 데이터베이스 문자열을 한글을 지원하는 UTF8로 설정하겠다는 뜻
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
);