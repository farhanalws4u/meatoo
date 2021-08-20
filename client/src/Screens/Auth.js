import React from "react";
import { StyleSheet, View, Image } from "react-native";
import TabViewForAuth from "../components/TabViewForAuth";

export default function Auth() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logoDark.png")}
        />
      </View>
      <TabViewForAuth />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#ffffff",
  },
  logoContainer: {
    flex: 0.45,
    width: "100%",
    backgroundColor: "#ffffff",
  },
  logo: {
    position: "absolute",
    left: "17.8%",
    top: "45%",
    width: "64%",
    height: 80,
  },
});
