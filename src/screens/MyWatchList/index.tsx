import React, {useLayoutEffect} from 'react';
import {Text, View} from 'react-native';
import StockList from '../Alert/StockList';
import {Colors} from '../../designSystem';
import {getWatchList, removeStockFromWatchList} from '../../services/finhub';
import {Stock} from '../../types/finhub';
import {useState} from 'react';
import PageWrapper from '../../components/PageWrapper';
import {useIsFocused} from '@react-navigation/native';

export default () => {
  const [loadingStocks, setLoadingStocks] = useState<boolean>(false);
  const [myWatchList, setMyWatchList] = useState<Stock[] | []>();

  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    (async () => {
      setLoadingStocks(true);

      setMyWatchList(await getWatchList());

      setLoadingStocks(false);
    })();

    return () => setMyWatchList([]);
  }, [isFocused]);

  const onRemovePress = async (stock: Stock) => {
    const removeResult = await removeStockFromWatchList(stock);
    setMyWatchList(removeResult);
  };

  return (
    <PageWrapper>
      {loadingStocks ? (
        <View style={{flex: 1, backgroundColor: Colors.gray.background}}>
          <Text style={{fontFamily: 'Roboto-Light'}}>loading stocks...</Text>
        </View>
      ) : (
        <StockList
          data={myWatchList || []}
          onButtonPress={onRemovePress}
          listTitle="My watch list"
          buttonTitle="Remove"
        />
      )}
    </PageWrapper>
  );
};
