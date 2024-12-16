import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {getStocks, saveStockToWatch} from '../../services/finhub';
import {Stock} from '../../types/finhub';

import PageWrapper from '../../components/PageWrapper';

import {Colors, CustomButton, CustomInput} from '../../designSystem';
import {StyleSheet, Text, View} from 'react-native';
import StockList from './StockList';
import formatDollar from '../../utils/formatToDolar';
import unmask from '../../utils/unmaskDolar';

export default () => {
  const [stockToWatch, setStockToWatch] = useState<Stock | null>(null);
  const [stockValue, setStockValue] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const [stocks, setStocks] = useState<Stock[] | []>([]);

  const stocksRef = useRef<Stock[] | null>(null);

  useEffect(() => {
    (async () => {
      const stocksTemp = await getStocks();
      setStocks(stocksTemp);
      stocksRef.current = stocksTemp;
    })();
  }, []);

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

  const onSave = async () => {
    if (stockToWatch) {
      await saveStockToWatch({...stockToWatch, priceAlertValue: stockValue});
      setStockToWatch(null);
    }
  };

  const onSelectStock = (stock: Stock) => {
    setStockToWatch(stock);
  };

  const handleInputChange = (value: string) => {
    const formattedValue = formatDollar(value);
    unmask(`$ ${formattedValue}`);
    setStockValue(`$ ${formattedValue}`);
  };

  return (
    <PageWrapper>
      <View style={styles.container}>
        <View style={{gap: 8}}>
          <Text style={{fontFamily: 'Roboto-Light'}}>
            Select one stock to watch
          </Text>
          <CustomInput
            onChangeText={setFilter}
            placeholder="Type the stock symbol"
          />
        </View>

        <StockList
          data={stocks}
          onButtonPress={onSelectStock}
          buttonTitle={'Select'}
          stockToWatch={stockToWatch || null}
        />

        {stockToWatch && (
          <View style={{gap: 8, marginTop: 16}}>
            <Text style={{color: Colors.primary}}>Type an alert value:</Text>
            <CustomInput
              onChangeText={handleInputChange}
              value={stockValue}
              placeholder="$ 0.00"
              keyboardType="numeric"
            />
            <CustomButton onPress={onSave}>save</CustomButton>
          </View>
        )}
      </View>
    </PageWrapper>
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
