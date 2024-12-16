import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import watchListHOC from '../../hoc/WatchListHOC';
import ListItem from './ListItem';
import {Colors} from '../../designSystem';
import {getStockMarketStatus} from '../../services/finhub';
import MarketClosed from './MarketClosed';

function WatchList({watchList, storedValues, calculatePercentageChange}: any) {
  const [loadingStockMarket, setLoadingStockMarket] = useState<boolean>(true);

  const [marketStatus, setMarketStatus] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setMarketStatus(await getStockMarketStatus());
      setLoadingStockMarket(false);
    })();
  }, []);

  if (!loadingStockMarket && !marketStatus) {
    return <MarketClosed />;
  }

  return (
    <FlatList
      data={watchList}
      keyExtractor={item => item.s}
      renderItem={({item}) => (
        <ListItem
          stock={item}
          storedValues={storedValues}
          calculatePercentageChange={calculatePercentageChange}
          watchList={watchList}
        />
      )}
      style={{marginVertical: 24}}
      ListEmptyComponent={() => (
        <View>
          <Text style={{color: Colors.accent}}>
            You didn't select any stock to watch yet
          </Text>
        </View>
      )}
    />
  );
}

const WatchListView = watchListHOC(WatchList);

export default () => {
  return <WatchListView />;
};
