import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import MyStatusBar from "../common/MyStatusBar";
import GoBack from "../common/GoBack";

//

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <GoBack navigation={navigation} title="Settings" />

      <ScrollView style={styles.settingsWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate("FaqScreen")}
          activeOpacity={0.7}
          style={styles.settingsBox}
        >
          <View style={styles.settingsLeft}>
            <AntDesign
              name="questioncircle"
              size={22}
              color="black"
              style={styles.settingsIcon}
            />
            <Text style={styles.settingsText}>FAQS</Text>
          </View>

          <MaterialIcons
            name="chevron-right"
            size={24}
            color="black"
            style={styles.arrow}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://hapartment-client.vercel.app/terms")
          }
          activeOpacity={0.7}
          style={styles.settingsBox}
        >
          <View style={styles.settingsLeft}>
            <MaterialIcons
              name="policy"
              size={22}
              color="black"
              style={styles.settingsIcon}
            />
            <Text style={styles.settingsText}>Terms Of Use</Text>
          </View>

          <MaterialIcons
            name="chevron-right"
            size={24}
            color="black"
            style={styles.arrow}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://hapartment-client.vercel.app/privacypolicy"
            )
          }
          activeOpacity={0.7}
          style={styles.settingsBox}
        >
          <View style={styles.settingsLeft}>
            <MaterialIcons
              name="privacy-tip"
              size={22}
              color="black"
              style={styles.settingsIcon}
            />
            <Text style={styles.settingsText}>Privacy Policy</Text>
          </View>

          <MaterialIcons
            name="chevron-right"
            size={24}
            color="black"
            style={styles.arrow}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://hapartment-client.vercel.app/advertise")
          }
          activeOpacity={0.7}
          style={styles.settingsBox}
        >
          <View style={styles.settingsLeft}>
            <MaterialCommunityIcons
              name="view-gallery-outline"
              size={22}
              color="black"
              style={styles.settingsIcon}
            />
            <Text style={styles.settingsText}>Advertise with us</Text>
          </View>

          <MaterialIcons
            name="chevron-right"
            size={24}
            color="black"
            style={styles.arrow}
          />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={styles.settingsBox}>
          <View style={styles.settingsLeft}>
            <Ionicons
              name="star-half"
              size={22}
              color="black"
              style={styles.settingsIcon}
            />
            <Text style={styles.settingsText}>Rate the app</Text>
          </View>

          <MaterialIcons
            name="chevron-right"
            size={24}
            color="black"
            style={styles.arrow}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL("mailto:support@hapartment.org")}
          activeOpacity={0.7}
          style={styles.settingsBox}
        >
          <View style={styles.settingsLeft}>
            <AntDesign
              name="message1"
              size={22}
              color="black"
              style={styles.settingsIcon}
            />
            <Text style={styles.settingsText}>Leave Feedback</Text>
          </View>

          <MaterialIcons
            name="chevron-right"
            size={24}
            color="black"
            style={styles.arrow}
          />
        </TouchableOpacity>

        <View style={styles.socialIconBox}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.icons}
            onPress={() =>
              Linking.openURL(
                "https://www.facebook.com/profile.php?id=100085724386292&mibextid=ZbWKwL"
              )
            }
          >
            <AntDesign name="facebook-square" size={27} color="#1778f2" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.icons}
            onPress={() =>
              Linking.openURL(
                "https://www.instagram.com/invites/contact/?i=1pqlgg45pg0nl&utm_content=pldblyb"
              )
            }
          >
            <AntDesign name="instagram" size={27} color="#405de6" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.icons}
            onPress={() =>
              Linking.openURL(
                "https://twitter.com/Hapartment11?t=cmOAR5aAypWeGzbLvebt-A&s=09"
              )
            }
          >
            <FontAwesome name="twitter-square" size={27} color="#1da1f2" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.icons}
            onPress={() =>
              Linking.openURL("https://www.linkedin.com/in/hapartment-rentals")
            }
          >
            <AntDesign name="linkedin-square" size={27} color="#0a66c2" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  settingsWrapper: {
    paddingHorizontal: 15,
    marginVertical: 25,
  },
  settingsBox: {
    borderWidth: 0.3,
    borderColor: colors.textDark,
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: Platform.OS === "ios" ? 70 : 60,
    marginBottom: 20,
  },
  settingsLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsIcon: {
    marginRight: 10,
    color: colors.textDark,
  },
  settingsText: {
    color: colors.textDark,
    // fontFamily: "//NunitoSans-Bold",
    fontSize: Platform.OS === "ios" ? 15 : 14,
  },
  arrow: {
    color: colors.textDark,
  },
  socialIconBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: 200,
    alignSelf: "center",
    marginTop: 10,
  },
});
