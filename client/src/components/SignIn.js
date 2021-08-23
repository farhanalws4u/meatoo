import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { auth, getUserDocument } from "../firebase/index";
import { Link } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import CustomButton from "./CustomButton";

import {
  NativeBaseProvider,
  Box,
  VStack,
  FormControl,
  Input,
} from "native-base";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

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

  const handleChange = (inputName, value) => {
    setFormData({ ...formData, [inputName]: value });
  };

  const handleSubmit = async () => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(
        formData.email.trim(),
        formData.password
      );

      const currentUser = await getUserDocument(user.uid);

      console.log(currentUser);
    } catch (e) {
      console.log(e);
      Alert.alert("Oops", e.message);
    }
  };

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
              Email Address
            </FormControl.Label>
            <Input
              type="text"
              variant="underlined"
              style={styles.input}
              name="email"
              onChangeText={(value) => handleChange("email", value)}
              defaultValue={email}
            />
          </FormControl>

          <FormControl mb={5}>
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
            <Input
              type="password"
              variant="underlined"
              style={styles.input}
              name="password"
              onChangeText={(value) => handleChange("password", value)}
              defaultValue={password}
            />

            <Link style={styles.forgotPass}>Forget Password?</Link>
          </FormControl>
          <VStack space={2}>
            <CustomButton
              title="Log In"
              styles={styles.logInButton}
              textStyling={styles.buttonText}
              onPress={handleSubmit}
            />
          </VStack>
          {/* render this conditionaly when user got the 'dont have an account error from the server' */}
          {/* <HStack justifyContent="center" style={{ marginTop: 100 }}> ren
            <Text
              fontSize="sm"
              color="muted.700"
              fontWeight={400}
              style={{ fontFamily: "Axiforma-Regular" }}
            >
              New user?&nbsp;{" "}
            </Text>
            <Link style={styles.signUpLink}>Sign Up</Link>
          </HStack> */}
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Axiforma-Bold",
    fontSize: 25,
  },
  logInButton: {
    marginLeft: "3%",
    backgroundColor: "#FA4A0C",
    marginTop: 12,
  },
  buttonText: {
    color: "#F6F6F9",
    fontSize: 17,
    fontFamily: "Axiforma-Regular",
  },
  buttonIcon: {
    marginRight: 7,
    color: "#FA4A0C",
    transform: [{ translateY: -1.8 }],
  },

  forgotPass: {
    marginTop: 15,
    color: "#FA4A0C",
    fontSize: 17,
    fontFamily: "Axiforma-Bold",
  },
  signUpLink: {
    fontFamily: "Axiforma-Bold",
    color: "#FA4A0C",
  },
  input: {
    marginBottom: 10,
  },
});
