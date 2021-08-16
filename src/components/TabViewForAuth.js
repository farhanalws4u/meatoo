import React, { useState } from "react";
import { useWindowDimensions, Text, StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const FirstRoute = () => <SignIn />;

const SecondRoute = () => <SignUp />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TabViewExample() {
  // fonts
  const [fontLoaded, setFontLoaded] = useState(false);

  let loadingFonts = () => {
    // loading our fonts......
    return Font.loadAsync({
      "Axiforma-Bold": require("../assets/fonts/Axiforma-Bold.ttf"),
      "Axiforma-Regular": require("../assets/fonts/Axiforma-Regular.ttf"),
      "Axiforma-Thin": require("../assets/fonts/Axiforma-Thin.ttf"),
    });
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Log In" },
    { key: "second", title: "Sign Up" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: "#FA4A0C",
        height: 3,
        width: 130,
        marginLeft: "7%",
        borderRadius: 70,
      }}
      style={{
        backgroundColor: "#ffffff",
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
      }}
      renderLabel={({ route }) => (
        <Text style={styles.tabLinks}>{route.title}</Text>
      )}
    />
  );

  if (!fontLoaded) {
    // if fonts are not loaded......
    return (
      <AppLoading
        startAsync={loadingFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  tabLinks: {
    color: "#000000",
    fontFamily: "Axiforma-Bold",
    fontSize: 16,
  },
});
