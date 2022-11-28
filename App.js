import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import GameScreen from './screens/GameScreen';
import Home from './screens/Home';
import MyReviews from './screens/MyReviews';
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { dropTable, getTableInfo, initDB } from './utils/db';
export default function App() {


  const bottomNav = createMaterialBottomTabNavigator();
  const stack =createNativeStackNavigator();

  const [dbInited, setDbInited] = useState(false)

  useEffect(() => {
    initDB()
      .then(res => {
        console.log(res)
        return getTableInfo()
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
    return <View><Text>Hej</Text></View>

  

  function StackNav() {
    return (
      <stack.Navigator >
        <stack.Screen  name='ChooseGame' component={Home}/>
        <stack.Screen  name='GameScreen' component={GameScreen}/>
      </stack.Navigator>
    )
  }

  return (
    <>
    <NavigationContainer>
      <bottomNav.Navigator >
        <bottomNav.Screen name='Home' component={StackNav} options={{
         tabBarIcon: ({color, size=20}) => (
          <Ionicons name='home' color={color} size={size}/>
         )
        }}/>
        <bottomNav.Screen name='MyReviews' component={MyReviews} options={{
         tabBarIcon: ({color, size=20}) => (
          <Ionicons name='star' color={color} size={size}/>
         )
        }}/>
      </bottomNav.Navigator>
    </NavigationContainer>
      <StatusBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
