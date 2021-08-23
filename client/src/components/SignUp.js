import React, { useState } from "react";
import { auth, generateUserDocument } from "../firebase/index";
import { Alert, StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import CustomButton from "./CustomButton";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  NativeBaseProvider,
  Box,
  VStack,
  FormControl,
  Input,
} from "native-base";

export default function App() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (inputName, value) => {
    setFormData({ ...formData, [inputName]: value });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      return Alert.alert("Oops", "passwords doesn't match.");
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      const currentUser = await generateUserDocument(user, formData);

      console.log(currentUser);
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

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
      <Box
        style={styles.container}
        safeArea
        flex={1}
        p={2}
        mt={5}
        w="90%"
        mx="auto"
      >
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
              Full Name
            </FormControl.Label>
            <Input
              isRequired={true}
              type="text"
              variant="underlined"
              style={styles.input}
              name="fullName"
              onChangeText={(value) => handleChange("fullName", value)}
              defaultValue={fullName}
            />
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
              Email
            </FormControl.Label>
            <Input
              isRequired={true}
              type="email"
              variant="underlined"
              style={styles.input}
              name="email"
              onChangeText={(value) => handleChange("email", value)}
              defaultValue={email}
            />
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
            <Input
              isRequired={true}
              type="password"
              variant="underlined"
              style={styles.input}
              name="password"
              onChangeText={(value) => handleChange("password", value)}
              defaultValue={password}
            />
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
            <Input
              isRequired={true}
              type="password"
              variant="underlined"
              style={styles.input}
              name="confirmPassword"
              onChangeText={(value) => handleChange("confirmPassword", value)}
              defaultValue={confirmPassword}
            />
          </FormControl>
          <VStack space={2} mt={5}>
            <CustomButton
              title="Sign Up"
              styles={styles.button}
              textStyling={styles.buttonText}
              onPress={handleSubmit}
            />
          </VStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
