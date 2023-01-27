import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { WebView } from "react-native-webview";

export default function Video() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <WebView
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        source={{
          uri: "https://www.youtube.com/watch?v=JkeZZytewsg",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    alignSelf: "center",
    width: "100%",
    height: 200,
  },
});
