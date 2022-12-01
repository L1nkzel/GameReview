import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";

const Home = () => {
  const [textInput, setTextInput] = useState("");
  const [games, setGames] = useState([]);
  const navigation = useNavigation();
  const URL = "http://10.0.2.2:3000";

  const handleClick = () => {
    Keyboard.dismiss();
    getApi();
    setTextInput("");
  };

  const handleChangeText = (text) => {
    console.log(text);
    setTextInput(text);
  };

  const getApi = () => {
    fetch(`${URL}/${textInput}`)
      .then((res) => res.json())
      .then((body) => setGames(body));
  };

  function renderItems({ item: game }) {
    function pressHandler() {
      navigation.navigate("GameScreen", {
        game,
      });
      setGames([])
    }

    // useEffect(() => {
    //   const jumpToHome = navigation.addListener("tabPress", (e) => {
    //     navigation.navigate("HomeScreen")
    //   })
    //   return jumpToHome;
    // }, [navigation])

    return (
      <Pressable onPress={pressHandler}>
        <Text style={styles.gameText}>{game.name}</Text>
      </Pressable>
    );
  }

  return (
    <LinearGradient 
    colors={[Colors.primary700 ,"#FAEBD7" ]}
    style={{flex:1}}
    >
    <ImageBackground
    source={require("../assets/nesRetro1.jpg")}
    resizeMode="cover"
    style={styles.imageBackground}
    imageStyle={{opacity:0.55}}
    >
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Find Game"
          style={styles.textInput}
          value={textInput}
          onChangeText={handleChangeText}
        />
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            { opacity: pressed ? 0.3 : 1 },
          ]}
          onPress={handleClick}
        >
          <Text style={{ color:"white", fontWeight:"bold"}}>Search</Text>
        </Pressable>
      </View>

      <View style={{ margin: 10, height: 300, width: 320 }}>
        <FlatList
          contentContainerStyle={{ margin: 5 }}
          data={games.results}
          renderItem={renderItems}
        />
      </View>
    </View>
    </ImageBackground>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {

   // backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 30
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 15,
    borderRadius: 5,
    borderColor: Colors.primary500,
    borderWidth: 5,
    width: "60%",
  },
  addButton: {
    padding: 19,
    backgroundColor: Colors.primary500,
    borderRadius: 5,
  },
  gameText: {
    marginVertical: 2,
    borderWidth: 1,
    padding: 8,
    fontWeight:"bold",
    backgroundColor: Colors.primary200,
  },
  imageBackground: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
