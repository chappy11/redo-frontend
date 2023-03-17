export const convertMoney = (money: string) => {
  const flot = parseFloat(money);

  return flot.toFixed(2);
};
