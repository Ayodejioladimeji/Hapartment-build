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
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { categories } from "../constants/category";
import { strictAddComma } from "comma-separator";
import CreateListingStatusBar from "../common/CreateListingStatusBar";

SplashScreen.preventAutoHideAsync();

//

const Description = ({ route }) => {
  const navigation = useNavigation();
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const { category, video, description, price, isEdit } = useSelector(
    (state) => state.listing
  );
  const dispatch = useDispatch();

  // set data for update
  useEffect(() => {
    if (isEdit) {
      const item = route.params.item;

      dispatch({ type: GLOBALTYPES.CATEGORY, payload: item.category });
      dispatch({
        type: GLOBALTYPES.PRICE,
        payload: item.price,
      });
      dispatch({ type: GLOBALTYPES.DESCRIPTION, payload: item.description });
      dispatch({
        type: GLOBALTYPES.VIDEO,
        payload: item.video,
      });
    }
  }, [isEdit]);

  // handleSubmit

  const handleSubmit = () => {
    if (category === "" || price === "" || description === "") {
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
          <Text style={styles.heading}>Property Description</Text>

          <View style={styles.country}>
            <Text style={styles.selectHeading}>Choose Category</Text>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus && { borderColor: colors.primary },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={categories}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select category" : "..."}
              searchPlaceholder="Search..."
              value={category}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                dispatch({ type: GLOBALTYPES.CATEGORY, payload: item.value });
                setIsFocus(false);
              }}
            />
          </View>

          <View style={styles.country}>
            <Text style={styles.selectHeading}>Add Price / Annum</Text>
            <View style={styles.inputDiv}>
              <TextInput
                placeholder="Min #12,000"
                style={styles.textInputs}
                onChangeText={(text) =>
                  dispatch({
                    type: GLOBALTYPES.PRICE,
                    payload: strictAddComma(text),
                  })
                }
                value={price}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.country}>
            <Text style={styles.selectHeading}>Add Description</Text>
            <TextInput
              placeholder="Property description"
              onChangeText={(text) =>
                dispatch({ type: GLOBALTYPES.DESCRIPTION, payload: text })
              }
              style={[
                styles.addressInput,
                isFocus && { borderColor: colors.primary },
              ]}
              value={description}
              placeholderTextColor={colors.textLight}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              multiline={true}
              numberOfLines={10}
            />
          </View>

          <View style={styles.country}>
            <Text style={styles.selectHeading}>Youtube Link (Optional)</Text>
            <TextInput
              placeholder="Paste youtube video link here"
              onChangeText={(text) =>
                dispatch({ type: GLOBALTYPES.VIDEO, payload: text })
              }
              style={[
                styles.textInputs,
                isFocus && { borderColor: colors.primary },
              ]}
              value={video}
              placeholderTextColor={colors.textLight}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />
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

export default Description;

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
