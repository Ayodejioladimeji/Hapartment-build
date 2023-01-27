import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import colors from "../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import GoBack from "../common/GoBack";
import { useDispatch, useSelector } from "react-redux";
import { reportListing } from "../redux/actions/listingAction";

SplashScreen.preventAutoHideAsync();

//

const ReportListing = ({ route }) => {
  const { _id } = route.params;
  const navigation = useNavigation();
  const [isFocus, setIsFocus] = useState(false);
  const [message, setMessage] = useState("");
  const { reportlistingloading } = useSelector((state) => state.loading);
  const { token } = useSelector((state) => state.auth);
  const { listing_callback } = useSelector((state) => state.listing);
  const dispatch = useDispatch();

  // handleSubmit

  const handleSubmit = () => {
    if (message === "") {
      Alert.alert("Input cannot be empty");
      return;
    }

    const data = {
      list_id: _id,
      message,
    };
    dispatch(reportListing(data, token, listing_callback, setMessage));
  };

  //

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <GoBack title="Report Listing" navigation={navigation} />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.heading}>
            Why do you want to report this property
          </Text>

          <View style={styles.country}>
            <Text style={styles.selectHeading}>Write message</Text>
            <TextInput
              placeholder="say something"
              onChangeText={(text) => setMessage(text)}
              style={[
                styles.addressInput,
                isFocus && { borderColor: colors.primary },
              ]}
              value={message}
              placeholderTextColor={colors.textLight}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              multiline={true}
              numberOfLines={10}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.filterButton}
            onPress={handleSubmit}
          >
            {reportlistingloading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>REPORT PROPERTY</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReportListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    alignSelf: "center",
    marginVertical: 20,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 30,
    width: "70%",
    color: colors.primary,
  },

  selectHeading: {
    marginBottom: 7,
    // fontFamily: "//NunitoSans-Regular",
    fontSize: Platform.OS === "ios" ? 15 : 14,
    marginTop: 20,
    color: colors.textDark,
  },

  addressInput: {
    height: 150,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: 15,
    color: colors.textDark,
    padding: 10,
    textAlignVertical: "top",
  },

  filterButton: {
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 30,
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    textTransform: "uppercase",
    fontWeight: "700",
  },

  active: {
    borderWidth: 2,
    borderColor: colors.primary,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: 110,
    height: 100,
  },
  dropdown: {
    height: 55,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    fontSize: 12,
  },
  textInputs: {
    borderWidth: 0.5,
    borderColor: colors.primary,
    height: 55,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    fontSize: Platform.OS === "ios" ? 15 : 14,
    color: colors.textLight,
  },
  selectedTextStyle: {
    fontSize: Platform.OS === "ios" ? 15 : 14,
    color: colors.textDark,
  },
});
