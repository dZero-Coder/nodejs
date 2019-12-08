const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/* db 객체에 User, Comment 모델을 담기 */
db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

/* 관계 설정 */
// 1:1 관계
//db.User.hasOne(db.Info, {foreignKey: 'user_id', sourceKey: 'id'});
//db.Info.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'id'});

// 1:N 관계
db.User.hasMany(db.Comment, {foreignKey: 'commenter', sourceKey: 'id'});
db.Comment.belongsTo(db.User, {foreignKey: 'commenter', targetKey: 'id'});

// N:M 관계
// Post(id, content), PostHashtag(postId, hashtagId), Hashtag(id, title)
//db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
//db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'});

module.exports = db;