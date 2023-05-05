import React, { useState } from "react";

import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";

const Map = ({ map }) => {
  const { latitude, longitude } = map;
  const [switchMap, setSwitchMap] = useState("terrain");
  const navigation = useNavigation();

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
        />

        <Circle
          center={{
            latitude: latitude,
            longitude: longitude,
          }}
          radius={100}
        />
      </MapView>

      <TouchableOpacity
        onPress={() => navigation.navigate("MapScreen", map)}
        activeOpacity={0.7}
        style={styles.overlay}
      >
        <Text style={styles.text}>Click to open fullscreen</Text>
      </TouchableOpacity>
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
    top: 0,
    backgroundColor: colors.light,
    zIndex: 1,
    height: 300,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    color: colors.black,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
