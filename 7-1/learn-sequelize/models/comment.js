module.exports = (sequlize, DataTypes) => {
    return sequlize.define('comment', {
        comment: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequlize.literal('now()'),
        },
    }, {
        timestamps: false,
    });
}