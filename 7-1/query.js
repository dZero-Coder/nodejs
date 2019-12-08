// INSERT INTO nodejs.users(name, age, married, comment) VALUES('zero', 24, 0, '자기소개1');
const { User } = require('../models')
User.create({
    name: 'zero',
    age: 24,
    married: false,
    comment: '자기소개1',
});

// SELECT * FROM nodejs.users;
User.findAll({});

// SELECT * FROM nodejs.users LIMIT 1;
User.find({});

// SELECT name, married FROM nodejs.users;
User.findAll({
    attributes: ['name', 'married'],
});

// SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
const { User, Sequelize: {Op} } = require('../models');
User.findAll({
    attributes: ['name', 'age'],
    where: {
        married: 1,
        age: { [Op.gt]: 30},
    },
});

/*
    Sequelize 객체 내부의 Op 객체를 불러와 연산자를 사용
        Op.gt(초과), Op.gte(이상), Op.lt(미만), Op.lte(이하)
        Op.ne(같지않음), Op.or(또는), Op.in(배열 요소 중 하나), Op.notIn(배열 요소와 모두 다름)
*/

// SELECT id, name FROM users WHERE married = 0 OR age > 30;
const { User, Sequelize: {Op} } = require('../models');
User.findAll({
    attributes: ['id', 'name'],
    where: {
        [Op.or]: [{married: 0}, {age: {[Op.gt]: 30} }],
    },
});

// SELECT id, name FROM users ORDER BY age DESC;
User.findAll({
    attributes: ['id', 'name'],
    order: [['age', 'DESC']],
});

// SELECT id, name FROM users ORDER BY age DESC LIMIT 1 OFFSET 1;
User.findAll({
    attributes: ['id', 'name'],
    order: [['age', 'DESC']],
    limit: 1,
    offset: 1,
});

// UPDATE users SET comment = '바꿀내용' WHERE id = 2;
User.update({
    comment: '바꿀내용',   
}, {
    where: {id: 2},
});

// DELETE FROM users WHERE id = 2;
User.destory({
    where: {id: 2},
});