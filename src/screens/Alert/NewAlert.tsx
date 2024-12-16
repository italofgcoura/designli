import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Stock} from '../../types/finhub';
import StockList from './StockList';
import {Colors, CustomButton, CustomInput} from '../../designSystem';
import {getStocks} from '../../services/finhub';

type Props = {
  onButtonPress(stock: Stock): Promise<void>;
  showAddNewAlertModal: boolean;
  onShowAddNewAlertModal(): void;
};

export default ({onButtonPress, onShowAddNewAlertModal}: Props) => {
  const [filter, setFilter] = useState<string>('');
  const [stocks, setStocks] = useState<Stock[] | []>([]);

  const stocksRef = useRef<Stock[] | null>(null);

  useEffect(() => {
    if (filter && stocksRef.current) {
      const result = stocksRef.current.filter(item =>
        item.symbol.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
      );
      if (result) {
        setStocks(result);
        return;
      }
    }

    if (stocksRef.current) {
      setStocks(stocksRef.current);
    }
  }, [filter]);

  useEffect(() => {
    (async () => {
      const stocksTemp = await getStocks();
      setStocks(stocksTemp);
      stocksRef.current = stocksTemp;
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{fontFamily: 'Roboto-Light'}}>
        Select one stock to watch
      </Text>
      <CustomInput onChangeText={setFilter} placeholder="Symbol of the stock" />

      <StockList
        data={stocks}
        onButtonPress={onButtonPress}
        buttonTitle={'Select'}
      />

      <CustomButton onPress={onShowAddNewAlertModal}>close</CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray.background,
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});
