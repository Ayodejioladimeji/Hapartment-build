import { View, ActivityIndicator } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        marginTop: 50,
      }}
    >
      <ActivityIndicator size="small" color={colors.primary} />
    </View>
  );
};

export default Loading;
