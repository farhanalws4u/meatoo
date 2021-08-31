import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

const Menu = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>Title</Text>
        <Text>Price</Text>
        <Text>Description</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image />
        {/* conter */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 150,
    maxHeight: 200,
    backgroundColor: "skyblue",
    marginTop: 100,
  },
});

export default Menu;
