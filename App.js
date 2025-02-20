import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          <AppNavigator />
       </Provider>

    </GestureHandlerRootView>
  );
};

export default App;
