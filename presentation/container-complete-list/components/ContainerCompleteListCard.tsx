import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ShowContainerCompleteModal } from "./ShowModalContainerComplete";
import { WorkflowContainerOneI } from "@/core/container-one/interfaces";

interface Props {
  container: WorkflowContainerOneI;
  dark: boolean;
}

export const ContainerCompleteListCard = ({ container, dark }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const primaryColor = useThemeColor({}, "primary");
  const secondaryColor = useThemeColor({}, "secondary");
  const cardBg = useThemeColor(
    { light: "#FFFFFF", dark: "#1C1C1E" },
    "background",
  );
  const borderColor = useThemeColor(
    { light: "#E5E5EA", dark: "#38383A" },
    "border",
  );
  const textSecondary = useThemeColor(
    { light: "#8E8E93", dark: "#98989D" },
    "textSecondary",
  );

  return (
    <>
      <ThemedView
        style={[styles.card, { backgroundColor: cardBg, borderColor }]}
      >
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          activeOpacity={0.7}
          style={styles.touchable}
        >
          {/* Header con indicador de estado */}
          <View style={styles.header}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: `${primaryColor}15` },
              ]}
            >
              <View
                style={[styles.statusDot, { backgroundColor: primaryColor }]}
              />
              <ThemedText
                style={[
                  styles.statusText,
                  { color: dark ? secondaryColor : primaryColor },
                ]}
              >
                {container.client || "N/A"}
              </ThemedText>
            </View>
            <View style={{ width: "100%" }}>
              <ThemedText style={[styles.dateText, { color: textSecondary }]}>
                {`${container.createdAt}` || "Sin fecha"}
              </ThemedText>
            </View>
          </View>

          {/* Container ID - Principal */}
          <View style={styles.containerSection}>
            <ThemedText
              style={styles.label}
              lightColor="#8E8E93"
              darkColor="#98989D"
            >
              Contenedor
            </ThemedText>
            <ThemedText
              style={styles.containerNumber}
              numberOfLines={1}
              lightColor="#000000"
              darkColor="#FFFFFF"
            >
              {container.container}
            </ThemedText>
          </View>

          {/* Información de Cliente y Productor */}
          <View style={styles.infoGrid}>
            {container.statusContainer && (
              <View style={styles.infoItem}>
                <ThemedText
                  style={styles.infoLabel}
                  lightColor="#8E8E93"
                  darkColor="#98989D"
                >
                  Estado
                </ThemedText>
                <ThemedText
                  style={styles.farmLabel}
                  lightColor="#8E8E93"
                  darkColor="#98989D"
                >
                  {container.statusContainer}
                </ThemedText>
              </View>
            )}
             <View style={styles.infoItem}>
                <ThemedText
                  style={styles.infoLabel}
                  lightColor="#8E8E93"
                  darkColor="#98989D"
                >
                  {container.statusWorkflow}
                </ThemedText>
                <ThemedText
                  style={styles.farmLabel}
                  lightColor="#8E8E93"
                  darkColor="#98989D"
                >
                  {
                    container.statusWorkflowColor === "error" 
                    ? "🔴⚪️⚪️" 
                    : container.statusWorkflowColor === "warning" 
                    ? "⚪️🟠⚪️" 
                    : container.statusWorkflowColor === "success" 
                    ? "⚪️⚪️🟢" : "⚪️⚪️⚪️"}
                </ThemedText>
              </View>
          </View>
        </TouchableOpacity>
      </ThemedView>
      {showModal && (
        <ShowContainerCompleteModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          containerId={container.id!}
          containerNumber={container.container!}
          dark={dark}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 3,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3, 
  },
  touchable: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  header: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  statusBadge: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  dateText: {
    paddingLeft: 10,
    fontSize: 12,
    fontWeight: "500",
  },
  containerSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  containerNumber: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#E5E5EA",
    marginBottom: 10,
  },
  infoItem: {
    // flex: 2,
    width: "100%",
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: "#E5E5EA",
    marginHorizontal: 12,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  farmSection: {
    marginBottom: 12,
  },
  farmLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: "#E5E5EA",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "700",
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 2,
  },
  userDate: {
    fontSize: 11,
    fontWeight: "500",
  },
  arrow: {
    width: 20,
    height: 20,
    borderRightWidth: 2,
    borderTopWidth: 2,
    transform: [{ rotate: "45deg" }],
    marginLeft: 8,
  },
});
