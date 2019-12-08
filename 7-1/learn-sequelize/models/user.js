module.exports = (sequalize, DataTypes) => {
    return sequalize.define('user', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        age: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        married: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        comment:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        create_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequalize.literal('now()'),
        },
    },  {  
        timestamps: false,
    });
}

/*
    - 시퀄라이즈는 알아서 id를 기본키로 연결하므로 id 칼럼은 적을 필요가 없음
    - sequlize.define() : 테이블명과 각 칼럼의 스펙을 입력 (mariadb와 일치해야 함)
        첫번째 인자 : 테이블명
        두번째 인자 : 칼럼 옵션
            VARCHAR → STRING
            INT → INTEGER   (INTEGER.UNSIGEND : UNSIGNED 옵션이 적용된 INT)
            TINYINT → BOOLEAN
            DATETIME → DATE
            NOT NULL → allowNull: false
            UNIQUE → unique: true
            defaultValue : 기본값 (sequelize.literal 메서드 안에 넣어서 입력)
        세번째 인자 : 테이블 옵션
            timestamps: 자동으로 날짜 칼럼 생성 여부
                true : createdAt, updateAt 칼럼을 추가 o
                false : createdAt, updateAt 칼럼을 추가 x
            
            paranoid : deletedAt 칼럼 생성 여부 (timestamps : true인 경우만 가능)
                deletedAt은 백업용으로 주로 사용됨 (조회 : deletedAt 칼럼이 null인 row만 조회)
            
            underscored : 시퀄라이즈가 자동 생성해주는 칼럼(createAt, updateAt 등)을 _을 사용하는 방식으로 변경
                ex) createAt → create_at
            
            tableName : 테이블 이름을 다른 것으로 설정하고 싶을 때 사용
                시퀄라이즈는 기본적으로 첫번째 인자를 복수형으로 만들어 테이블 이름으로 사용 ex) user → users
*/