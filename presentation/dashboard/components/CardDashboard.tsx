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

interface __CardDashboardProps__ {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: any;
  iconSize?: number;
  accentColor?: string;
  badge?: string;
}

const CardDashboard = ({
  title,
  icon,
  route,
  iconSize = 32,
  accentColor = "#5ae51f",
  badge,
}: __CardDashboardProps__) => {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [rotateAnim] = useState(new Animated.Value(0));

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 3,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "5deg"],
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
        style={styles.card}
      >
        {/* Barra decorativa lateral */}
        <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

        {/* Contenido principal */}
        <View style={styles.content}>
          {/* Header con título y badge */}
          <View style={styles.header}>
            <Text
              style={styles.cardTitle}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
            {badge && (
              <View style={[styles.badge, { borderColor: accentColor }]}>
                <Text style={[styles.badgeText, { color: accentColor }]}>
                  {badge}
                </Text>
              </View>
            )}
          </View>

          {/* Footer con icono y arrow */}
          <View style={styles.footer}>
            <Animated.View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: accentColor,
                  transform: [{ rotate: rotateInterpolate }],
                },
              ]}
            >
              <Ionicons name={icon} size={iconSize} color="#ffffff" />
            </Animated.View>

            <View style={styles.arrowContainer}>
              <Ionicons name="arrow-forward" size={20} color="#cbd5e1" />
            </View>
          </View>
        </View>

        {/* Patrón decorativo de fondo */}
        <View style={styles.decorativePattern}>
          <View style={[styles.dot, { backgroundColor: `${accentColor}08` }]} />
          <View style={[styles.dot, { backgroundColor: `${accentColor}08` }]} />
          <View style={[styles.dot, { backgroundColor: `${accentColor}08` }]} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  card: {
    position: "relative",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    minHeight: 130,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: "hidden",
  },
  accentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 5,
    height: "100%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  content: {
    flex: 1,
    paddingLeft: 8,
  },
  header: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1.5,
    backgroundColor: "#ffffff",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  arrowContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
  },
  decorativePattern: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});

export default CardDashboard;
