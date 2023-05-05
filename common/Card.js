import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import colors from "../assets/colors/colors";

//

const Card = ({ item, navigation }) => {
  //
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.cardWrapper}
        onPress={() => navigation.navigate("DetailsScreen", { item })}
      >
        <View style={styles.imageWrapper}>
          {/* <Image source={{ uri: item.image[0] }} style={styles.cardImage} /> */}
          <View style={styles.verify}>
            <Text style={styles.verifyText}>Verified</Text>
          </View>

          <TouchableOpacity activeOpacity={0.5} style={styles.favoriteWrapper}>
            <MaterialIcons name="favorite" style={styles.favorite} />
          </TouchableOpacity>
        </View>

        <View style={styles.cardBox}>
          <View style={styles.cardName}>
            <Text style={styles.nameText}>{item.property_type}</Text>
            <Text style={styles.amountText}>₦{item.price}</Text>
          </View>

          <View style={styles.cardLocation}>
            <MaterialCommunityIcons
              name="map-marker"
              size={18}
              color={colors.textLight}
              style={{ marginLeft: -3 }}
            />
            <Text style={styles.locationText}>{item.address}</Text>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.cardFooterBox}>
              <Ionicons name="bed-outline" size={15} color={colors.textLight} />
              <Text style={styles.footerBoxText}>
                {item.bedrooms === "singleroom"
                  ? "1"
                  : item.bedrooms === "room&parlour"
                  ? "1"
                  : item.bedrooms === "selfcontain"
                  ? "1"
                  : item.bedrooms}{" "}
                Bed
              </Text>
            </View>
            <View style={styles.cardFooterBox}>
              <FontAwesome5 name="bath" size={12} color={colors.textLight} />
              <Text style={styles.footerBoxText}>{item.bathrooms} Bath</Text>
            </View>
            <View style={styles.cardFooterBox}>
              <FontAwesome5 name="toilet" size={12} color={colors.textLight} />
              <Text style={styles.footerBoxText}>{item.toilets} Toilet</Text>
            </View>
          </View>

          <View style={styles.cardTimeWrapper}>
            <Text style={styles.cardTime}>Updated {item.updatedAt}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    width: Platform.OS === "ios" ? 230 : 210,
    height: 280,
    backgroundColor: colors.white,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 3,
  },
  imageWrapper: {
    position: "relative",
  },

  cardImage: {
    height: 140,
    width: "100%",
  },

  cardBox: {
    padding: 10,
  },
  cardName: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    fontWeight: "700",
    color: colors.black,
    // fontFamily: "//NunitoSans-Bold",
  },

  nameText: {
    fontWeight: "600",
    fontSize: Platform.OS === "ios" ? 13 : 11,
    // fontFamily: "//NunitoSans-Bold",
  },

  amountText: {
    fontWeight: "700",
    fontSize: Platform.OS === "ios" ? 13 : 12,
  },

  cardLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationText: {
    marginLeft: 2,
    color: colors.black,
    fontSize: Platform.OS === "ios" ? 12 : 11,
    // fontFamily: "//NunitoSans-Regular",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: colors.black,
    marginTop: 3,
  },
  cardFooterBox: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 13,
  },
  footerBoxText: {
    color: colors.black,
    fontSize: Platform.OS === "ios" ? 12 : 11,
    marginLeft: 3,
    // fontFamily: "//NunitoSans-Regular",
  },
  cardTimeWrapper: {
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: colors.textLighter,
    paddingTop: 7,
  },
  cardTime: {
    color: colors.black,
    fontSize: Platform.OS === "ios" ? 12 : 11,
    // fontFamily: "//NunitoSans-Regular",
  },
  verify: {
    backgroundColor: colors.primary,
    height: Platform.OS === "ios" ? 20 : 20,
    paddingLeft: 10,
    width: "40%",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    borderTopRightRadius: 30,
  },
  verifyText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "600",
  },
  favoriteWrapper: {
    position: "absolute",
    top: 10,
    right: 10,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.textLighter,
    borderRadius: 50,
  },
  favorite: {
    color: "red",
    fontSize: 20,
  },
});
