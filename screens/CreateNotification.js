import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../common/GoBack";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
// import { BASE_URL, API_KEY } from "@env";
import propertyData from "../constants/propertyData";
import { strictAddComma } from "comma-separator";
import bathrooms from "../constants/bathrooms";
import furnishing from "../constants/furnishing";
import { useDispatch, useSelector } from "react-redux";
import { createNotification } from "../redux/actions/notificationAction";

//
const BASE_URL = "https://api.countrystatecity.in/v1";

const API_KEY = "UnM1RmVPMFB0M09FN1RIWGZZM2Vyc2pvMzFrb3l5dDhQa3RzR1ZIbA==";

//

const CreateNotification = () => {
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [statename, setStatename] = useState(null);
  const [cityname, setCityname] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [propertyType, setPropertyType] = useState(null);
  const [furnish, setFurnish] = useState("");
  const [bath, setBath] = useState("");
  const [toilet, setToilet] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { callback } = useSelector((state) => state.property);
  const { createnotificationloading } = useSelector((state) => state.loading);
  const { token } = useSelector((state) => state.auth);

  // load the states when the page renders
  useEffect(() => {
    handleState("NG");
  }, []);

  const handleState = (countryCode) => {
    var config = {
      method: "get",
      url: `${BASE_URL}/countries/${countryCode}/states`,
      headers: {
        "X-CSCAPI-KEY": API_KEY,
      },
    };

    axios(config)
      .then(function (response) {
        var count = Object.keys(response.data).length;
        let stateArray = [];
        for (var i = 0; i < count; i++) {
          stateArray.push({
            value: response.data[i].iso2,
            label: response.data[i].name,
          });
        }
        setStateData(stateArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCity = (countryCode, stateCode) => {
    var config = {
      method: "get",
      url: `${BASE_URL}/countries/${countryCode}/states/${stateCode}/cities`,
      headers: {
        "X-CSCAPI-KEY": API_KEY,
      },
    };

    axios(config)
      .then(function (response) {
        var count = Object.keys(response.data).length;
        let cityArray = [];
        for (var i = 0; i < count; i++) {
          cityArray.push({
            value: response.data[i].id,
            label: response.data[i].name,
          });
        }
        setCityData(cityArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // handlesubmit
  const handleSubmit = () => {
    if (
      !propertyType ||
      !statename ||
      !cityname ||
      !bathrooms ||
      !toilet ||
      !furnish ||
      !minPrice ||
      !maxPrice
    ) {
      Alert.alert("Input cannot be empty");
      return;
    }

    const data = {
      property_type: propertyType,
      statename,
      cityname,
      bathrooms: bath,
      toilets: toilet,
      furnishing: furnish,
      min_price: minPrice,
      max_price: maxPrice,
    };

    dispatch(createNotification(data, token, callback, navigation));
  };

  //

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <GoBack navigation={navigation} title="Create Notification" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.filterHeading}>
            Fill the form below to create Notification
          </Text>

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
              value={propertyType}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setPropertyType(item.value);
                setIsFocus(false);
              }}
            />
          </View>

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
              data={bathrooms}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select bathroom"
              value={bath}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setBath(item.value);
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
              data={bathrooms}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select toilet"
              value={toilet}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setToilet(item.value);
                setIsFocus(false);
              }}
            />
          </View>

          <View style={styles.states}>
            <Text style={styles.selectHeading}>Select State</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={stateData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select state"
              searchPlaceholder="Search..."
              value={state}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setState(item.value);
                handleCity("NG", item.value);
                setIsFocus(false);
                setStatename(item.label);
              }}
            />
          </View>

          <View style={styles.city}>
            <Text style={styles.selectHeading}>Select City</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={cityData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select city"
              searchPlaceholder="Search..."
              value={city}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setCity(item.value);
                setIsFocus(false);
                setCityname(item.label);
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
              data={furnishing}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Choose Furnishing"
              value={furnish}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setFurnish(item.value);
                setIsFocus(false);
              }}
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.selectHeading}>Price </Text>
            <View style={styles.inputDiv}>
              <TextInput
                placeholder="Min #12,000"
                style={styles.textInputs}
                onChangeText={(item) => setMinPrice(strictAddComma(item))}
                value={minPrice}
              />

              <TextInput
                placeholder="Max #50,000,000"
                style={styles.textInputs}
                onChangeText={(item) => setMaxPrice(strictAddComma(item))}
                value={maxPrice}
              />
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.filterButton}
            onPress={handleSubmit}
          >
            {createnotificationloading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text
                style={{
                  color: colors.white,
                  textTransform: "uppercase",
                  fontWeight: "700",
                }}
              >
                Create Notification
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
  },
  filterHeading: {
    fontSize: Platform.OS === "ios" ? 17 : 16,
    textAlign: "center",
    marginBottom: 30,
    // fontFamily: "//NunitoSans-Bold",
    color: colors.secondary,
    paddingHorizontal: 30,
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
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 30,
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
