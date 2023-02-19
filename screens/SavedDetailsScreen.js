import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Share,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import GoBack from "../common/GoBack";
import Carousel from "../components/Carousel";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import { addComma } from "comma-separator";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import Tab from "../components/Tab";
import { safetytips } from "../constants/safetytips";

//

const SavedDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { token, user } = useSelector((state) => state.auth);
  const { callback, saved_properties } = useSelector((state) => state.property);
  const { favloading, reportlistingloading } = useSelector(
    (state) => state.loading
  );
  const dispatch = useDispatch();
  const [check, setCheck] = useState(null);

  const {
    _id,
    address,
    property_type,
    bedrooms,
    bathrooms,
    toilets,
    status,
    price,
    images,
    reportedBy,
    updatedAt,
    postedBy,
  } = route.params.item;

  useEffect(() => {
    const res = reportedBy.find((item) => item.user === user._id);
    setCheck(res);
  }, []);

  const posted = saved_properties.find(
    (item) => item.postedBy._id === postedBy
  );

  const newPosted = posted.postedBy;
  const id = posted.postedBy._id;

  // add favourite method
  const saveProperty = () => {
    if (token === "") {
      Alert.alert("Kindly login to save properties");
      return;
    }
    const data = {
      list_id: _id,
    };

    dispatch(saveProperties(data, token, callback));
  };

  // check if user is logged in before reporting a listing
  const report = () => {
    if (token === "") {
      Alert.alert("Kindly login to report this property");
      return;
    }

    navigation.navigate("ReportListing", { _id });
  };

  // onshare method -  for sharing on social media
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${property_type} at ${address} | Price : ${price} || https://hapartment-client.vercel.app/listings/${_id}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          //dismissed
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  //
  return (
    <View style={styles.detailsWrapper}>
      <GoBack navigation={navigation} title="Apartment Details" />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Carousel images={images} />

        <View style={styles.detailsName}>
          <Text style={styles.name}>{property_type}</Text>
          <Text style={styles.amount}>₦{addComma(price)}</Text>
        </View>

        <View style={styles.locationWrapper}>
          <MaterialCommunityIcons
            name="map-marker"
            size={18}
            color={colors.textLight}
            style={{ marginLeft: -3 }}
          />
          <Text style={styles.locationText}>{address}</Text>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.cardFooterBox}>
            <FontAwesome5 name="bed" size={16} color={colors.textLight} />
            <Text style={styles.footerBoxText}>
              {bedrooms}{" "}
              {bedrooms === "singleroom"
                ? ""
                : bedrooms === "room&parlour"
                ? ""
                : bedrooms === "selfcontain"
                ? ""
                : bedrooms === "1"
                ? "Bedroom"
                : "Bedrooms"}
            </Text>
          </View>
          <View style={styles.cardFooterBox}>
            <FontAwesome5 name="bath" size={16} color={colors.textLight} />
            <Text style={styles.footerBoxText}>{bathrooms} Bathroom</Text>
          </View>
          <View style={styles.cardFooterBox}>
            <FontAwesome5 name="toilet" size={16} color={colors.textLight} />

            <Text style={styles.footerBoxText}>{toilets} Toilet</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={saveProperty}
          activeOpacity={0.7}
          style={styles.save}
        >
          {favloading ? (
            <Text>Saving property...</Text>
          ) : (
            <>
              <MaterialIcons
                name="favorite-outline"
                size={16}
                color={colors.textLight}
              />
              <Text style={styles.saveText}>Save</Text>
            </>
          )}
        </TouchableOpacity>

        {status === "verified" ? (
          <Text style={styles.verified}>Property verified</Text>
        ) : (
          <Text style={styles.pending}>
            Property still pending verification
          </Text>
        )}

        <Tab params={route.params.item} />

        {/* video section */}
        {/* <View style={styles.videosWrapper}>
          <Video />
        </View> */}

        <View style={styles.tipsWrapper}>
          <Text style={styles.tipsHeading}>Safety Tips</Text>

          {safetytips.map((item) => (
            <View key={item.id} style={styles.tipsBox}>
              <Text style={styles.tipsText}>{item.id} </Text>
              <Text style={styles.tipsText}>{item.text}</Text>
            </View>
          ))}
        </View>

        {/* share */}
        <TouchableOpacity
          onPress={onShare}
          activeOpacity={0.7}
          style={styles.shareWrapper}
        >
          <Text style={styles.share}>Share Property</Text>
        </TouchableOpacity>

        {/* date section */}
        <View style={styles.videoWrapper}>
          <View style={styles.dateWrapper}>
            <Text style={styles.cardTime}>
              Property updated : {format(updatedAt)}
            </Text>
          </View>
        </View>

        {/* share */}
        {/* <View style={styles.shareWrapper}>
          <View style={styles.shareHeader}>
            <AntDesign name="sharealt" size={18} color={colors.textDark} />
            <Text style={styles.shareText}>Share this property</Text>
          </View>

          <View style={styles.shareIcons}>
            <AntDesign name="facebook-square" size={26} color="#3b5998" />
            <FontAwesome name="twitter-square" size={26} color="#00acee" />
            <FontAwesome5
              name="whatsapp-square"
              size={26}
              color={colors.primary}
            />
          </View>
        </View> */}

        {/* report listing */}
        <TouchableOpacity
          onPress={report}
          activeOpacity={0.7}
          style={styles.reportWrapper}
          disabled={check ? true : false}
        >
          {reportlistingloading ? (
            <Text>Reporting...</Text>
          ) : (
            <>
              <Octicons name="megaphone" size={14} color="red" />
              <Text style={styles.reportText}>
                {check ? "You already report property" : "Report Listing"}
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Agent section */}
        <View style={styles.agentWrapper}>
          <View style={styles.agentBox}>
            {newPosted.image === null ? (
              <Image
                source={require("../assets/images/user.jpg")}
                style={styles.agentImage}
              />
            ) : (
              <Image
                source={{ uri: newPosted.image }}
                style={styles.agentImage}
              />
            )}
            <View>
              <Text style={styles.agentName}>{newPosted.fullname}</Text>
              <Text style={styles.desc}>Agent</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.viewWrapper}
            onPress={() => navigation.navigate("LandlordProfileScreen", { id })}
          >
            <Text style={styles.viewText}>View Agent</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SavedDetailsScreen;

