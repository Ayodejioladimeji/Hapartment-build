import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../assets/colors/colors";
import Accordion from "../common/Accordion";
import AgentAccordion from "../common/AgentAccordion";
import GoBack from "../common/GoBack";

//

const FaqScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <GoBack navigation={navigation} title="FAQS" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <AgentAccordion />
        <Accordion />
      </ScrollView>
    </View>
  );
};
export default FaqScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  text: {
    lineHeight: 30,
  },
});
