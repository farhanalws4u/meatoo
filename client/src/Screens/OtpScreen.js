import React, { useContext, useState } from "react";
import { Text, TextInput, Button } from "react-native";
import firebase from "firebase";
import { verificationIdContext } from "../providers/VerificationIdProvider";

const OtpScreen = () => {
  const { verificationId, setVerificationId } = useContext(
    verificationIdContext
  );
  const [verificationCode, setVerificationCode] = useState();

  return (
    <>
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificationId}
        placeholder="123456"
        onChangeText={setVerificationCode}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            const phoneAuthResult = await firebase
              .auth()
              .signInWithCredential(credential);
            console.log(phoneAuthResult);
            alert("phone authentication successful.");
          } catch (err) {
            console.log(err);
            alert(err.message);
          }
        }}
      />
    </>
  );
};

export default OtpScreen;
