import { View, Text, Animated, Image, Dimensions } from "react-native";
import React, { useRef, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Login from "./Login";

const bgColor = "#4d4a95";

const SplashScreen = () => {
  // SafeArea Value
  const insets = useSafeAreaInsets();

  // Animation Value
  const startAnimation = useRef(new Animated.Value(0)).current;

  // Scaling drown both logo and title
  const scaleLogo = useRef(new Animated.Value(1)).current;
  const scaleTitle = useRef(new Animated.Value(1)).current;

  // Offset animation...
  const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  // Animation content...
  const contentTransition = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;

  // Animation done...
  useEffect(() => {
    // Start animation after 500ms...
    setTimeout(() => {
      //Parallel animation...
      Animated.parallel([
        Animated.timing(startAnimation, {
          //For same height for non safe area devices...
          toValue: -Dimensions.get("window").height + (insets.top + 65),
          useNativeDriver: true,
        }),
        Animated.timing(scaleLogo, {
          //Scaling to 0.3
          toValue: 0.3,
          useNativeDriver: true,
        }),
        Animated.timing(scaleTitle, {
          //Scaling to 0.8
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(moveLogo, {
          //Moving to right most...
          toValue: {
            x: Dimensions.get("window").width / 2 - 35,
            y: Dimensions.get("window").height / 2 - 5,
          },
          useNativeDriver: true,
        }),
        Animated.timing(moveTitle, {
          //Moving to right most...
          toValue: {
            x: 0,
            // Since image size is 100...
            y: Dimensions.get("window").height / 2 - 90,
          },
          useNativeDriver: true,
        }),
        Animated.timing(contentTransition, {
          //Moving to right most...
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);
  }, []);

  // Going to move up nab bar
  return (
    <View
      style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
    >
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: bgColor,
          transform: [{ translateY: startAnimation }],
          zIndex: 1,
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.Image
            source={require("../assets/loading_screen_2.png")}
            style={{
              width: 100,
              height: 100,
              marginBottom: 20,
              transform: [
                { translateX: moveLogo.x },
                { translateY: moveLogo.y },
                {
                  scale: scaleLogo,
                },
              ],
            }}
          />
          <Animated.Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "white",
              transform: [
                { translateY: moveTitle.y },
                {
                  scale: scaleTitle,
                },
              ],
            }}
          >
            Social Auth
          </Animated.Text>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: "rgba(0,0,0,0.04)",
          zIndex: 0,
          transform: [{ translateY: contentTransition }],
        }}
      >
        <Login />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
