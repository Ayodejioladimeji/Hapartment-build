import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "../assets/colors/colors";
import MyStatusBar from "../common/MyStatusBar";
import GoBack from "../common/GoBack";

const HowTo = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <GoBack navigation={navigation} title="Go back" />
      <View style={styles.container}>
        <Text style={styles.heading}>How to create Listing</Text>
        <Text style={styles.subheading}>
          Follow the instructions below to get your property approved
          immediately
        </Text>
      </View>
    </View>
  );
};

export default HowTo;

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    marginHorizontal: 20,
  },
  heading: {
    fontSize: 22,
    textAlign: "center",
    color: colors.primary,
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
  },
});
