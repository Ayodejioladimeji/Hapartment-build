import { View, Text, ScrollView } from "react-native";
import React from "react";
import BasicInformation from "./BasicInformation";
import colors from "../assets/colors/colors";
import PropertyDetails from "./PropertyDetails";
import Description from "./Description";
import PropertyImages from "./PropertyImages";
import CreateListingStatusBar from "../common/CreateListingStatusBar";

const CreateListings = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <CreateListingStatusBar navigation={navigation} />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <BasicInformation />
        <PropertyDetails />
        <Description />
        <PropertyImages />
      </ScrollView>
    </View>
  );
};

export default CreateListings;
