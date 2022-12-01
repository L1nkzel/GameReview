import { ScrollView, StyleSheet, View } from "react-native";
import ReviewForm from "../components/form/ReviewForm";

const GameScreen = ({ route }) => {
  const game = route.params?.game;

  return (
    <ScrollView>
    <View style={styles.container}>
      <ReviewForm game={game} />
    </View>
    </ScrollView>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 30,
  },
});




