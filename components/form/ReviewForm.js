import {
  Button,
  DeviceEventEmitter,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ReviewInputForm from "./ReviewInputForm";
import Review from "../../models/Review";
import { useNavigation } from "@react-navigation/native";
import { findAll, insert } from "../../utils/db";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Title from "../ui/Title";

const ReviewForm = ({ game }) => {
  const [reviewInput, setReviewInput] = useState("");
  const nav = useNavigation();

  const handleChangeText = (text) => {
    setReviewInput(text);
  };

  console.log(game);

  const submitReview = async () => {
    Keyboard.dismiss();
    await insert(
      new Review(
        undefined,
        game.name,
        game.released,
        game.metacritic,
        game.background_image,
        reviewInput
      )
    );
    const res = await findAll();
    console.log(res);
    DeviceEventEmitter.emit("addNewReview");
    nav.navigate("HomeScreen");
    nav.navigate("MyReviews");
  };

  function CheckRatings() {
    if (game.metacritic !== null) {
      return (
        <Text style={styles.text}>
          Rating: <Text style={styles.innerText}>{game.metacritic}</Text>
        </Text>
      );
    }
  }

  return (
    <View style={styles.container}>
    <Title>{game.name}</Title>
      {/* <Text style={styles.text}>
        Title: <Text style={styles.innerText}>{game.name}</Text>
      </Text> */}
      <Text style={styles.text}>
        Released: <Text style={styles.innerText}>{game.released}</Text>
      </Text>

      <CheckRatings />
      <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: game.background_image }} />
      </View>
      <ReviewInputForm
        style={styles.inputContainer}
        inputCfg={{
          value: reviewInput,
          onChangeText: handleChangeText,
          placeholder:"Write your review here...",
          keyboardType: "default",
          multiline: true,
        }}
      />
      <Button title="Save Review" onPress={submitReview} />
    </View>
  );
};

export default ReviewForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.primary800,
    elevation: 8,
    marginTop: 5,
  },
  imageContainer:{
    marginVertical:8
  },
  image: {
    width: 300,
    height: 150,
    borderRadius:8
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  innerText: {
    fontWeight: "400",
  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    borderWidth: 2
  },
});
