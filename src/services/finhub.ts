import AsyncStorage from '@react-native-async-storage/async-storage';
import {Stock, StockValues} from '../types/finhub';
import api from './api';

async function getStocks(): Promise<Stock[]> {
  console.log('getStocks');
  try {
    const result = await api.get('/stock/symbol?exchange=US');

    return result.data;
  } catch (error: any) {
    console.log(error);
    console.log(error.request);
    return [];
  }
}

async function saveStockToWatch(stock: Stock): Promise<void> {
  try {
    const stored = await AsyncStorage.getItem('watchList');

    const existingList: Stock[] = stored ? JSON.parse(stored) : [];

    const updatedWatchList = [...existingList, stock];

    await AsyncStorage.setItem('watchList', JSON.stringify(updatedWatchList));
  } catch (error: any) {
    console.log(error);
    console.log(error.request);
  }
}

async function removeStockFromWatchList(stock: Stock): Promise<Stock[]> {
  try {
    const stored = await AsyncStorage.getItem('watchList');

    if (stored) {
      const filtered: Stock[] = JSON.parse(stored).filter(
        (storedItem: Stock) => storedItem.symbol !== stock.symbol,
      );

      await removeFromStockValues(stock);
      await AsyncStorage.setItem('watchList', JSON.stringify(filtered));
      return filtered;
    }
    return [];
  } catch (error: any) {
    console.log(error);
    console.log(error.request);
    return [];
  }
}

async function getWatchList(): Promise<Stock[]> {
  try {
    const stored = await AsyncStorage.getItem('watchList');

    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  } catch (error: any) {
    console.log(error);
    console.log(error.request);
    return [];
  }
}

const getStoredStocksValues = async () => {
  try {
    const stored = await AsyncStorage.getItem('stockValues');

    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  } catch (error: any) {
    console.log(error);
    console.log(error.request);
    return [];
  }
};

const removeFromStockValues = async (stock: Stock) => {
  try {
    const stored: string | null = await AsyncStorage.getItem('stockValues');

    if (stored) {
      const filtered = JSON.parse(stored).filter(
        (item: StockValues) => item.s !== stock.symbol,
      );

      await AsyncStorage.setItem('stockValues', JSON.stringify(filtered));
    }
    return [];
  } catch (error: any) {
    console.log(error);
    console.log(error.request);
    return [];
  }
};

const storeStocksValues = async (stockValues: any[]) => {
  try {
    await AsyncStorage.setItem('stockValues', JSON.stringify(stockValues));
  } catch (error: any) {
    console.log(error);
    console.log(error.request);
    return [];
  }
};

type MarketStatus = {
  data: {
    exchange: string;
    holiday: null;
    isOpen: boolean;
    session: string;
    timezone: string;
    t: number;
  };
};

const getStockMarketStatus = async (): Promise<boolean> => {
  try {
    const {data}: MarketStatus = await api.get(
      '/stock/market-status?exchange=US',
    );

    return data.isOpen;
  } catch (error) {
    console.log('error');
    return false;
  }
};

export {
  getStocks,
  saveStockToWatch,
  removeStockFromWatchList,
  getWatchList,
  getStoredStocksValues,
  storeStocksValues,
  getStockMarketStatus,
};
