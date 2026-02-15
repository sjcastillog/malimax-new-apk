import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface __PropsI__ {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: any;
  iconSize?: number;
  iconColor?: string;
  bgColor?: string;
}

const CardSmall = ({
  title,
  icon,
  route,
  iconSize = 28,
  iconColor = "#0E3B5F",
  bgColor = "#D1D5DC",
}: __PropsI__) => {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [bounceAnim] = useState(new Animated.Value(0));

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.92,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 0,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const iconTranslateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -4],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => router.push(route)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={[styles.card, { backgroundColor: bgColor }]}
      >
        {/* Brillo decorativo superior */}
        <View style={styles.shineEffect} />

        {/* Icono con animación */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ translateY: iconTranslateY }],
            },
          ]}
        >
          <View style={styles.iconGradientBg}>
            <Ionicons name={icon} size={iconSize} color={iconColor} />
          </View>

          {/* Círculo decorativo detrás del icono */}
          <View
            style={[styles.iconCircleBg, { borderColor: `${iconColor}20` }]}
          />
        </Animated.View>

        {/* Título */}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>

        {/* Indicador de acción */}
        <View style={styles.actionIndicator}>
          <View style={[styles.miniDot, { backgroundColor: iconColor }]} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    marginBottom: 12,
  },
  card: {
    borderRadius: 24,
    padding: 16,
    minHeight: 140,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
  },
  shineEffect: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  iconContainer: {
    position: "relative",
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  iconGradientBg: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 2,
  },
  iconCircleBg: {
    position: "absolute",
    top: -4,
    left: -4,
    width: 64,
    height: 64,
    borderRadius: 20,
    borderWidth: 2,
    zIndex: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: -0.2,
    lineHeight: 18,
  },
  actionIndicator: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  miniDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.6,
  },
});

export default CardSmall;
