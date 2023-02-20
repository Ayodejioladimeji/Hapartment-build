import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import GoBack from "../common/GoBack";
import { useNavigation } from "@react-navigation/native";
import colors from "../assets/colors/colors";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useEffect } from "react";
import { agentDetails } from "../redux/actions/profileAction";
import { useDispatch, useSelector } from "react-redux";
import AgentSearchCard from "../common/AgentSearchCard";
import LoadMore from "../common/LoadMore";
import Loader2 from "../common/Loader2";

//

const LandlordProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const id = route.params.id.toString();
  const dispatch = useDispatch();
  const { agent_details } = useSelector((state) => state.profile);
  const { all_listings } = useSelector((state) => state.property);
  const { agentdetailsloading } = useSelector((state) => state.loading);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(5);

  //

  const agentListing = all_listings.filter((item) => item.postedBy._id === id);

  useEffect(() => {
    dispatch(agentDetails(id));
  }, []);

  // Call agent directly
  const callAgent = () => {
    const url = `tel://${agent_details.agent_details.verification[0].identity_mobile}`;
    Linking.openURL(url);
  };

  //
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <GoBack title="Agent Profile" navigation={navigation} />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileWrapper}>
          {agentdetailsloading || agent_details.agent_listing === undefined ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.profileBox}>
              {agent_details?.agent_details === undefined ? (
                <Image
                  source={require("../assets/images/user.jpg")}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={{ uri: agent_details.agent_details.image }}
                  style={styles.profileImage}
                />
              )}
              <Text style={styles.nameText}>
                {agent_details.agent_details.fullname}
              </Text>
              <Text style={styles.usernameText}>
                @{agent_details.agent_details.username}
              </Text>

              <TouchableOpacity
                onPress={callAgent}
                activeOpacity={0.7}
                style={styles.contactWrapper}
              >
                <Feather name="phone-call" size={22} color={colors.white} />
                <Text style={styles.contactText}>
                  {agent_details.agent_details.verification[0].identity_mobile}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.apartment}>
          {agentdetailsloading || agent_details.agent_listing === undefined ? (
            ""
          ) : (
            <Text style={styles.apartmentText}>
              ({agent_details.agent_listing.length}){" "}
              {agent_details.agent_listing.length === 1
                ? "Apartment"
                : "Apartments"}{" "}
              posted by {agent_details.agent_details.username}
            </Text>
          )}

          <View>
            {agentListing
              .slice(0, visible)
              .map((item) =>
                agentdetailsloading ? (
                  <Loader2 key={item._id} />
                ) : (
                  <AgentSearchCard item={item} key={item._id} />
                )
              )}
          </View>

          {visible > agentListing.length ||
          agentdetailsloading ||
          agentListing.length === 0 ? (
            ""
          ) : (
            <LoadMore
              loading={loading}
              setLoading={setLoading}
              setVisible={setVisible}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default LandlordProfileScreen;

const styles = StyleSheet.create({
  profileWrapper: {
    height: 280,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: colors.textLighter,
    borderBottomWidth: Platform.OS === "ios" ? 0.17 : 0.3,
    marginHorizontal: 10,
  },

  profileBox: {
    width: "50%",
  },
  profileImage: {
    height: 100,
    width: 100,
    marginBottom: 10,
    borderRadius: 50,
    alignSelf: "center",
    borderWidth: 4,
    borderColor: colors.primary,
  },
  nameText: {
    // fontFamily: "//NunitoSans-Black",
    fontSize: 17,
    textAlign: "center",
  },
  usernameText: {
    // fontFamily: "//NunitoSans-Bold",
    textAlign: "center",
    fontSize: 15,
  },
  contactWrapper: {
    height: 45,
    width: 170,
    borderRadius: 40,
    backgroundColor: colors.primary,
    marginTop: 15,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  contactText: {
    color: colors.white,
    // fontFamily: "//NunitoSans-Bold",
    marginLeft: 10,
  },
  apartment: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  apartmentText: {
    marginBottom: 20,
    fontSize: 14,
    // fontFamily: "//NunitoSans-Bold",
    alignSelf: "center",
  },
});
