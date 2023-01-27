import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../assets/colors/colors";

const Map = ({ map, address }) => {
  const { latitude, longitude, city, region, country } = map;
  const [switchMap, setSwitchMap] = useState("terrain");

  const homeAddress = "12 Ayodeji street, Oke Ejigbo, Abeokuta";

  useEffect(() => {
    const getMap = async () => {
      const { latitude, longitude } = await Location.geocodeAsync(homeAddress);
      console.log(latitude, longitude);
    };
    getMap();
  }, []);

  //
  return (
    <View style={styles.container}>
      <View style={styles.mapTop}>
        <TouchableOpacity
          style={styles.maps}
          onPress={() => setSwitchMap("terrain")}
        >
          <Text>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.maps}
          onPress={() => setSwitchMap("hybrid")}
        >
          <Text>Satelite</Text>
        </TouchableOpacity>
      </View>

      {/*  */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        provider={PROVIDER_GOOGLE}
        mapType={switchMap}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsTraffic={true}
        showsIndoors={true}
        showsIndoorLevelPicker={true}
        zoomEnabled={true}
        zoomTapEnabled={true}
        loadingEnabled={true}
        showsBuildings={true}
        maxZoomLevel={20}
        minZoomLevel={0}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          pinColor="red"
        >
          <Callout>
            {/* <Text style={styles.mapText}> {address}</Text> */}
            <Text style={styles.mapText}> {city}</Text>
            <Text style={styles.mapText}> {region}</Text>
            <Text style={styles.mapText}>{country}</Text>
          </Callout>
        </Marker>

        <Circle
          center={{
            latitude: latitude,
            longitude: longitude,
          }}
          radius={100}
        />

        <View style={styles.overlay}>
          <Text style={styles.text}>Touchable Opacity</Text>
        </View>
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    overflow: "hidden",
    position: "relative",
  },
  mapTop: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 0,
    backgroundColor: colors.white,
    zIndex: 11,
  },
  maps: {
    height: 40,
    width: 100,
    borderWidth: 0.3,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  map: {
    width: 350,
    height: 300,
    width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
  },
  mapText: {
    lineHeight: 25,
    paddingHorizontal: 30,
  },
  overlay: {
    position: "absolute",
    // bottom: 50,
    backgroundColor: colors.light,
    zIndex: 1,
    height: 300,
    width: "100%",
  },
});
