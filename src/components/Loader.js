// React
import React, { useEffect, useRef } from "react";

// Third party
import { Icon, Text, View } from "native-base";
import { useTranslation } from "react-i18next";
import { Animated, Easing } from "react-native";

const Loader = () => {
  const { t } = useTranslation();
  return (
    <View>
      <Text>{t("common:loading")}</Text>
    </View>
  );
};

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export const LoadingIcon = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const scale = rotation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 1.0, 0.5],
  });

  return (
    <AnimatedIcon
      name={"loader"}
      type={"Feather"}
      style={{ transform: [{ rotate }, { scale }] }}
    />
  );
};

export default Loader;
