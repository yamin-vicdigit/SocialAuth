import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import LottieView from "lottie-react-native";

GoogleSignin.configure({
  webClientId:
    "802814432593-d628l7uktv5h7df5r83d4127t0snnf5e.apps.googleusercontent.com",
});

export default function Login() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userDetails, setUserDetails] = useState({});

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    setUserDetails(await auth().signInWithCredential(googleCredential));
  };

  const onFacebookButtonPress = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      if (result.isCancelled) {
        throw "User cancelled the login process";
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw "Something went wrong obtaining access token";
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      // Sign-in the user with the credential
      setUserDetails(await auth().signInWithCredential(facebookCredential));
    } catch (error) {
      console.log(error);
    }
  };

  if (initializing) return null;

  const signOut = async () => {
    try {
      userDetails?.additionalUserInfo?.providerId === "google.com" &&
        (await GoogleSignin.revokeAccess());
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <View
        style={{
          paddingTop: 100,
          paddingBottom: 25,
          paddingLeft: 15,
          paddingRight: 15,
        }}
      >
        <Text>Login</Text>
        <GoogleSigninButton
          onPress={onGoogleButtonPress}
          style={{ width: "100%", height: 65 }}
        />
        <Button title="Facebook Sign-In" onPress={onFacebookButtonPress} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>providerId: {userDetails?.additionalUserInfo?.providerId}</Text>
      <Text>Welcome, {user.displayName}</Text>
      <Image
        source={{ uri: user.photoURL }}
        style={{ width: 300, height: 200, borderRadius: 100 }}
      />
      <Button title={"Log Out"} onPress={signOut} />
      <LottieView
        autoPlay
        style={{
          width: 50,
          height: 50,
          backgroundColor: "#eee",
        }}
        source={require("../assets/exact-timer-loader.json")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 100,
    paddingBottom: 25,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
