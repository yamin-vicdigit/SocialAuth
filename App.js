import "expo-dev-client";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import SplashScreen from "./components/SplashScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <SplashScreen/>
    </SafeAreaProvider>
  );
}
