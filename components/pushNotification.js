// import { View, Text } from "react-native";
// import React, { useEffect } from "react";
// import * as Notifications from "expo-notifications";
// import { useSelector } from "react-redux";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//   }),
// });

// const PushNotification = () => {
//   const { token } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (token) {
//       registerForPushNotificationsAsync();
//     }
//   }, [token]);

//   //
//   async function registerForPushNotificationsAsync() {
//     let token;

//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);

//     return token;
//   }

//   return;
// };

// export default PushNotification;

// // ExponentPushToken[VquLZ4N5txMNtuVUgs9x36]
