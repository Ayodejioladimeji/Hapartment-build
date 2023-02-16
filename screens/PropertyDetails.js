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
import React, { useState, useEffect } from "react";
import colors from "../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import GoBack from "../common/GoBack";
import { MaterialIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import propertyData from "../constants/propertyData";
import { strictAddComma } from "comma-separator";
import bathroom from "../constants/bathrooms";
import homefacilities from "../constants/homefacilities";
import areafacilities from "../constants/areafacilities";
import furnish from "../constants/furnishing";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import CreateListingStatusBar from "../common/CreateListingStatusBar";

SplashScreen.preventAutoHideAsync();

//

const PropertyDetails = ({ route }) => {
  const navigation = useNavigation();
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);

  const {
    bathrooms,
    toilets,
    furnishing,
    home_facilities,
    area_facilities,
    isEdit,
  } = useSelector((state) => state.listing);
  const dispatch = useDispatch();

  // set data for update
  useEffect(() => {
    if (isEdit) {
      const item = route.params.item;
      setItem(item);

      dispatch({ type: GLOBALTYPES.BATHROOMS, payload: item.bathrooms });
      dispatch({
        type: GLOBALTYPES.TOILETS,
        payload: item.toilets,
      });
      dispatch({ type: GLOBALTYPES.FURNISHING, payload: item.furnishing });
      dispatch({
        type: GLOBALTYPES.HOME_FACILITIES,
        payload: item.home_facilities,
      });
      dispatch({
        type: GLOBALTYPES.AREA_FACILITIES,
        payload: item.area_facilities,
      });
    }
  }, [isEdit]);

  const onSelectedHomeChange = (newSelectItems) => {
    dispatch({ type: GLOBALTYPES.HOME_FACILITIES, payload: newSelectItems });
  };

  const onSelectedAreaChange = (newSelectItems) => {
    dispatch({ type: GLOBALTYPES.AREA_FACILITIES, payload: newSelectItems });
  };

  const handleSubmit = () => {
    if (
      bathrooms === "" ||
      toilets === "" ||
      furnishing === "" ||
      home_facilities.length === 0 ||
      area_facilities.length === 0
    ) {
      Alert.alert("Input cannot be empty");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      isEdit
        ? navigation.navigate("UpdateProperty", { item })
        : navigation.navigate("ListProperty");
      setLoading(false);
    }, 2000);
  };

  //

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <CreateListingStatusBar navigation={navigation} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.heading}>Property Details</Text>

          <View style={styles.country}>
            <Text style={styles.selectHeading}>Select Bathrooms</Text>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus && { borderColor: colors.primary },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={bathroom}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select bathroom"
              value={bathrooms}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                dispatch({ type: GLOBALTYPES.BATHROOMS, payload: item.value });
                setIsFocus(false);
              }}
            />
          </View>

          <View style={styles.country}>
            <Text style={styles.selectHeading}>Select Toilets</Text>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus && { borderColor: colors.primary },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={bathroom}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select toilet"
              value={toilets}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                dispatch({ type: GLOBALTYPES.TOILETS, payload: item.value });
                setIsFocus(false);
              }}
            />
          </View>

          <View style={styles.country}>
            <Text style={styles.selectHeading}>Furnishing</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={furnish}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Choose Furnishing"
              value={furnishing}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                dispatch({ type: GLOBALTYPES.FURNISHING, payload: item.value });
                setIsFocus(false);
              }}
            />
          </View>

          <View style={styles.country}>
            <Text style={styles.selectHeading}>Select Home Facilities</Text>

            <View
              style={{
                borderWidth: 0.6,
                borderColor: colors.textLight,
                borderRadius: 5,
              }}
            >
              <SectionedMultiSelect
                IconRenderer={MaterialIcons}
                items={homefacilities}
                uniqueKey="name"
                selectText="Select facilities"
                showDropDowns={false}
                readOnlyHeadings={false}
                onSelectedItemsChange={onSelectedHomeChange}
                selectedItems={home_facilities}
                styles={{
                  button: {
                    backgroundColor: colors.primary,
                  },
                  selectedItemText: {
                    color: colors.primary,
                  },
                  selectToggleText: {
                    fontSize: Platform.OS === "ios" ? 15 : 14,
                  },
                  selectToggle: {
                    // borderWidth: 0.5,
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                  },
                }}
              />
            </View>
          </View>

          <View style={styles.country}>
            <Text style={styles.selectHeading}>Select Area Facilities</Text>

            <View
              style={{
                borderWidth: 0.6,
                borderColor: colors.textLight,
                borderRadius: 5,
              }}
            >
              <SectionedMultiSelect
                IconRenderer={MaterialIcons}
                items={areafacilities}
                uniqueKey="name"
                selectText="Select facilities"
                showDropDowns={false}
                readOnlyHeadings={false}
                onSelectedItemsChange={onSelectedAreaChange}
                selectedItems={area_facilities}
                styles={{
                  button: {
                    backgroundColor: colors.primary,
                  },
                  selectedItemText: {
                    color: colors.primary,
                  },
                  selectToggleText: {
                    fontSize: Platform.OS === "ios" ? 15 : 14,
                  },
                  selectToggle: {
                    // borderWidth: 0.5,
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                  },
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.filterButton}
            onPress={handleSubmit}
          >
            {loading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.buttonText}>SAVE & CONTINUE</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PropertyDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 30,
  },
  heading: {
    fontSize: 18,
    textTransform: "uppercase",
    alignSelf: "center",
    marginVertical: 20,
    fontWeight: "600",
  },

  selectHeading: {
    marginBottom: 7,
    // fontFamily: "//NunitoSans-Regular",
    fontSize: Platform.OS === "ios" ? 15 : 14,
    marginTop: 20,
    color: colors.primary,
  },

  dropdown: {
    height: 55,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    fontSize: 12,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: Platform.OS === "ios" ? 15 : 14,
  },
  selectedTextStyle: {
    fontSize: Platform.OS === "ios" ? 15 : 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: Platform.OS === "ios" ? 14 : 13,
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
  descriptionWrapper: {
    marginTop: 10,
    padding: 15,
    borderWidth: 0.3,
    borderColor: colors.textLighter,
    borderRadius: 15,
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
  textInputs: {
    borderWidth: 1,
    borderColor: colors.primary,
    height: 55,
    borderRadius: 5,
    marginBottom: 10,
    width: "45%",
    paddingHorizontal: 15,
  },
  inputDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
