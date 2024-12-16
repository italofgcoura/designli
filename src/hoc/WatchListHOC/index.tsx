import React, {useCallback, useEffect, useRef, useState} from 'react';

import {useIsFocused} from '@react-navigation/native';

import {Stock, StockValues} from '../../types/finhub';
import {
  getStoredStocksValues,
  getWatchList,
  storeStocksValues,
} from '../../services/finhub';

import onCreateTriggerNotification from '../../notifications';
import {webSocketToken} from '../../constants';
import groupData from '../../helpers/groupData';
import calculatePercentageChange from '../../helpers/calculatePercentageChange';
import PageWrapper from '../../components/PageWrapper';
import unmask from '../../utils/unmaskDolar';
import {CustomButton} from '../../designSystem';

const watchListHOC = (WatchListComponent: any) => {
  return () => {
    const isFocused = useIsFocused();

    const [watchList, setWatchList] = useState<StockValues[]>([]);

    const [storedValues, setStoredValues] = useState<StockValues[]>([]);

    const [stored, setStored] = useState<StockValues[]>([]);

    const alertValues = useRef<Stock[]>([]);

    const [loadingValues, setLoadingValues] = useState<boolean>(true);

    const isFirstRender = useRef<boolean>(true);

    const [connectionError, setConnectionError] = useState<boolean>(false);

    const setStock = useCallback(async (newStock: StockValues[]) => {
      setWatchList(prevWatchList => {
        const stockMap = new Map(prevWatchList.map(item => [item.s, item]));

        newStock.forEach(async stock => {
          stockMap.set(stock.s, stock);
        });

        return Array.from(stockMap.values());
      });

      setStoredValues(prevState => {
        const updatedValues = [...prevState];

        for (const stock of newStock) {
          let stockAlertValue = alertValues.current?.find(
            item => item.symbol === stock.s,
          );

          if (
            stockAlertValue &&
            stock.p < unmask(stockAlertValue?.priceAlertValue!) / 100
          ) {
            onCreateTriggerNotification(stockAlertValue);
          }

          if (!updatedValues.find(i => i.s === stock.s)) {
            updatedValues.push(stock);
          }
        }

        storeStocksValues([...updatedValues]);
        return updatedValues;
      });
    }, []);

    useEffect(() => {
      (async () => {
        const myWatchList: Stock[] = await getWatchList();

        if (myWatchList.length > 0) {
          alertValues.current = myWatchList;
          const temp: StockValues[] = myWatchList.map((i: Stock) => {
            return {s: i.symbol, p: 0, c: '', t: 0, v: 0};
          });

          setWatchList(temp);
          setStored(temp);

          if (isFirstRender.current) {
            isFirstRender.current = false;
            const result = await getStoredStocksValues();
            setStoredValues(result);
          }
          setLoadingValues(false);
          return;
        }
        setWatchList([]);
        setStored([]);
        setLoadingValues(false);
      })();
    }, [isFocused]);

    useEffect(() => {
      if (stored.length > 0 && !loadingValues) {
        connectToWebSocket();
      }
    }, [stored, isFocused, loadingValues]);

    useEffect(() => {}, []);

    const connectToWebSocket = () => {
      const socket: WebSocket = new WebSocket(
        `wss://ws.finnhub.io?token=${webSocketToken}`,
      );

      socket.addEventListener('open', function () {
        console.log('connected');
        if (connectionError) {
          setConnectionError(false);
        }

        stored.forEach(item =>
          socket.send(JSON.stringify({type: 'subscribe', symbol: item.s})),
        );
      });

      socket.addEventListener('error', error => {
        console.log('connection error', error);
        setConnectionError(true);
      });

      socket.addEventListener('message', function (event: MessageEvent) {
        processesData(event);
      });

      if (socket.readyState === WebSocket.OPEN) {
        stored.forEach(item =>
          socket.send(JSON.stringify({type: 'unsubscribe', symbol: item.s})),
        );
      }
      socket.close();
    };

    const processesData = (event: MessageEvent) => {
      const parsedData = JSON.parse(event.data);

      if (parsedData.data) {
        const result: StockValues[] = Object.values(groupData(parsedData.data));

        if (result) {
          setStock(result);
        }
      }
    };

    return (
      <PageWrapper>
        {connectionError && (
          <CustomButton onPress={() => connectToWebSocket()}>
            Try again
          </CustomButton>
        )}
        {!connectionError && (
          <WatchListComponent
            watchList={watchList}
            storedValues={storedValues}
            stored={stored}
            calculatePercentageChange={calculatePercentageChange}
          />
        )}
      </PageWrapper>
    );
  };
};

export default watchListHOC;
