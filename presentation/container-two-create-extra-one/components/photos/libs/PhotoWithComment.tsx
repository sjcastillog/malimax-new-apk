import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useWorkflowStoreTwoExtraOne } from "../../../store";
import { PhotoButton } from "./PhotoButton";

interface PhotoWithCommentProps {
  photoIdKey: string;
  commentKey: string;
  label: string;
  commentPlaceholder?: string;
}

export const PhotoWithComment: React.FC<PhotoWithCommentProps> = ({
  photoIdKey,
  commentKey,
  label,
  commentPlaceholder = "Comentario opcional",
}) => {
  const comment = useWorkflowStoreTwoExtraOne(
    (state) => (state as any)[commentKey],
  );

  const setComment = useWorkflowStoreTwoExtraOne((state) => {
    const setterName = `set${commentKey.charAt(0).toUpperCase()}${commentKey.slice(1)}`;
    return (state as any)[setterName];
  });

  return (
    <View style={styles.photoWithComment}>
      <PhotoButton photoIdKey={photoIdKey} label={label} fullWidth />
      <TextInput
        style={styles.commentInput}
        placeholder={commentPlaceholder}
        placeholderTextColor="#999"
        value={comment || ""}
        onChangeText={setComment}
        multiline
        numberOfLines={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  photoWithComment: {
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 6,
    padding: 10,
    fontSize: 12,
    backgroundColor: "#fff",
    marginTop: 8,
    minHeight: 60,
    textAlignVertical: "top",
  },
});
