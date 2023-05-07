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
  //purchase price = 3000
  depAmount = purchaseP * percent;   //300
 
  let x = purchaseP - depAmount; //2700
  let y = x / numberYears; //2 yers // 1350

  return y / salvageLevel; // 1350 / 2 = 337.5
};
