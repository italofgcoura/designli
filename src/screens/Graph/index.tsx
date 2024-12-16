import React from 'react';

import watchListHOC from '../../hoc/WatchListHOC';
import {Text} from 'react-native';

function Graph() {
  return <Text style={{fontFamily: 'Roboto-Light'}}>graph</Text>;
}

const GraphView = watchListHOC(Graph);

export default GraphView;
