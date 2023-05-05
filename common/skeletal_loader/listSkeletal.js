import { StyleSheet, View } from "react-native";
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  ShineOverlay,
} from "rn-placeholder";
import colors from "../../assets/colors/colors";

//

const ListSkeletal = () => {
  return (
    <View style={styles.cardWrapper}>
      <Placeholder Animation={ShineOverlay} Left={PlaceholderMedia}>
        <PlaceholderLine style={{ marginTop: 15, width: 220 }} />
      </Placeholder>
    </View>
  );
};

export default ListSkeletal;

const styles = StyleSheet.create({
  cardWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    marginHorizontal: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 45,
  },
});
