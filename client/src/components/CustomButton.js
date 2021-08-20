import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon, NativeBaseProvider } from "native-base";

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      activeOpacity={0.7}
      onPress={props.onPress}
      style={{ ...styles.button, ...props.styles }}
    >
      {props.iconName ? (
        <Icon
          as={<MaterialCommunityIcons name={props.iconName} />}
          color="muted.700"
          size="sm"
          style={props.iconStyles}
        />
      ) : null}

      <Text style={{ ...styles.buttonText, ...props.textStyling }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f5f5f7",
    paddingVertical: 14,
    width: 314,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  buttonText: {
    color: "#FF460A",
    fontSize: 17,
    textAlign: "center",
  },
});

export default CustomButton;
