const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cart = sequelize.define('Cart', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Cart.associate = (models) => {
    Cart.hasMany(models.CartItem, { foreignKey: 'cartId' });
  };

  return Cart;
};
