import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../assets/colors/colors";
import { AntDesign, Feather } from "@expo/vector-icons";
import Map from "./Map";

//

const Tab = ({ params }) => {
  const {
    country,
    statename,
    cityname,
    address,
    furnishing,
    home_facilities,
    area_facilities,
    description,
    map,
  } = params;
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <View style={styles.tabcontainer}>
      <View style={styles.tabcenter}>
        {/* THE SECTION OF THE TABS */}
        <View style={styles.bloctabs}>
          <TouchableWithoutFeedback onPress={() => toggleTab(1)}>
            <View style={toggleState === 1 ? styles.activetabs : styles.tabs}>
              <AntDesign name="filetext1" size={14} color={colors.textLight} />
              <Text style={styles.buttonText}>Property Details</Text>
            </View>
          </TouchableWithoutFeedback>

          {map[0] !== null && (
            <TouchableWithoutFeedback onPress={() => toggleTab(2)}>
              <View style={toggleState === 2 ? styles.activetabs : styles.tabs}>
                <Feather name="map" size={14} color={colors.textLight} />
                <Text style={styles.buttonText}>View on Map</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>

        {/* THE SECTION OF THE CONTENT */}
        <View style={styles.contenttabs}>
          {toggleState === 1 && (
            <>
              <View style={styles.descriptionWrapper}>
                <Text style={styles.description}>Property Location</Text>
                <Text style={styles.content}>Country : {country}</Text>
                <Text style={styles.content}>State : {statename}</Text>
                <Text style={styles.content}>City : {cityname}</Text>
              </View>

              <View style={styles.descriptionWrapper}>
                <Text style={styles.description}>Description</Text>
                <Text style={styles.content}>{description}</Text>
              </View>

              <View style={styles.descriptionWrapper}>
                <Text style={styles.description}>
                  Home Facilities Available
                </Text>

                <View style={styles.facilities}>
                  {home_facilities.map((item, index) => {
                    return (
                      <View key={index} style={styles.facilitiesBox}>
                        <Text style={styles.facilitiesText}>{item}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              <View style={styles.descriptionWrapper}>
                <Text style={styles.description}>
                  Area Facilities Available
                </Text>

                <View style={styles.facilities}>
                  {area_facilities.map((item, index) => {
                    return (
                      <View key={index} style={styles.facilitiesBox}>
                        <Text style={styles.facilitiesText}>{item}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* Facilities section */}
              <View style={styles.descriptionWrapper}>
                <Text style={styles.description}>Furnishing</Text>
                <Text style={styles.content}>
                  Property is{" "}
                  <Text style={{ color: colors.primary }}>{furnishing}</Text>
                </Text>
              </View>
            </>
          )}

          {/* Conent Tab Two */}
          {toggleState === 2 && map[0] !== null && (
            <View>
              <Map map={map[0]} address={address} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({
  tabcontainer: {
    marginHorizontal: 10,
  },
  tabcenter: {
    borderWidth: 0.3,
    borderColor: colors.textLighter,
    // paddingBottom: 20,
  },
  bloctabs: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 0.3,
    borderColor: colors.textLighter,
  },
  tabs: {
    padding: 10,
    textAlign: "center",
    borderColor: colors.textLighter,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    color: colors.textLight,
    borderRightWidth: 0.3,
    borderBottomColor: "transparent",
    borderBottomWidth: 2.5,
    flexDirection: "row",
  },

  activetabs: {
    padding: 10,
    textAlign: "center",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    color: colors.textLight,
    borderColor: colors.textLighter,
    borderRightWidth: 0.3,
    borderBottomColor: colors.primary,
    borderBottomWidth: 2.5,
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "NunitoSans-Bold",
    marginLeft: 5,
  },
  contenttabs: {
    flex: 1,
  },
  contents: {
    // paddingHorizontal: 10,
    display: "none",
    marginBottom: 20,
  },
  activecontents: {
    display: "block",
    marginBottom: 20,
  },

  descriptionWrapper: {
    marginHorizontal: 5,
    padding: 15,
    borderWidth: 0.3,
    borderColor: colors.textLighter,
    borderRadius: 15,
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    fontFamily: "NunitoSans-Bold",
    fontWeight: "600",
    marginBottom: 5,
  },
  content: {
    fontFamily: "NunitoSans-Regular",
    lineHeight: 25,
    fontSize: 13,
    color: colors.textLight,
  },
  facilities: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    flexWrap: "wrap",
  },
  facilitiesBox: {
    borderWidth: 0.3,
    borderColor: colors.textLighter,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: Platform.OS === "ios" ? 160 : 140,
    borderRadius: 20,
  },

  facilitiesText: {
    // fontFamily: "//NunitoSans-Bold",
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 15 : 12,
    color: colors.textLight,
  },
  videoWrapper: {
    marginHorizontal: 10,
    marginTop: 20,
    padding: 15,
    borderWidth: 0.3,
    borderColor: colors.textLighter,
    borderRadius: 15,
    height: 400,
  },
  cardTime: { color: colors.textLight },
});
