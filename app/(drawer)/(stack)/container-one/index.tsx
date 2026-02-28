import CardSmall from "@/presentation/dashboard/components/CardSmall";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import React from "react";
import { ScrollView, View } from "react-native";

const index = () => {
  const primaryColor = useThemeColor({}, "primary");
  const secondaryColor = useThemeColor({}, "secondary");

  return (
    <ScrollView className="flex-1">
      <View className="px-5 pb-6">
        <View className="flex-row flex-wrap justify-between p-5">
          <CardSmall
            title="Crear"
            icon="add-circle-outline"
            iconColor="#FFC47E"
            bgColor={"#030521"}
            route="/container-one/create"
          />
          <CardSmall
            title="Listar"
            icon="list-circle-outline"
            iconColor="#FFC47E"
            bgColor={"#030521"}
            route="/container-one/list"
          />
          <CardSmall
            title="Encolados"
            icon="hourglass-outline"
            iconColor="#FFC47E"
            bgColor={"#030521"}
            route="/container-one/queue"
          />
          <CardSmall
            title="Video"
            icon="videocam-outline"
            iconColor="#3B82F6"
            bgColor={primaryColor}
            route="/container-one/video"
          />
        </View>
      </View>
      <View
        style={{
          height: 20,
          borderTopColor: "#E5E5EA",
          borderTopWidth: 1,
          marginTop: 20,
        }}
      />
      <View className="px-5 pb-6">
        <View className="flex-row flex-wrap justify-between p-5">
          <CardSmall
            title="Adicional 1"
            icon="add-circle-outline"
            iconColor="#3B82F6"
            bgColor={"#5DD39E"}
            route="/container-one/extra-one"
          />
          <CardSmall
            title="Adicional 2"
            icon="add-circle-outline"
            iconColor="#3B82F6"
            bgColor={"#5DD39E"}
            route="/container-one/extra-two"
          />
          <CardSmall
            title="Adicional 3"
            icon="add-circle-outline"
            iconColor="#3B82F6"
            bgColor={"#5DD39E"}
            route="/container-one/extra-three"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default index;
