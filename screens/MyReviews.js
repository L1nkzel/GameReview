import { DeviceEventEmitter, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { findAll } from '../utils/db'

const MyReviews = () => {

  const [reviewsList, setReviewsList] = useState([])

     
  useEffect(() => {

    findAll().then((res) => setReviewsList(res))
    DeviceEventEmitter.addListener('addNewReview', async () => {
      const res = await findAll();
      setReviewsList(res)
      console.log("My reviews", res);
    })
    

    return () => DeviceEventEmitter.removeAllListeners();
  }, [])

  
  function renderReview ({item: game}) {
    
    return (
      <View style={styles.container}>
        <Text>Review</Text>
        <Text style={styles.text}>
          Title: <Text style={styles.innerText}>{game?.title}</Text>
        </Text>
        <Text style={styles.text}>
          Released: <Text style={styles.innerText}>{game?.releaseDate}</Text>
        </Text>
        {/* <Text style={styles.text}>
          Genres:{" "}
          <Text style={styles.innerText}>
            {game.genres.map((p) => `${p.name} | `)}
          </Text>
        </Text> */}
        <Image
          style={{ width: 300, height: 150 }}
          source={{ uri: game?.backgroundImage }}
        />
        <Text>{game.review}</Text>
      </View>
    )
  }

  return (
    <FlatList 
      data={reviewsList}
      renderItem={renderReview}
    />
  )

}

export default MyReviews

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },

  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  innerText: {
    fontWeight: "400",
  },
})