import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import CustomButton from "../components/CustomButton";
import { NativeBaseProvider } from "native-base";
import PhoneInput from "react-native-phone-number-input";
import * as Google from "expo-google-app-auth";

export default function GettingStarted() {
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

  // id for meatoo from farhanoffcial account
  const clientId =
    "286431085823-3as8armea9ckqgadhj1n3e86erg9la9r.apps.googleusercontent.com";

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        behavior: "web",
        // iosClientId: IOS_CLIENT_ID,
        androidClientId: clientId,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log(result.user);
        // navigation.navigate('profile',{result.user,result.accesToken})
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  const signInWithGoogle = () => {
    signInWithGoogleAsync();
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
        enabled={Platform.OS === "ios" ? true : false}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/images/logoLight.png")}
          />
        </View>
        <View style={styles.phoneInputParentContainer}>
          <PhoneInput
            layout="first"
            defaultCode="IN"
            autoFocus
            containerStyle={styles.phoneInputContainer}
            textContainerStyle={styles.phoneInputTextContainer}
            textInputStyle={styles.phoneInputTextStyle}
            codeTextStyle={styles.phoneInputCodeText}
          />
        </View>
        <View style={styles.otpButtonContainer}>
          <CustomButton
            title={"Send OTP"}
            styles={styles.otpButton}
            textStyling={styles.otpButtonText}
          />
        </View>
        <View style={styles.dividerContainer}>
          <View style={{ flex: 1, height: 2, backgroundColor: "#ffffff" }} />
          <View>
            <Text
              style={{
                width: 50,
                textAlign: "center",
                color: "#ffffff",
                fontFamily: "Axiforma-Bold",
              }}
            >
              OR
            </Text>
          </View>
          <View style={{ flex: 1, height: 2, backgroundColor: "#ffffff" }} />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Continue with Email"
            textStyling={{
              fontFamily: "Axiforma-Regular",
              color: "#FF4B3A",
              fontSize: 17,
            }}
            iconName="email"
            iconStyles={styles.mailIcon}
          />
        </View>
        <View style={styles.googleButtonContainer}>
          <CustomButton
            title={"Google Login"}
            iconStyles={styles.googleIcon}
            iconName="google"
            styles={styles.googleButton}
            textStyling={styles.googleButtonText}
            onPress={() => signInWithGoogle()}
          />
        </View>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF4B3A",
  },

  logo: {
    position: "absolute",
    left: "16.5%",
    top: 80,
  },
  logoText: {
    fontSize: 50,
    fontFamily: "Axiforma-Bold",
    color: "#f5f5f7",
    position: "absolute",
    left: 51,
    top: 160,
    lineHeight: 65,
  },
  buttonContainer: {
    position: "absolute",
    top: "76%",
    left: "10%",
  },
  googleButtonContainer: {
    position: "absolute",
    top: "85%",
    left: "10%",
  },
  googleButtonText: {
    color: "#FF4B3A",
    fontSize: 17,
    fontFamily: "Axiforma-Regular",
  },
  googleButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    width: 312,
  },

  googleIcon: {
    marginRight: 7,
    color: "#FF4B3A",
    transform: [{ translateY: -1.8 }],
  },
  mailIcon: {
    color: "#FF4B3A",
    marginRight: 15,
  },
  phoneInputParentContainer: {
    position: "absolute",
    top: "50%",
    left: "10%",
  },
  phoneInputContainer: {
    borderRadius: 50,
  },
  phoneInputTextContainer: {
    borderRadius: 50,
  },
  phoneInputTextStyle: {
    fontFamily: "Axiforma-Regular",
  },
  phoneInputCodeText: {
    fontFamily: "Axiforma-Regular",
  },
  otpButtonContainer: {
    position: "absolute",
    left: "10%",
    top: "60%",
  },
  otpButton: {
    backgroundColor: "#FF4B3A",
    borderWidth: 2,
    borderColor: "#ffffff",
    paddingVertical: 12,
    width: 312,
  },
  otpButtonText: {
    color: "#ffffff",
    fontFamily: "Axiforma-Regular",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: "70%",
  },
});
