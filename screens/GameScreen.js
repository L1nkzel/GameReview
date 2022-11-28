import { Button, DeviceEventEmitter, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { findAll, insert } from "../utils/db";
import Review from "../models/Review";
import ReviewForm from "../components/form/ReviewForm";

const GameScreen = ({ route, navigation }) => {

  const game = route.params?.game;
  
  return (
    <View style={styles.container}>
    <ReviewForm game = {game}/>
     
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 30
  },
});

    // DeviceEventEmitter.addListener('deleteById', async (id) =>{
    //   await deleteById(id);
    //   const res = await findAll();
    //   setReviewList(res);
    // })

          {/* <Text style={styles.text}>
        Platforms: <Text style={styles.innerText}>{id.platforms.map(p => `${p.platform.name} | `)}</Text>
        </Text> */}

      {/* <Text style={styles.text}>
        Metacritic Score: <Text style={styles.innerText}>{id.metacritic}</Text>
      </Text> */}