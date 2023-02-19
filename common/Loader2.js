import { StyleSheet, View } from "react-native";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  ShineOverlay,
} from "rn-placeholder";
import colors from "../assets/colors/colors";

const Loader2 = () => {
  return (
    <View style={styles.cardWrapper}>
      <Placeholder Left={PlaceholderMedia} Animation={ShineOverlay}>
        <PlaceholderLine width={80} />
        <PlaceholderLine />
        <PlaceholderLine />
        <PlaceholderLine width={50} />
      </Placeholder>
    </View>
  );
};

export default Loader2;

const styles = StyleSheet.create({
  cardWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    height: 130,
    marginRight: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    width: "100%",
  },
});
