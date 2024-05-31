import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { useRoute } from "@react-navigation/native";

export default function ChatHeader() {
  const route = useRoute();

  return (
    <View className="flex flex-row gap-4">
      <View>
        <Avatar size={40} user={route.params.user} />
      </View>
      <View className="flex items-center justify-center">
        <Text className="text-[#ffffff] text-[16px]">
          {route.params.user.contactName || route.params.user.displayName}
        </Text>
      </View>
    </View>
  );
}
