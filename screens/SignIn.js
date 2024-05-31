import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { signIn, signUp } from "../firebase";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signUp");

  async function handlePress() {
    if (mode === "signUp") {
      await signUp(email, password);
    }
    if (mode === "signIn") {
      await signIn(email, password);
    }
  }

  return (
    <SafeAreaView className="w-full h-full justify-center items-center">
      <Text className="text-[24px] mb-[20px]">SignIn</Text>
      <Image
        source={require("../assets/welcome-img.png")}
        className="w-[180px] h-[180px]"
      />
      <View className="mt-20">
        <TextInput
          value={email.value}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          className="border-b-[1px] border-[#606060] w-[200px] px-2"
        />
        <TextInput
          value={password.value}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          secureTextEntry={true}
          className="border-b-[1px] border-[#606060] w-[200px] px-2 mt-[20px]"
        />
        <View className="mt-[20px]">
          <Button
            title={mode === "signUp" ? "Sign Up" : "Sign In"}
            disabled={!email || !password}
            className="bg-blue-500"
            onPress={handlePress}
          />
        </View>
        <TouchableOpacity>
          <Text
            className="mt-[20px] text-[#ff3131]"
            onPress={() =>
              mode === "signUp" ? setMode("signIn") : setMode("signUp")
            }
          >
            {mode === "signUp"
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
