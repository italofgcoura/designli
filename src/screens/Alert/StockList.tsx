import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../designSystem';
import {Stock} from '../../types/finhub';

type Props = {
  data: Stock[];
  buttonTitle: string;
  stockToWatch?: Stock | null;
  listTitle?: string;
  onButtonPress?: (stock: Stock) => void;
};

export default ({
  onButtonPress,
  data,
  listTitle,
  buttonTitle,
  stockToWatch,
}: Props) => {
  return (
    <>
      <Text style={{color: Colors.main_text, fontSize: 20}}>{listTitle}</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.displaySymbol}
        style={styles.flatListStyle}
        renderItem={({item}) => (
          <Item
            stock={item}
            onButtonPress={onButtonPress}
            buttonTitle={buttonTitle}
            stockToWatch={stockToWatch}
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={styles.separatorComponent} />
        )}
        ListEmptyComponent={() => (
          <View>
            <Text style={{fontFamily: 'Roboto-Light'}}>No items to show</Text>
          </View>
        )}
      />
    </>
  );
};

const Item = ({
  stock,
  onButtonPress,
  stockToWatch,
}: {
  stock: Stock;
  buttonTitle: string;
  stockToWatch?: Stock | null;
  onButtonPress?: (stock: Stock) => void;
}) => {
  const Wrapper = onButtonPress ? TouchableOpacity : View;

  return (
    <Wrapper
      style={[
        styles.stockCard,
        stockToWatch?.symbol === stock.symbol && styles.selected,
      ]}
      onPress={() => onButtonPress && onButtonPress(stock)}>
      <Text style={styles.fieldName}>
        Name:
        <Text style={styles.fieldValue}> {stock.displaySymbol}</Text>
      </Text>
      <Text style={styles.fieldName}>
        Description: <Text style={styles.fieldValue}>{stock.description}</Text>
      </Text>
      {stock.priceAlertValue && (
        <Text style={styles.fieldName}>
          Price alert value:{' '}
          <Text style={styles.fieldValue}>{stock.priceAlertValue}</Text>
        </Text>
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  stockCard: {
    padding: 4,
    marginVertical: 8,
  },
  selected: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  fieldName: {
    fontFamily: 'Roboto-Light',
    color: Colors.main_text,
  },
  fieldValue: {
    fontFamily: 'Roboto-Bold',
  },
  text: {
    fontFamily: 'Roboto-Bold',
    color: Colors.primary,
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    marginVertical: 8,
    alignSelf: 'flex-end',
  },
  flatListStyle: {
    borderWidth: 1,
    borderColor: Colors.gray.border,
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  separatorComponent: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.gray.light,
  },
});
