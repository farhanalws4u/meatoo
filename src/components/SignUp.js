import React, { useState } from "react";
import { StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import CustomButton from "./CustomButton";

import {
  NativeBaseProvider,
  Box,
  VStack,
  FormControl,
  Input,
  HStack,
} from "native-base";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  let loadingFonts = () => {
    // loading our fonts......
    return Font.loadAsync({
      "Axiforma-Bold": require("../assets/fonts/Axiforma-Bold.ttf"),
      "Axiforma-Regular": require("../assets/fonts/Axiforma-Regular.ttf"),
      "Axiforma-Thin": require("../assets/fonts/Axiforma-Thin.ttf"),
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
    <NativeBaseProvider>
      <Box safeArea flex={1} p={2} mt={5} w="90%" mx="auto">
        <VStack space={2} mt={5}>
          <FormControl>
            <FormControl.Label
              _text={{
                color: "#919191",
                fontSize: "sm",
                fontWeight: 600,
                fontFamily: "Axiforma-Regular",
                marginBottom: -20,
              }}
            >
              Email
            </FormControl.Label>
            <Input type="text" variant="underlined" style={styles.input} />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: "#919191",
                fontSize: "sm",
                fontWeight: 600,
                fontFamily: "Axiforma-Regular",
                marginBottom: -20,
              }}
            >
              Password
            </FormControl.Label>
            <Input type="password" variant="underlined" style={styles.input} />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: "#919191",
                fontSize: "sm",
                fontWeight: 600,
                fontFamily: "Axiforma-Regular",
                marginBottom: -20,
              }}
            >
              Confirm Password
            </FormControl.Label>
            <Input type="password" variant="underlined" style={styles.input} />
          </FormControl>
          <VStack space={2} mt={5}>
            <CustomButton
              title="Sign Up"
              styles={styles.button}
              textStyling={styles.buttonText}
            />

            {/* <HStack justifyContent="center" alignItem="center">
              <CustomButton
                title={"Google Login"}
                iconStyles={styles.buttonIcon}
                iconName="google"
                styles={styles.googleButton}
                textStyling={styles.googleButtonText}
              />
            </HStack> */}
          </VStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginLeft: "3%",
    backgroundColor: "#FA4A0C",
    marginTop: 12,
  },
  buttonText: {
    color: "#F6F6F9",
    fontSize: 17,
    fontFamily: "Axiforma-Regular",
  },
  googleButtonText: {
    color: "#FA4A0C",
    fontSize: 17,
    fontFamily: "Axiforma-Regular",
  },
  googleButton: {
    backgroundColor: "#ffffff",
    marginTop: 15,
    borderWidth: 2,
    borderColor: "#FA4A0C",
    paddingVertical: 16,
    width: 312,
  },
  buttonIcon: {
    marginRight: 7,
    color: "#FA4A0C",
    transform: [{ translateY: -1.8 }],
  },
  input: {
    marginBottom: 10,
  },
});
