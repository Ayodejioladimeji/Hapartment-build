import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import colors from "../assets/colors/colors";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { useNavigation } from "@react-navigation/native";

const CautionModal = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //   proceed to the details page
  const proceed = () => {
    dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    navigation.navigate("DetailsScreen", { item });
  };

  return (
    <View style={styles.cautionContainer}>
      <Text style={styles.heading}>Caution!!!</Text>
      <Text style={styles.text}>
        The property you're trying to view is still under review for approval
      </Text>
      <Text style={styles.text}>
        Please do not contact agent until the property is verified
      </Text>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.cancelButton}
          onPress={() => dispatch({ type: GLOBALTYPES.MODAL, payload: false })}
        >
          <Text style={styles.cancel}>Cancel</Text>
        </Pressable>

        <Pressable style={styles.continueButton} onPress={proceed}>
          <Text style={styles.continue}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CautionModal;

const styles = StyleSheet.create({
  cautionContainer: {
    textAlign: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: "orange",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 25,
  },

  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cancelButton: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButton: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  cancel: {
    color: "red",
    fontSize: 16,
  },
  continue: {
    color: colors.primary,
    fontSize: 16,
  },
});
