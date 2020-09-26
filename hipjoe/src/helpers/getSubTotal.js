function sumArray(sum, num) {
  return sum + num;
}

const getSubTotal = items => {
  if (items.length) {
    const subtotals = items.map(item => item.price * item.qty);
    return subtotals.reduce(sumArray);
  }
  return 0;
};

export default getSubTotal;
