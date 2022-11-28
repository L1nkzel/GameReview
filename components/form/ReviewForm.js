import { Button, DeviceEventEmitter, Image, Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ReviewInputForm from './ReviewInputForm'
import Review from '../../models/Review'
import { useNavigation } from '@react-navigation/native'
import { findAll, insert } from '../../utils/db'

const ReviewForm = ({game}) => {
    const [reviewInput, setReviewInput] = useState("")
    const nav = useNavigation();

  const handleChangeText = (text) => {
    setReviewInput(text)
  }
    
    console.log(game);

    const submitReview = async () => {
        Keyboard.dismiss();
        await insert(
            new Review(undefined, game.name, game.released, game.metacritic, game.background_image , reviewInput)
          )
          const res = await findAll()
          console.log(res);
        DeviceEventEmitter.emit("addNewReview");
        nav.navigate("ChooseGame")
        nav.navigate("MyReviews")
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
      <Text>ReviewForm</Text>
      <Text style={styles.text}>
        Title: <Text style={styles.innerText}>{game.name}</Text>
      </Text>
      <Text style={styles.text}>
        Released: <Text style={styles.innerText}>{game.released}</Text>
      </Text>

      <CheckRatings />
      <Image
        style={{ width: 300, height: 150 }}
        source={{ uri: game.background_image }}
      />
      <ReviewInputForm 
        inputCfg={{
            value: reviewInput,
            onChangeText: handleChangeText,
            keyboardType: "default",
            multiline: true
        }}
      />
      <Button title='Save Review' onPress={submitReview}/>
    </View>
  )
}

export default ReviewForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 20,
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
})