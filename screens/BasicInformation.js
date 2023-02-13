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
import axios from "axios";
import propertyData from "../constants/propertyData";
// import { BASE_URL, API_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import CreateListingStatusBar from "../common/CreateListingStatusBar";

SplashScreen.preventAutoHideAsync();

const BASE_URL = "https://api.countrystatecity.in/v1";

const API_KEY = "UnM1RmVPMFB0M09FN1RIWGZZM2Vyc2pvMzFrb3l5dDhQa3RzR1ZIbA==";

//

const BasicInformation = ({ route }) => {
  const navigation = useNavigation();
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stateloading, setStateloading] = useState(false);
  const [cityloading, setCityloading] = useState(false);
  const dispatch = useDispatch();
  const { address, property_type, state, statename, city, cityname, isEdit } =
    useSelector((state) => state.listing);

  // set data for update
  useEffect(() => {
    if (isEdit) {
      const item = route.params.item;

      dispatch({ type: GLOBALTYPES.ADDRESS, payload: item.address });
      dispatch({
        type: GLOBALTYPES.PROPERTY_TYPE,
        payload: item.property_type,
      });
      dispatch({ type: GLOBALTYPES.STATE, payload: item.state });
      dispatch({ type: GLOBALTYPES.STATE_NAME, payload: item.statename });
      dispatch({ type: GLOBALTYPES.CITY, payload: item.city });
      dispatch({ type: GLOBALTYPES.CITY_NAME, payload: item.cityname });
    }
  }, [isEdit]);

  // load the states when the page renders
  useEffect(() => {
    handleState("NG");
  }, []);

  const handleState = (countryCode) => {
    setStateloading(true);
    var config = {
      method: "get",
      url: `${BASE_URL}/countries/${countryCode}/states`,
      headers: {
        "X-CSCAPI-KEY": API_KEY,
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        var count = Object.keys(response.data).length;
        let stateArray = [];
        for (var i = 0; i < count; i++) {
          stateArray.push({
            value: response.data[i].iso2,
            label: response.data[i].name,
          });
        }
        setStateData(stateArray);
        setStateloading(false);
      })
      .catch(function (error) {
        console.log(error);
        setStateloading(false);
      });
  };

  const handleCity = (countryCode, stateCode) => {
    setCityloading(true);
    var config = {
      method: "get",
      url: `${BASE_URL}/countries/${countryCode}/states/${stateCode}/cities`,
      headers: {
        "X-CSCAPI-KEY": API_KEY,
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        var count = Object.keys(response.data).length;
        let cityArray = [];
        for (var i = 0; i < count; i++) {
          cityArray.push({
            value: response.data[i].id,
            label: response.data[i].name,
          });
        }
        setCityData(cityArray);
        setCityloading(false);
      })
      .catch(function (error) {
        console.log(error);
        setCityloading(false);
      });
  };

  const handleSubmit = () => {
    if (address === "" || property_type === "" || state === "" || city === "") {
      Alert.alert("Input cannot be empty");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      navigation.navigate("ListProperty");
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
              placeholder={!isFocus ? "Select property type" : "..."}
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
              data={stateData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={
                state === ""
                  ? "Select state"
                  : stateloading
                  ? "loading"
                  : statename
              }
              searchPlaceholder="Search..."
              value={state}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                dispatch({ type: GLOBALTYPES.STATE, payload: item.value });
                dispatch({ type: GLOBALTYPES.STATE_NAME, payload: item.label });
                handleCity("NG", item.value);
                // handleState(country);
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
                data={cityData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                  city === ""
                    ? "Select city"
                    : cityloading
                    ? "loading"
                    : cityname
                }
                searchPlaceholder="Search..."
                value={city}
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
    color: colors.textLight,
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
