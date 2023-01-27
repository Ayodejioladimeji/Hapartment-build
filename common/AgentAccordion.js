import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import { agentFaqs } from "../constants/agentFaqs";

const AgentAccordion = () => {
  let indexPlus;

  const [active, setActive] = useState(0);

  // Event handler
  const eventHandler = (index) => {
    setActive(index);
  };

  // index count
  const indexCount = (index) => {
    indexPlus = index + 1;
    return indexPlus;
  };

  return (
    <View style={styles.accordion}>
      <Text style={styles.heading}>Agent Frequently Asked Questions</Text>
      {agentFaqs.map((tab, index) => (
        <View key={index}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.inActive}
            tabIndex={indexCount(index)}
            onPress={() => eventHandler(index)}
          >
            <Text style={styles.titleWrapper}>{tab.heading}</Text>

            <View>
              {active === index ? (
                <Ionicons
                  name="md-chevron-up-circle-outline"
                  size={24}
                  color={colors.primary}
                />
              ) : (
                <Ionicons
                  name="md-chevron-down-circle-outline"
                  size={24}
                  color={colors.textLight}
                />
              )}
            </View>
          </TouchableOpacity>

          <View style={active === index ? styles.panelOpen : styles.panelClose}>
            <Text style={styles.text}>{tab.subheading}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default AgentAccordion;

const styles = StyleSheet.create({
  accordion: {
    marginHorizontal: 10,
    marginTop: 50,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: colors.textDark,
  },

  inActive: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderColor: colors.textLighter,
    borderWidth: 0.3,
  },
  titleWrapper: {
    color: colors.primary,
    fontWeight: "500",
    lineHeight: 25,
    width: "80%",
  },
  panelClose: {
    backgroundColor: "transparent",
    opacity: 0,
    height: 0,
    overflow: "hidden",
    marginBottom: 20,
  },
  panelOpen: {
    overflow: "hidden",
    backgroundColor: "transparent",
    opacity: 1,
    height: "auto",
    lineHeight: 30,
    marginBottom: 20,
    padding: 10,
    borderWidth: 0.3,
    borderColor: colors.textLighter,
    borderTopWidth: 0,
  },
  text: {
    lineHeight: 30,
    color: colors.textDark,
  },
});
