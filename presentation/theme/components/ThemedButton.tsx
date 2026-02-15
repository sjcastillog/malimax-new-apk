import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props extends PressableProps {
  children: string;
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  variant?: "solid" | "outline";
  isDark?: boolean;
}

const ThemedButton = ({
  children,
  icon,
  loading,
  isDark,
  variant = "solid",
  ...rest
}: Props) => {
  
  const primaryColor = useThemeColor({}, "primary");
  const secondaryColor = useThemeColor({}, "secondary");
  const textColor = useThemeColor({}, "text");

  const isOutline = variant === "outline";

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: isOutline
            ? "transparent"
            : pressed
              ? primaryColor + "DD"
              : primaryColor,
          borderColor: primaryColor,
          borderWidth: 2,
          opacity: loading || rest.disabled ? 0.6 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        styles.button,
      ]}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            color={isOutline ? primaryColor : "white"}
            size="small"
          />
          <Text
            style={[
              styles.text,
              {
                marginLeft: 10,
                color: isOutline ? primaryColor : "white",
              },
            ]}
          >
            Cargando...
          </Text>
        </View>
      ) : (
        <View
          style={[
            styles.content,
            {
              borderColor: !isDark ? primaryColor : secondaryColor,
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                color: isOutline
                  ? primaryColor
                  : !isDark
                    ? primaryColor
                    : "white",
              },
            ]}
          >
            {children}
          </Text>
          {icon && (
            <Ionicons
              name={icon}
              size={22}
              color={
                isOutline ? primaryColor : !isDark ? primaryColor : "white"
              }
              style={{ marginLeft: 10 }}
            />
          )}
        </View>
      )}
    </Pressable>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 4,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
