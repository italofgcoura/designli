import React, {useEffect} from 'react';
import Navigation from './src/navigation';
import {Auth0Provider} from 'react-native-auth0';

import {Provider} from 'react-redux';
import {store} from './src/redux/store';

import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Auth0Provider
      domain={'dev-ypcnkyoui31am8es.us.auth0.com'}
      clientId={'JOgeqgLBAk6ej72rI724TMHmf9F9RwDJ'}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </Auth0Provider>
  );
};

export default App;
