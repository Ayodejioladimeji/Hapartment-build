import { View, Text } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const Rating = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 5,
      }}
    >
      <FontAwesome name="star" size={11} color="black" />
      <FontAwesome name="star" size={11} color="black" />
      <FontAwesome name="star" size={11} color="black" />
      <FontAwesome name="star-o" size={11} color="black" />
      <FontAwesome name="star-o" size={11} color="black" />
    </View>
  );
};

export default Rating;
