import React from "react";
import { StyleSheet, Text, View, Button, Image, Platform } from "react-native";

const NoConnectionScreen = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/no_connections.png")}
        style={{ width: "30%", height: "30%" }}
        resizeMode="contain"
      />
      <Text style={styles.heading}>Connection lost</Text>
      <Text style={styles.text}>Please check your connection</Text>
      <Text style={styles.text}>
        Once you're connected the page will refresh automatically
      </Text>
    </View>
  );
};
export default NoConnectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  heading: {
    textAlign: "center",
    lineHeight: 25,
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    lineHeight: 25,
  },
});
