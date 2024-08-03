const calculateTotal = (products) => {
  if (!Array.isArray(products)) {
    throw new TypeError('Expected an array of products');
  }

  return products.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);
}

module.exports = calculateTotal;
  