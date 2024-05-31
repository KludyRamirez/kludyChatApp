import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function ContactsFloatingIcon() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("contacts")}
      className="absolute right-[20px] bottom-[20px] rounded-[60px] bg-[#007bff] w-[60px] h-[60px] flex justify-center items-center"
    >
      <MaterialCommunityIcons
        name="android-messages"
        size={30}
        color="#ffffff"
        style={{ transform: [{ scaleX: -1 }] }}
      />
    </TouchableOpacity>
  );
}
