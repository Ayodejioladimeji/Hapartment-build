import { StyleSheet, View } from "react-native";
import { Placeholder, PlaceholderLine, ShineOverlay } from "rn-placeholder";
import colors from "../../assets/colors/colors";

const NotificationSkeletal = () => {
  return (
    <>
      <View style={styles.wrapper}>
        <Placeholder Animation={ShineOverlay} width={300}>
          <PlaceholderLine width={100} />
          <PlaceholderLine width={90} />
          <PlaceholderLine width={80} />
          <PlaceholderLine width={70} />
        </Placeholder>
      </View>
      <View style={styles.wrapper}>
        <Placeholder Animation={ShineOverlay} width={300}>
          <PlaceholderLine width={100} />
          <PlaceholderLine width={90} />
          <PlaceholderLine width={80} />
          <PlaceholderLine width={70} />
        </Placeholder>
      </View>
      <View style={styles.wrapper}>
        <Placeholder Animation={ShineOverlay} width={300}>
          <PlaceholderLine width={100} />
          <PlaceholderLine width={90} />
          <PlaceholderLine width={80} />
          <PlaceholderLine width={70} />
        </Placeholder>
      </View>
    </>
  );
};

export default NotificationSkeletal;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    borderWidth: 0.5,
    borderColor: colors.textLight,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 8,
  },
});
