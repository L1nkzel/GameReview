import {
  DeviceEventEmitter,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import CheckRatings from "../components/CheckRatings";

const ReviewScreen = ({ route, navigation }) => {
  const {
    id,
    title,
    releaseDate,
    genres,
    platforms,
    backgroundImage,
    metacritic,
    titleReview,
    review,
  } = route.params.game;

  const handleDelete = () => {
    DeviceEventEmitter.emit("removeReviewById", id);
    navigation.navigate("HomeScreen");
    navigation.navigate("MyReviews");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title>{title}</Title>
        <CheckRatings metacritic={metacritic} />
        <Text style={styles.text}>
          Released: <Text style={styles.innerText}>{releaseDate}</Text>
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.text}>Genres: </Text>
          {JSON.parse(genres).map((p) => (
            <Text key={p.name} style={{ marginHorizontal: 2 }}>
              {p.name}
            </Text>
          ))}
        </View>
        <View
          style={{
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Text style={styles.text}>Platforms: </Text>
          {JSON.parse(platforms).map((p) => (
            <Text key={p.platform.name} style={{ marginHorizontal: 2 }}>
              {p.platform.name}
            </Text>
          ))}
        </View>
        <Image
          style={{ width: 300, height: 150, borderRadius: 8 }}
          source={{ uri: backgroundImage }}
        />
        <Text>{titleReview}</Text>
        <Text>{review}</Text>
        <PrimaryButton onPress={handleDelete}>Delete Review</PrimaryButton>
      </View>
    </ScrollView>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 2,
  },
  innerText: {
    fontWeight: "400",
  },
  genre: {
    marginHorizontal: 4,
  },
  deleteButton: {},
});
