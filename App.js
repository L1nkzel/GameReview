import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import GameScreen from "./screens/GameScreen";
import Home from "./screens/Home";
import MyReviews from "./screens/MyReviews";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { dropTable, getTableInfo, initDB } from "./utils/db";
import ReviewScreen from "./screens/ReviewScreen";
import Colors from "./constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const BottomNav = createMaterialBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const [dbInited, setDbInited] = useState(false);

  useEffect(() => {
    initDB()
      .then((res) => {
        console.log(res);
        return getTableInfo();
        // return dropTable()
      })
      .then((res) => {
        console.log(
          res.rows._array.map((row) => `${row.cid} ${row.name} ${row.type}`)
        );
        setDbInited(true);
      });
  }, []);

  if (!dbInited)
    return (
      <View style={{alignItems:"center", justifyContent: "center"}}>
        <Text>Could not init database</Text>
      </View>
    );

  function StackNav() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerBackground: () => (
            <LinearGradient
              colors={[Colors.primary500, Colors.accent500]}
              style={{ flex: 1 }}
            />
          ),
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={{ headerTitle: "Find A Game" }}
        />
        <Stack.Screen
          name="GameScreen"
          component={GameScreen}
          options={{ headerTitle: "Write A Review" }}
        />
        <Stack.Screen
          name="ReviewScreen"
          component={ReviewScreen}
          options={{ headerTitle: "Game Review" }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <>
      <NavigationContainer>
        <BottomNav.Navigator barStyle={{ backgroundColor: Colors.primary600 }}>
          <BottomNav.Screen
            name="Home"
            component={StackNav}
            options={{
              tabBarIcon: ({ color, size = 20 }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />
          <BottomNav.Screen
            listeners={({ navigation }) => ({
              tabPress: () => {
                navigation.navigate("HomeScreen");
              },
            })}
            name="MyReviews"
            component={MyReviews}
            options={{
              tabBarIcon: ({ color, size = 20 }) => (
                <Ionicons name="star" color={color} size={size} />
              ),
            }}
          />
        </BottomNav.Navigator>
      </NavigationContainer>
      <StatusBar />
    </>
  );
}
