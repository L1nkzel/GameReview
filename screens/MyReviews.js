import { DeviceEventEmitter, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deleteById, findAll } from '../utils/db'
import { useNavigation } from '@react-navigation/native'

const MyReviews = () => {

  const [reviewsList, setReviewsList] = useState([])
const nav = useNavigation();
     
  useEffect(() => {

    findAll().then((res) => setReviewsList(res))
    DeviceEventEmitter.addListener('addNewReview', async () => {
      const res = await findAll();
      setReviewsList(res)
    })

    DeviceEventEmitter.addListener("removeReviewById", async (id) => {
      await deleteById(id);
      const res = await findAll();
      setReviewsList(res)
    });
    

    return () => DeviceEventEmitter.removeAllListeners();
  }, [])

  
  function renderReview ({item: game}) {
    
    function pressHandler() {
       nav.navigate("ReviewScreen", {
        game
       })
    }
    return (
      <Pressable
       onPress={pressHandler}>
      <View style={styles.container}>
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
      </View>
      </Pressable>
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