import notifee, {AndroidImportance} from '@notifee/react-native';
import {Stock} from '../types/finhub';

async function onCreateTriggerNotification(stock: Stock) {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: `${stock.symbol ?? 'Your stock'} has a price alert`,
    body: `${stock.symbol ?? 'Stock'} is below the value of ${
      stock.priceAlertValue && `of ${stock.priceAlertValue}`
    } `,
    android: {
      channelId,
    },
  });
}

export default onCreateTriggerNotification;
