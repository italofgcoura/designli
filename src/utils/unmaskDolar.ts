const unmask = (maskedValue: string) => {
  const unmaskedValue = maskedValue.replace(/[$.\s]/g, '').replace(',', '.');

  return parseFloat(unmaskedValue);
};

export default unmask;
