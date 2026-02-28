import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const { user } = useAuthStore();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      {/* Header con diseño moderno */}
      <View style={styles.headerContainer}>
        {/* Fondo con gradiente simulado */}
        <View style={styles.backgroundPattern}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle3]} />
        </View>

        {/* Contenido del header */}
        <View style={styles.headerContent}>
          {/* Avatar con anillo decorativo */}
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarRing}>
              <View style={styles.avatar}>
                <Text style={styles.initialsText}>
                  {getInitials(user?.firstName ?? "MALIMAX")}
                </Text>
              </View>
            </View>
            {/* Badge de estado activo */}
            <View style={styles.activeBadge}>
              <View style={styles.activeDot} />
            </View>
          </View>

          {/* Info del usuario */}
          <View style={styles.userInfo}>
            <Text style={styles.userName} numberOfLines={1}>
              {user?.firstName ?? "Usuario"}
            </Text>
            <View style={styles.roleContainer}>
              <Ionicons
                name="shield-checkmark"
                size={12}
                color="rgba(255,255,255,0.8)"
              />
              <Text style={styles.roleText}>Miembro Activo</Text>
            </View>
          </View>
        </View>

        {/* Footer del header con versión */}
        <View style={styles.headerFooter}>
          <View style={styles.versionBadge}>
            <Ionicons
              name="code-slash"
              size={12}
              color="rgba(255,255,255,0.7)"
            />
            <Text style={styles.versionText}>v1.0.2</Text>
          </View>

          <View style={styles.decorativeLine} />
        </View>
      </View>

      {/* DRAWER ITEMS */}
      <View style={styles.menuContainer}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#11e011",
    marginHorizontal: 12,
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
    paddingTop: 24,
    paddingBottom: 16,
    position: "relative",
    shadowColor: "#11e011",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circle: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 999,
  },
  circle1: {
    width: 120,
    height: 120,
    top: -40,
    right: -30,
  },
  circle2: {
    width: 80,
    height: 80,
    bottom: -20,
    left: -20,
  },
  circle3: {
    width: 60,
    height: 60,
    top: 40,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  headerContent: {
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 1,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  avatarRing: {
    padding: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  initialsText: {
    color: "#11e011",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -1,
  },
  activeBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#11e011",
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff",
  },
  userInfo: {
    alignItems: "center",
    width: "100%",
  },
  userName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    letterSpacing: 0.3,
  },
  headerFooter: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  versionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },
  versionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.7)",
  },
  decorativeLine: {
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginTop: 12,
    borderRadius: 1,
  },
  menuContainer: {
    paddingTop: 8,
  },
});

export default CustomDrawer;
