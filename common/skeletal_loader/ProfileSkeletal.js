import { StyleSheet, View } from "react-native";
import { Placeholder, PlaceholderLine, ShineOverlay } from "rn-placeholder";
import colors from "../../assets/colors/colors";

const ProfileSkeletal = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Placeholder Animation={ShineOverlay} width={200}>
        <PlaceholderLine
          style={{
            borderRadius: 50,
            width: 100,
            height: 100,
            marginRight: "auto",
            marginLeft: "auto",
          }}
        />
        <PlaceholderLine
          width={50}
          style={{ marginRight: "auto", marginLeft: "auto" }}
        />
        <PlaceholderLine
          width={40}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
        <PlaceholderLine
          width={70}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            height: 50,
            borderRadius: 25,
          }}
        />
      </Placeholder>
    </View>
  );
};

export default ProfileSkeletal;

const styles = StyleSheet.create({
  cardWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0.5, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    width: Platform.OS === "ios" ? 230 : 210,
    height: 280,
    marginRight: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});