const styles = StyleSheet.create({
  detailsWrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  detailsName: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontFamily: "NunitoSans-Bold",
    color: colors.primary,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    fontFamily: "NunitoSans-Bold",
    color: colors.primary,
    fontWeight: "bold",
  },
  locationWrapper: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 13,
    fontFamily: "NunitoSans-Regular",
    color: colors.textLight,
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 15,
    height: 50,
  },
  cardFooterBox: {
    alignItems: "center",
    height: 50,
    borderWidth: 0.3,
    borderColor: colors.textLighter,
    flexDirection: "column",
    justifyContent: "center",
    width: "32%",
  },
  footerBoxText: {
    color: colors.textLight,
    fontSize: 12,
    fontFamily: "NunitoSans-Regular",
  },
  save: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 20,
    borderWidth: 0.3,
    borderColor: colors.primary,
    height: 40,
    borderRadius: 3,
  },
  saveText: {
    color: colors.primary,
    textTransform: "uppercase",
    marginLeft: 5,
  },
  verified: {
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: "center",
    color: colors.primary,
    fontWeight: "600",
  },
  pending: {
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: "center",
    color: "red",
    fontWeight: "600",
  },

  map: {
    backgroundColor: colors.primary,
    padding: 12,
    borderWidth: 0.3,
    marginLeft: 20,
    width: 170,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "transparent",
  },

  descriptionWrapper: {
    marginHorizontal: 10,
    marginTop: 20,
    padding: 15,
    borderWidth: 0.3,
    borderColor: colors.textLighter,
    borderRadius: 15,
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
    width: Platform.OS === "ios" ? 170 : 150,
    borderRadius: 20,
  },

  facilitiesText: {
    // fontFamily: "//NunitoSans-Bold",
    textAlign: "center",
    fontSize: Platform.OS === "ios" ? 15 : 12,
    color: colors.textLight,
  },
  tipsWrapper: {
    paddingHorizontal: 20,
    marginVertical: 40,
    marginBottom: 20,
    padding: 25,
    backgroundColor: colors.light,
    width: "100%",
  },
  tipsHeading: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 20,
  },
  tipsBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  tipsText: {
    color: colors.textDark,
    lineHeight: 25,
  },
  videoWrapper: {
    marginHorizontal: 10,
    marginTop: 20,
    padding: 15,
    borderWidth: 0.3,
    borderColor: colors.textLighter,
    borderRadius: 15,
  },
  videosWrapper: {
    marginHorizontal: 10,
    marginTop: 20,
    padding: 15,
    borderWidth: 0.3,
    borderColor: colors.textLighter,
  },
  dateWrapper: {
    padding: 12,
    borderWidth: 0.3,
    borderColor: colors.textLight,
    alignItems: "center",
    color: colors.textLight,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTime: { color: colors.textLight },
  shareWrapper: {
    marginTop: 20,
    marginHorizontal: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  share: {
    color: colors.primary,
    fontSize: 16,
  },
  reportWrapper: {
    padding: 12,
    borderWidth: 0.3,
    borderColor: "red",
    alignItems: "center",
    color: colors.textLight,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 40,
    flexDirection: "row",
  },
  reportText: {
    color: "red",
    marginLeft: 5,
    fontFamily: "NunitoSans-Regular",
  },
  agentWrapper: {
    height: 100,
    borderWidth: 0.3,
    borderColor: colors.textLight,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 10,
    width: "100%",
    // padding: 15,
  },
  agentBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  agentImage: {
    height: 60,
    width: 60,
    borderRadius: 40,
    marginRight: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  agentName: {
    fontSize: 14,
    fontFamily: "NunitoSans-Bold",
    color: colors.secondary,
    fontWeight: "600",
  },
  desc: {
    fontSize: 11,
    fontFamily: "NunitoSans-Regular",
    color: colors.primary,
  },
  viewWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 20,
  },
  viewText: {
    color: colors.white,
    fontFamily: "NunitoSans-Bold",
    fontSize: 11,
    fontWeight: "600",
  },
});
