type Stock = {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  isin: null;
  mic: string;
  shareClassFIGI: string;
  symbol: string;
  symbol2: string;
  type: string;
  priceAlertValue?: string;
};

type StockValues = {
  c: any;
  p: number;
  s: string;
  t: number;
  v: number;
};

export type {Stock, StockValues};
