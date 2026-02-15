import { StyleSheet, Text, View } from "react-native";

export const SectionHeader = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

export const SubSectionHeader = ({ title }: { title: string }) => (
  <View style={styles.subSectionHeader}>
    <Text style={styles.subSectionTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: "#063970",
    padding: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },

  subSectionHeader: {
    borderTopWidth: 1,
    borderTopColor: "#52c41a",
    borderStyle: "dashed",
    paddingTop: 12,
    paddingLeft: 12,
    marginTop: 16,
    marginHorizontal: 8,
  },
  subSectionTitle: {
    backgroundColor: "#52c41a",
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
});
