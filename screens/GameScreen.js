import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { GameImage } from "./Home";

const GameScreen = ({ route, navigation }) => {
  const id = route.params.game;

  function Skank() {
    if (id.metacritic !== null) {
      return (
        <Text style={styles.text}>
          Metacritic Score:{" "}
          <Text style={styles.innerText}>{id.metacritic}</Text>
        </Text>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Title: <Text style={styles.innerText}>{id.name}</Text>
      </Text>
      <Text style={styles.text}>
        Released: <Text style={styles.innerText}>{id.released}</Text>
      </Text>
      {/* <Text style={styles.text}>
        Metacritic Score: <Text style={styles.innerText}>{id.metacritic}</Text>
      </Text> */}
      <Skank />
      <Image
        style={{ width: 300, height: 300 }}
        source={{ uri: id.background_image }}
      />
      <TextInput></TextInput>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  innerText: {
    fontWeight: "400",
  },
});
