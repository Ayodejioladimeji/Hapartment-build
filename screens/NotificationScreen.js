import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../assets/colors/colors";
import GoBack from "../common/GoBack";
import {
  deleteNotification,
  getNotifications,
} from "../redux/actions/notificationAction";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { format } from "timeago.js";
import Loading from "../common/Loading";
import NotificationSkeletal from "../common/skeletal_loader/NotificationSkeletal";

//

const NotificationScreen = ({ navigation }) => {
  const { token } = useSelector((state) => state.auth);
  const { callback } = useSelector((state) => state.property);
  const { my_notification } = useSelector((state) => state.notification);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications(token, setLoading));
  }, [callback]);

  //

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <GoBack navigation={navigation} title="Notifications" />

      {loading ? (
        <NotificationSkeletal />
      ) : (
        <ScrollView style={styles.notificationWrapper}>
          {my_notification.length !== 0 && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("CreateNotification")}
              style={styles.create}
            >
              <Text style={styles.createText}>Create new notification</Text>
            </TouchableOpacity>
          )}

          {my_notification.length === 0 && !loading ? (
            <View style={styles.emptyWrapper}>
              <Image
                style={styles.emptyImage}
                source={require("../assets/images/empty.png")}
              />
              <Text style={styles.emptyText}>
                You haven't created any notifications
              </Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("CreateNotification")}
                style={styles.create}
              >
                <Text style={styles.createText}>Create new notification</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.notification}>
              <Text style={styles.heading}>Created Notifications</Text>

              {my_notification.map((item) => {
                const {
                  _id,
                  property_type,
                  statename,
                  cityname,
                  bathrooms,
                  toilets,
                  furnishing,
                  min_price,
                  max_price,
                  createdAt,
                } = item;
                return (
                  <View style={styles.notificationBox} key={item._id}>
                    <Text style={styles.type}>{property_type}</Text>
                    <Text style={styles.text}>
                      {statename}, {cityname}
                    </Text>
                    <Text style={styles.text}>
                      {bathrooms} Bathrooms, {toilets} Toilets
                    </Text>
                    <Text style={styles.text}>
                      Property should be {""}
                      <Text style={{ color: colors.primary }}>
                        {furnishing}
                      </Text>
                    </Text>
                    <Text style={styles.text}>
                      ₦{min_price} - ₦{max_price}
                    </Text>
                    <Text style={styles.time}>Created {format(createdAt)}</Text>

                    <FontAwesome
                      onPress={() =>
                        dispatch(deleteNotification(_id, token, callback))
                      }
                      name="times-circle-o"
                      style={styles.times}
                    />
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  notificationWrapper: {
    paddingHorizontal: 15,
    marginVertical: 25,
  },
  create: {
    height: 50,
    width: 200,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 5,
  },
  createText: {
    color: colors.white,
    fontWeight: "600",
  },
  notification: {
    marginTop: 50,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  notificationBox: {
    borderWidth: 0.3,
    borderColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    paddingVertical: 25,
    marginBottom: 30,
    position: "relative",
  },
  type: {
    fontWeight: "500",
    fontSize: 16,
    textTransform: "uppercase",
    color: colors.primary,
  },
  text: {
    lineHeight: 30,
    color: colors.textDark,
    fontSize: 15,
    textTransform: "capitalize",
  },
  time: {
    lineHeight: 30,
    color: colors.textLight,
    fontSize: 15,
    alignSelf: "center",
    marginTop: 20,
  },

  times: {
    fontSize: 20,
    color: colors.textLight,
    position: "absolute",
    top: 15,
    right: 15,
  },
  emptyWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyImage: {
    height: 150,
    width: 150,
  },
  emptyText: {
    color: colors.textLight,
    fontSize: 16,
    marginBottom: 40,
  },
});
