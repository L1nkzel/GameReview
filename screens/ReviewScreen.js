import { DeviceEventEmitter, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PrimaryButton from '../components/ui/PrimaryButton'
import Title from '../components/ui/Title'

const ReviewScreen = ({route, navigation}) => {

  const {id, title, releaseDate, backgroundImage, metacritic, review} = route.params.game


  const handleDelete = () => {
     DeviceEventEmitter.emit("removeReviewById", id)
     navigation.navigate("HomeScreen")
     navigation.navigate("MyReviews")
  }

  return (
    <View style={styles.container}>
      <Title>{title}</Title>
    <Text style={styles.text}>
      Released: <Text style={styles.innerText}>{releaseDate}</Text>
    </Text>
    <Text style={styles.text}>
      Ratings: <Text style={styles.innerText}>{metacritic}</Text>
    </Text>
    <Text style={styles.text}>
      Released: <Text style={styles.innerText}>{releaseDate}</Text>
    </Text>
    {/* <Text style={styles.text}>
      Genres:{" "}
      <Text style={styles.innerText}>
        {game.genres.map((p) => `${p.name} | `)}
      </Text>
    </Text> */}
    <Image
      style={{ width: 300, height: 150, borderRadius:8 }}
      source={{ uri: backgroundImage }}
    />
    <Text>{review}</Text>
    <PrimaryButton onPress={handleDelete}>Delete Review</PrimaryButton>
  </View>
  )
}

export default ReviewScreen

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
      deleteButton: {

      }
})