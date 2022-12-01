import {
  DeviceEventEmitter,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { deleteById, findAll } from "../utils/db";
import { useNavigation } from "@react-navigation/native";
import Title from "../components/ui/Title";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";

const MyReviews = () => {
  const [reviewsList, setReviewsList] = useState([]);
  const nav = useNavigation();

  useEffect(() => {
    findAll().then((res) => setReviewsList(res));
    DeviceEventEmitter.addListener("addNewReview", async () => {
      const res = await findAll();
      setReviewsList(res);
    });

    DeviceEventEmitter.addListener("removeReviewById", async (id) => {
      await deleteById(id);
      const res = await findAll();
      setReviewsList(res);
    });

    return () => DeviceEventEmitter.removeAllListeners();
  }, []);

  function renderReview({ item: game }) {
    function pressHandler() {
      nav.navigate("ReviewScreen", {
        game,
      });
    }


  


    return (
      <Pressable onPress={pressHandler}>
        <View style={styles.container}>
          <LinearGradient
            colors={[Colors.primary300, "#44a38d"]}
            style={{ flex: 1, borderRadius: 8, paddingHorizontal: 16, alignItems:"center" }}
          >
            <Title style={{color:"white"}}>{game?.title}</Title>
            <Image
              style={{ width: 300, height: 150, borderRadius: 8 }}
              source={{ uri: game?.backgroundImage }}
            />
            <Title style={{ fontSize: 18, color:"gold" }}>{game.titleReview}</Title>
          </LinearGradient>
        </View>
      </Pressable>
    );
  }
  

  return (
    <ImageBackground
      source={require("../assets/nesRetro1.jpg")}
      resizeMode="cover"
      imageStyle={{ opacity: 0.55 }}
      style={styles.imageStyle}
    >
      <View style={{ marginTop: 70 }}>
        <FlatList data={reviewsList} renderItem={renderReview} />
      </View>
    </ImageBackground>
  );
};

export default MyReviews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  innerText: {
    fontWeight: "400",
  },
  titleText: {
    marginVertical: 6,
    fontSize: 20,
    fontWeight: "bold",
  },
  imageStyle:{
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  }
});
