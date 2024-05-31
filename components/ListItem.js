import { Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Context from "../context/Context";
import { Grid, Row, Col } from "react-native-easy-grid";
import Avatar from "./Avatar";

export default function ListItem({
  type,
  description,
  user,
  time,
  room,
  image,
}) {
  const navigation = useNavigation();
  const {} = useContext(Context);

  return (
    <TouchableOpacity
      className="h-[80px]"
      // useRoute to parang props pero ang gamit navigate kapag ka hindi child ng file na to, ganyan gawin mo

      onPress={() => navigation.navigate("chat", { user, room, image })}

      // end useRoute
    >
      <Grid className="h-[80px]">
        <Col className="w-[80px] flex items-center justify-center">
          <Avatar user={user} size={type === "contacts" ? 40 : 65} />
        </Col>
        <Col className="ml-[10px]">
          <Row className="flex items-center">
            <Col className="">
              <Text className="font-bold text-[16px] text-[#303030]">
                {user?.contactName || user?.displayName}
              </Text>
            </Col>
            {time && (
              <Col className="flex items-end">
                <Text className="text-[#606060] text-[12px]">
                  {new Date(time.seconds * 1000).toLocaleDateString()}
                </Text>
              </Col>
            )}
          </Row>
          {description && (
            <Row className="mt-[-5px]">
              <Text className="text-[#303030] text-[12px]">{description}</Text>
            </Row>
          )}
        </Col>
      </Grid>
    </TouchableOpacity>
  );
}
