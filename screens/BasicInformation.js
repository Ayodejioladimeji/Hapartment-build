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
import { Dropdown } from "react-native-element-dropdown";
import propertyData from "../constants/propertyData";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import CreateListingStatusBar from "../common/CreateListingStatusBar";
import statesData from "../constants/statesdata";

SplashScreen.preventAutoHideAsync();

//

const BasicInformation = ({ route }) => {
  const navigation = useNavigation();
  const [cities, setCities] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const dispatch = useDispatch();
  const { address, property_type, state, statename, city, cityname, isEdit } =
    useSelector((state) => state.listing);

  // set data for update
  useEffect(() => {
    if (isEdit) {
      const item = route.params.item;
      setItem(item);

      dispatch({ type: GLOBALTYPES.ADDRESS, payload: item.address });
      dispatch({
        type: GLOBALTYPES.PROPERTY_TYPE,
        payload: item.property_type,
      });
      dispatch({
        type: GLOBALTYPES.BEDROOMS,
        payload: item.bedrooms,
      });
      dispatch({ type: GLOBALTYPES.STATE, payload: item.state });
      dispatch({ type: GLOBALTYPES.STATE_NAME, payload: item.statename });
      dispatch({ type: GLOBALTYPES.CITY, payload: item.city });
      dispatch({ type: GLOBALTYPES.CITY_NAME, payload: item.cityname });
    }
  }, [isEdit]);

  // get the city method
  useEffect(() => {
    statesData.filter((item) => {
      if (item.value === statename) {
        setCities(item.lgas);
      }
    });
  }, [statename]);

  const handleSubmit = () => {
    if (address === "" || property_type === "" || state === "" || city === "") {
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
          <Text style={styles.heading}>Basic Information</Text>

          <View style={styles.country}>
            <Text style={styles.selectHeading}>Property Address</Text>
            <TextInput
              placeholder="12 Adeleke street lagos nigeria"
              onChangeText={(text) =>
                dispatch({ type: GLOBALTYPES.ADDRESS, payload: text })
              }
              style={[
                styles.addressInput,
                isFocus && { borderColor: colors.primary },
              ]}
              value={address}
              placeholderTextColor={colors.textLight}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />
          </View>

          <View style={styles.country}>
            <Text style={styles.selectHeading}>Select Property Type</Text>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus && { borderColor: colors.primary },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={propertyData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={
                property_type === "" ? "Select property type" : property_type
              }
              searchPlaceholder="Search..."
              value={property_type}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                dispatch({
                  type: GLOBALTYPES.PROPERTY_TYPE,
                  payload: item.value,
                });

                dispatch({
                  type: GLOBALTYPES.BEDROOMS,
                  payload:
                    item.value === "Single Room"
                      ? "singleroom"
                      : item.value === "Room & Parlour"
                      ? "room&parlour"
                      : item.value === "Self Contain"
                      ? "selfcontain"
                      : item.value === "Room & Parlour Self Contain"
                      ? "1"
                      : item.value === "2 Bedroom Flat"
                      ? "2"
                      : item.value === "3 Bedroom Flat"
                      ? "3"
                      : item.value === "4 Bedroom Flat"
                      ? "4"
                      : "5+",
                });
                setIsFocus(false);
              }}
            />
          </View>

          <View style={styles.states}>
            <Text style={styles.selectHeading}>Select State </Text>

            <Dropdown
              style={[
                styles.dropdown,
                isFocus && { borderColor: colors.primary },
              ]}
              placeholderStyle={[
                styles.placeholderStyle,
                state !== "" && { color: colors.black },
              ]}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={statesData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={statename === " " ? "Select State" : statename}
              searchPlaceholder="Search..."
              value={state}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                dispatch({ type: GLOBALTYPES.STATE, payload: item.value });
                dispatch({ type: GLOBALTYPES.STATE_NAME, payload: item.label });

                setIsFocus(false);
              }}
            />
          </View>

          {(state !== "" || isEdit) && (
            <View style={styles.city}>
              <Text style={styles.selectHeading}>Select City</Text>
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocus && { borderColor: colors.primary },
                ]}
                placeholderStyle={[
                  styles.placeholderStyle,
                  city !== "" && { color: colors.black },
                ]}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={cities}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={cityname === " " ? "Select City" : cityname}
                searchPlaceholder="Search..."
                value={cities}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  dispatch({ type: GLOBALTYPES.CITY, payload: item.value });
                  dispatch({
                    type: GLOBALTYPES.CITY_NAME,
                    payload: item.label,
                  });
                  setIsFocus(false);
                }}
              />
            </View>
          )}

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

export default BasicInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
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
  addressInput: {
    height: 55,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    fontSize: 15,
    color: colors.textDark,
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
    color: colors.textDark,
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
});
