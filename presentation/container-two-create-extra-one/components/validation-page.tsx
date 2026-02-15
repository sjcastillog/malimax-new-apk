import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ValidationItemSection } from "./validation";

export const ValidationScreenTwo = () => {
  return (
    <ScrollView style={styles.container}>
      <ValidationItemSection
        photoIdKey="emptyPanoramicCheckPhoto"
        validationPhotoKey="emptyPanoramicValidationPhoto"
        statusKey="emptyPanoramicCheckStatus"
        commentKey="emptyPanoramicCheckComment"
        label="FOTO PANORÁMICA"
        isVideo={false}
      />

      <ValidationItemSection
        photoIdKey="emptyStampNavieraCheckPhoto"
        validationPhotoKey="emptyStampNavieraValidationPhoto"
        statusKey="emptyStampNavieraCheckStatus"
        commentKey="emptyStampNavieraCheckComment"
        label="FOTO SELLO NAVIERA"
        isVideo={false}
      />

      <ValidationItemSection
        photoIdKey="emptyOtherStampCheckPhoto"
        validationPhotoKey="emptyOtherStampValidationPhoto"
        statusKey="emptyOtherStampCheckStatus"
        commentKey="emptyOtherStampCheckComment"
        label="FOTO OTRO SELLO"
        isVideo={false}
      />

      <ValidationItemSection
        photoIdKey="emptySatelliteLockCheckPhoto"
        validationPhotoKey="emptySatelliteLockValidationPhoto"
        statusKey="emptySatelliteLockCheckStatus"
        commentKey="emptySatelliteLockCheckComment"
        label="FOTO CANDADO SATELITAL"
        isVideo={false}
      />

      <ValidationItemSection
        photoIdKey="exitEngineryCheckPhoto1"
        validationPhotoKey="exitEngineryValidationPhoto1"
        statusKey="exitEngineryCheckStatus1"
        commentKey="exitEngineryCheckComment1"
        label="FOTO MAQUINARIA 1"
        isVideo={false}
      />

      <ValidationItemSection
        photoIdKey="exitEngineryCheckPhoto2"
        validationPhotoKey="exitEngineryValidationPhoto2"
        statusKey="exitEngineryCheckStatus2"
        commentKey="exitEngineryCheckComment2"
        label="FOTO MAQUINARIA 2"
        isVideo={false}
      />

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});