import { View, Text, Button, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { pickImage, askForPermission, uploadImage } from "./utils";
import { auth, db } from "../firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  // 1st mvvm architechture - post - gumawa ako ng doc sa firebase = setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid })

  async function handlePress() {
    const user = auth.currentUser;
    let photoURL;
    if (selectedImage) {
      const url = await uploadImage(
        selectedImage,
        `images/${user.uid}`,
        "profilePicture"
      );
      photoURL = url;
    }
    const userData = {
      displayName,
      email: user.email,
    };
    if (photoURL) {
      userData.photoURL = photoURL.url;
      userData.fileName = photoURL.fileName;
    }
    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
    ]);
    navigation.navigate("home");
  }

  async function handleProfilePicture() {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(result?.uri);
    }
  }

  if (!permissionStatus) {
    return <Text>Loading...</Text>;
  }

  if (permissionStatus !== "granted") {
    return <Text>You need to allow this permission</Text>;
  }

  return (
    <>
      <StatusBar className="" />
      <SafeAreaView
        className={`w-[100%] h-[100%] flex justify-center items-center pt-[${
          Constants.statusBarHeight + 20
        }] p-[20px]`}
      >
        <Text className="text-[22px] text-[#007bff]">Profile Info</Text>
        <Text className="text-[14px] text-[#606060] mt-[20px]">
          Please provide your name and optional photo
        </Text>
        <TouchableOpacity
          onPress={handleProfilePicture}
          className="mt-[20px] w-[120px] h-[120px] flex justify-center items-center bg-[#007bff] rounded-[120px]"
        >
          {!selectedImage ? (
            <MaterialCommunityIcons
              name="camera-plus"
              color="#ffffff"
              size={45}
            />
          ) : (
            <Image
              source={{ uri: selectedImage }}
              className="w-[100%] h-[100%] rounded-[120px]"
            />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Type your name"
          value={displayName}
          onChangeText={setDisplayName}
          className="mt-[40px] border-b-[1px] border-[#007bff] w-[100%]"
        />
        <View className="mt-[auto] w-[80px]">
          <Button
            title="Next"
            color="#007bff"
            onPress={handlePress}
            disabled={!displayName}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
