import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type RootParams = {
  alert: {stockName: string} | undefined;
  watchlist: undefined;
  graph: undefined;
  login: undefined;
  myWatchList: undefined;
};

export type RootStackScreenProps<T extends keyof RootParams> =
  BottomTabScreenProps<RootParams, T>;
