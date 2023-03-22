import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React from "react";

const LoadMore = ({ loading, setLoading, setVisible }) => {
  const showItems = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible((prevState) => prevState + 3);
      setLoading(false);
    }, 2000);
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={showItems}>
      {loading ? (
        <ActivityIndicator />
      ) : (
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
      )}
    </TouchableOpacity>
  );
};

export default LoadMore;
