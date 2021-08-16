import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { StyleSheet, SafeAreaView } from "react-native";
import * as Font from "expo-font";
import Auth from "./src/Screens/Auth";
import GettingStarted from "./src/Screens/GettingStarted";

export default function App() {
  // fonts
  const [fontLoaded, setFontLoaded] = useState(false);

  let loadingFonts = () => {
    // loading our fonts......
    return Font.loadAsync({
      "Axiforma-Bold": require("./src/assets/fonts/Axiforma-Bold.ttf"),
      "Axiforma-Regular": require("./src/assets/fonts/Axiforma-Regular.ttf"),
      "Axiforma-Thin": require("./src/assets/fonts/Axiforma-Thin.ttf"),
    });
  };

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
    <SafeAreaView style={styles.container}>
      {/* <GettingStarted /> */}
      <Auth />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
});
