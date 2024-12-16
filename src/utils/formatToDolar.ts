const formatDollar = (value: string): string => {
  let unmaskedData = value.replace(/\D/g, '');
  let numericValue = (parseFloat(unmaskedData) / 100).toFixed(2);
  const amount = parseFloat(numericValue);
  return isNaN(amount)
    ? '$ 0.00'
    : numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export default formatDollar;
