import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../designSystem';
import {Stock} from '../../types/finhub';

export default ({
  stock,
  storedValues,
  calculatePercentageChange,
  watchList,
}: {
  stock: any;
  storedValues: any;
  calculatePercentageChange: any;
  watchList: Stock[];
}) => {
  let PERCENTAGE = '0.00';

  const INITIAL = storedValues?.find(i => i?.s === stock.s)?.p;
  const FINAL = stock.p;

  if (storedValues.length) {
    PERCENTAGE = calculatePercentageChange(INITIAL, FINAL);
  }
  let cardStyle = {...styles.item};

  let percentageValue = PERCENTAGE?.difference?.toFixed(2);

  if (PERCENTAGE.type === 'down') {
    cardStyle = {...styles.item, backgroundColor: Colors.accent};
  }

  return (
    <View style={cardStyle}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Name: <Text style={styles.text2}>{stock?.s}</Text>
        </Text>
        <Text style={styles.text2}>$ {stock?.p?.toFixed(2)}</Text>
      </View>
      <Text style={styles.text2}>{percentageValue ?? '0.00'} %</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 4,
    // height: 44,
    padding: 8,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: Colors.white,
    fontFamily: 'Roboto-Light',
    fontSize: 14,
  },
  text2: {
    color: Colors.white,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
});
