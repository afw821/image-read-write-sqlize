module.exports = function (connection, Sequelize) {
    const Product = connection.define('Product', {

        // Giving the Product model a name of type STRING
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate :{
                len: [2, 50],
                notNull: true
            }
        },
        inStock: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: true,
                isNumeric: true
            }
        },
        data: {
            type: Sequelize.BLOB("long"),
        },
        dataType: {
            type: Sequelize.STRING,
        },
        dataName: {
            type: Sequelize.STRING
        },
        imgSrc: {
            type: Sequelize.STRING
        }

    });


    return Product;

};