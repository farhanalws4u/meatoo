import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./src/reducers";
import Auth from "./src/Screens/Auth";
import GettingStarted from "./src/Screens/GettingStarted";

export default function App() {
  const store = createStore(reducers, compose(applyMiddleware(thunk)));

  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Auth"
            component={Auth}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="GettingStarted"
            component={GettingStarted}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
});
