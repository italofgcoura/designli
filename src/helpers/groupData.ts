import {StockValues} from '../types/finhub';

export default (data: StockValues[]) => {
  return data.reduce<Record<string, StockValues>>((acumulator, stock) => {
    if (!acumulator[stock.s] || stock.t > acumulator[stock.s].t) {
      acumulator[stock.s] = stock;
    }
    return acumulator;
  }, {});
};
