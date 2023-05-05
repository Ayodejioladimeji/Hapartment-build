import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React from "react";

const LoadMore = ({ loading, setLoading, setVisible }) => {
  const showItems = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible((prevState) => prevState + 5);
      setLoading(false);
    }, 1000);
  };

  return (
    <TouchableOpacity onPress={showItems}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text
            style={{
              color: "green",
              alignSelf: "center",
              marginVertical: 10,
              textDecorationLine: "underline",
            }}
          >
            See More
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default LoadMore;
