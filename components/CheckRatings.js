import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CheckRatings = ({metacritic}) => {
  if (metacritic !== null && metacritic >= 80) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.text}>Rating: </Text>
        <Text style={[styles.innerText, styles.ratingGreen]}>{metacritic}</Text>
      </View>
    );
  } else if (metacritic !== null && metacritic >= 50 && metacritic < 80) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.text}>Rating: </Text>
        <Text style={[styles.innerText, styles.ratingYellow]}>
          {metacritic}
        </Text>
      </View>
    );
  } else if (metacritic !== null && metacritic >= 0 && metacritic < 50) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.text}>Rating: </Text>
        <Text style={[styles.innerText, styles.ratingRed]}>{metacritic}</Text>
      </View>
    );
  }
};

export default CheckRatings;

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: "bold",
        margin: 2,
      },
      innerText: {
        fontWeight: "400",
      },
    ratingGreen: {
        backgroundColor:"green",
        color:"white",
        padding: 6,
        borderRadius:15
      },
      ratingYellow: {
        backgroundColor:"gold",
        color:"white",
        padding: 6,
        borderRadius:15
      },
      ratingRed: {
        backgroundColor:"red",
        color:"white",
        padding: 6,
        borderRadius:15
      },
});
