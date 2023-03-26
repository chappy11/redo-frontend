export const convertMoney = (money: string) => {
  const flot = parseFloat(money);

  return flot.toFixed(2);
};

export const calculateSalvagePrice = (
  purchasePrice: string,
  numberOfYears: string,
  salvaLevel: string
) => {
  const percent = 0.1;
  let depAmount = 0;
  const purchaseP = parseFloat(purchasePrice);
  const numberYears = parseInt(numberOfYears);
  const salvageLevel = parseInt(salvaLevel);

  depAmount = purchaseP * percent;
  // console.log(purchaseP);
  // return depAmount;
  let x = purchaseP - depAmount;
  let y = x / numberYears;

  return y / salvageLevel;
};
