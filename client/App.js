import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./src/reducers";
import GettingStarted from "./src/Screens/GettingStarted";
import VerificationIdProvider from "./src/providers/VerificationIdProvider";
import Home from "./src/Screens/Home ";

export default function App() {
  const store = createStore(reducers, compose(applyMiddleware(thunk)));

  const Stack = createStackNavigator();

  return (
    <VerificationIdProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              options={{ headerShown: false }}
              name="GettingStarted"
              component={GettingStarted}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Home}
            />
            {/* <Stack.Screen
              options={{ headerShown: false }}
              name="Auth"
              component={Auth}
            /> */}
            {/* <Stack.Screen
              options={{ headerShown: false }}
              name="PhoneAuth"
              component={PhoneAuth}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="OtpScreen"
              component={OtpScreen}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </VerificationIdProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
});
