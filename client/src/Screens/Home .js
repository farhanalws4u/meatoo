import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Menu from "../components/Menu";

const Home = () => {
  return (
    <View style={styles.container}>
      <Menu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },
});

export default Home;
