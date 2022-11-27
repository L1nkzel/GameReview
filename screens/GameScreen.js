import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

const GameScreen = ({ route, navigation }) => {
  const id = route.params.game;
  const [input, setInput] = useState();

  function SaveGameReview() {
    navigation.navigate("MyReviews");

    function handleClick() {}

    return <View style={styles.container1}></View>;
  }

  function Skank() {
    if (id.metacritic !== null) {
      return (
        <Text style={styles.text}>
          Rating: <Text style={styles.innerText}>{id.metacritic}</Text>
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
      <Text style={styles.text}>
        Genres:{" "}
        <Text style={styles.innerText}>
          {id.genres.map((p) => `${p.name} | `)}
        </Text>
      </Text>
      {/* <Text style={styles.text}>
        Platforms: <Text style={styles.innerText}>{id.platforms.map(p => `${p.platform.name} | `)}</Text>
        </Text> */}

      {/* <Text style={styles.text}>
        Metacritic Score: <Text style={styles.innerText}>{id.metacritic}</Text>
      </Text> */}
      <Skank />
      <Image
        style={{ width: 300, height: 300 }}
        source={{ uri: id.background_image }}
      />
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  inputContainer: {
    width: 300,
    marginVertical: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  innerText: {
    fontWeight: "400",
  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
  },
});
